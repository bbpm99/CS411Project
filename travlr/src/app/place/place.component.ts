import { Component, OnInit, Input } from '@angular/core';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent{
  private locationData: any;
  //private city = 'dublin';

  constructor(private locationsService: LocationsService) { }

  onClick(city) {
    this.locationsService.getLocation(city).subscribe((locations) => {
     console.log(locations);
     this.locationData = locations;
    });
  }

}
