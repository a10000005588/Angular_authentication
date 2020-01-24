import {Component} from "@angular/core";

@Component({
  selector: 'app-loading-spinner',
  template: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div> <div>loading</div>\n',
  styleUrls: ['./loading-spinner.css']
})
export class LoadingSpinnerComponent {}
