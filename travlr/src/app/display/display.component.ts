import { Component, OnInit, Input } from '@angular/core';
import { SaveItineraryService } from '../save-itinerary.service';

@Component({
  selector: 'app-display',
  template: `
  <h1 align="center">Here's your trip itinerary!</h1>
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

  <mat-card align="center">
      <button mat-raised-button color="primary" (click)="onClick()"> Save Itinerary </button>
      <div *ngIf="saved">
        <p align="center"> Your plan has been saved! </p>
      </div>
  </mat-card>
  `,
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  saved: any;

  @Input() locationData;

  constructor(private SaveItineraryService: SaveItineraryService) { }

  ngOnInit() {
    console.log(this.locationData);
  }

  goUrl() {
    window.location.href="http://localhost:4200/saved-itineraries";
  }

  onClick() {
    this.SaveItineraryService.saveItinerary().subscribe((save) => {
      this.saved = save;
    });
    console.log("this works");
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
