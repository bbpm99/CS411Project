import { Component, OnInit, Input } from '@angular/core';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'app-place',
  template: `
    <h1 align="center">CREATE A NEW ITINERARY</h1>
    <h2 align="center"> Enter a location you plan to visit!</h2>
    <div class="location-container" align="center">
      <mat-form-field>
        <input matInput #location placeholder="Location">
      </mat-form-field>
    </div> 
    <!-- <input #box (keyup.enter)="onClick(box.value)"> -->
    <h2 align="center"> Enter a start and end date for your trip!</h2>
    <p align="center">
    <mat-form-field color="accent">
      <input matInput [matDatepicker]="picker1" placeholder="Choose a start date" #startdate>
      <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
      <mat-datepicker #picker1></mat-datepicker>
    </mat-form-field>
    </p>
    <p align="center">
    <mat-form-field color="primary">
      <input matInput [matDatepicker]="picker2" placeholder="Choose an end date" #enddate>
      <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
      <mat-datepicker #picker2></mat-datepicker>
    </mat-form-field>
    </p>
    <mat-card align="center">
    <a mat-button color="primary" (click)="onClick(location.value, 191208, 191209)"> Submit </a>
    </mat-card>
    <h4> {{ updateDOB(startdate.value) }} </h4>
    <div *ngIf="locationData">
      <h4>Itinerary: {{ locationData.name }}</h4>
    </div>
  `,
  styles: [
    "node_modules/bootstrap/dist/css/bootstrap.css",
    "src/styles.css"
  ]
})
export class PlaceComponent{
  private locationData: any;

  constructor(private locationsService: LocationsService) { }

  onClick(location, startdate, enddate) {
    this.locationsService.getLocation(location, startdate, enddate).subscribe((locations) => {
     console.log(locations);
     this.locationData = locations;
    });
  }

  updateDOB(date) {
    var dateParts = date.split('/');
    dateParts[2] = dateParts[2].substring(2, 4);
    date = dateParts[2] + dateParts[0] + dateParts[1];
    return date;
  }

}
