import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar color="primary">
    <mat-toolbar-row>
      <h1>travlr</h1>
      <span class="menu-spacer"></span>
      <div>
        <a mat-button color="accent" routerLink=""> Home </a>
        <a mat-button color="accent" routerLink="new-itinerary"> Create a New Itinerary </a>
        <a mat-button color="accent" routerLink="saved-itineraries"> View Saved Itineraries </a>
      </div>
    </mat-toolbar-row>
    </mat-toolbar>
    <router-outlet></router-outlet>
    `,
    styles: [
      "node_modules/bootstrap/dist/css/bootstrap.css",
      "src/styles.css"
    ]
})
export class AppComponent {}
