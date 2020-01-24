# Authentication with rest api practice using Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

## Introduce

This example used the firebase to send a login http request to get the token,
and also doing the auto-login and auto-logout mechanism. 

Firebase official site:
https://firebase.google.com/

## How to use it

1. Run "npm install" inside this project folder to install all dependencies.

2. Make sure you use the latest version of the CLI (upgrade guide below)

```
Run the below commands - only use "sudo" on Mac/ Linux.

sudo npm uninstall -g angular-cli @angular/cli
npm cache clean --force
sudo npm install -g @angular/cli
```

3. Please change the firebase relative setting (web api url and key), please refer to the Firebase setting section.

4. Run "ng serve" to see the app in action (try "npm start" in case "ng serve" fails).

## Firebase setting

### 1. Apply a firebase `realtime database`,
we will use the two api the firebase provided:
* Sign up with email / password
  * https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
* Sign in with email / password
  * https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password

### 2. Setting the firebase rule

![In image: firebase-rule.png](https://i.imgur.com/myy1N9R.png)

### 2. Enable the login way as `email/password`

![In image: email-setting](https://i.imgur.com/zkhkFDg.png)

### 3. Access your web api key

In the project setting, you can see the web api key of the project.
We will use the web api key(網路金鑰API) to send rest api to firebase

![In image: fire base setting](https://i.imgur.com/533tZKX.png)

### 4. Change your web api key in the project

replace the web api key in here:  

`/src/app/auth/auth.service.ts`
```
signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[You web api key]',
      {
          email: email,
          password: password,
          returnSecureToken: true
      })
      .pipe(catchError(this.handleError));
  }

login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      // put your firebase web api key here.
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[Your web api key]',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      // use tap operator allows us to perform some action without change response
      .pipe(catchError(this.handleError), tap(resData => {
        // as expiresIn is a number, we put + in front of it
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    );
  }
```

To be notice that the api url might be change,
please refer to the firebase document:

https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password

## Basic angular script

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
