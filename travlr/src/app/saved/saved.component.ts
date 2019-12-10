import { Component, OnInit } from '@angular/core';
import { GetSavedPlansService } from '../get-saved-plans.service';

@Component({
  selector: 'app-saved',
  template: `
    <h1 align="center"> SAVED ITINERARIES </h1>
    <table class="table table-striped" *ngFor="let plan of savedPlans; let i = index">
      <thead>
        <tr *ngIf="plan">
        <h4 align="center">Itinerary {{i}}</h4>
          <th>Name</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody *ngFor="let data of plan; let j = index">
        <tr>
        <h4 align="center">Day {{j + 1}}</h4>
        </tr>
        <tr *ngFor="let info of data">
          <td></td>
          <td>{{info.name}}</td>
          <td>{{updateTime(info.startTime)}}</td>
          <td>{{updateTime(info.endTime)}}</td>
          <td>{{info.url}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./saved.component.css']
})
export class SavedComponent {
  savedPlans: Object;
  constructor(private getSavedPlansService: GetSavedPlansService) { }

  ngOnInit() {
    this.getSavedPlansService.getPlans().subscribe((plans) => {
      this.savedPlans = plans;
      interface MyObj {
        id: string;
        username: string;
        itineraries: Array<Array<Object>>;
      }
      let obj: MyObj = JSON.parse(JSON.stringify(this.savedPlans));
      this.savedPlans = obj.itineraries;
      console.log(this.savedPlans);
    });
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
