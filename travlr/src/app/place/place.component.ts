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
    <a mat-button color="primary" (click)="onClick(location.value, updateDOB(startdate.value), updateDOB(enddate.value))"> Submit </a>
    </mat-card>
  <table class="table table-striped" *ngFor="let data of locationData; let i = index">
    <thead>
      <tr>
        <h4>Day {{i + 1}}</h4>
      </tr>
      <tr>
        <th>Name</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Url</th>
      </tr>
    <tbody *ngFor="let info of data">
        <td>{{info.name}}</td>
        <td>{{updateTime(info.startTime)}}</td>
        <td>{{updateTime(info.endTime)}}</td>
        <td>{{info.url}}</td>
    </tbody>
  </table>
  `,
  styles: [
    "node_modules/bootstrap/dist/css/bootstrap.css",
    "src/styles.css"
  ]
})
export class PlaceComponent{
  locationData: Object;

  constructor(private locationsService: LocationsService) { }

  onClick(location, startdate, enddate) {
    var startday = startdate.substring(4, 6);
    var endday = enddate.substring(4, 6);
    var visit_length = Number(endday) - Number(startday) + 1;
    this.locationsService.getLocation(location, startdate, enddate).subscribe((locations) => {
      this.locationData = locations;
      console.log(this.locationData);
    });
  }

  updateDOB(date) {
    var dateParts = date.split('/');
    var month = String(dateParts[0]);
    if (month.length == 1) { month = '0' + month;}
    var day = String(dateParts[1]);
    if (day.length == 1) {day = '0' + day;}
    let year: string = date.substring(date.length, date.length - 2);
    date = year + month + day;
    return date;
  }

  updateTime(time) {
    var timeParts = String(time).split('.');
    var hours = timeParts[0];
    if (Number(hours) > 12) {
      hours = String(Number(hours) - 12);
    }
    var minutes = timeParts[1];
    if (minutes) {
      minutes = String(Number(minutes) * 6);
    } else {
      minutes = '00';
    }
    time = hours + ':' + minutes;
    return time;
  }

}
