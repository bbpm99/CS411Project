import { Component, OnInit } from '@angular/core';
import { SaveItineraryService } from '../save-itinerary.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent {
  saved: boolean;

  constructor() { }

  ngOnInit() {
    //this.SaveItineraryService.saveItinerary().subscribe((save) => {
    //  this.saved = save;
    //  console.log(this.saved);
    //});
  }

}
