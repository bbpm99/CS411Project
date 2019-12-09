import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="hero is-info is-full-height is-bold">
    <div class="hero-body">
    <div class="container">
      <h1 class="title" style="text-align:center">travlr</h1>
      <mat-card align="center">
      <button mat-raised-button color="primary" (click)="goURL()"> Sign In </button>
      </mat-card>
    </div>
    </div>
    </section>
    `,
  styles : [`
    "node_modules/bootstrap/dist/css/bootstrap.css",
    "src/styles.css"
  `]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goURL() {
    window.location.href='http://localhost:3000/signIn';
  }

}
