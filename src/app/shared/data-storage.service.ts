import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {exhaustMap, map, take, tap} from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import {AuthService} from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-complete-guide-1bde0.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    // take(): gives the latest user and unsubscribe
    // exhaustMap(): waits for the first observable, for the user observable to complete which will happen after we took the latest user.
    // This means that we can still subscribe to that observable returned by fetch recipes in the end
    // it will be an HTTP observable because we switch in the exhaustMap
    // because we firstly subscribe the authService.user to get the user once, then switch to the another
    // subscribe by exhaustMap.
    return this.http
          .get<Recipe[]>(
            'https://ng-complete-guide-1bde0.firebaseio.com/recipes.json'
      ).pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
    }
}
