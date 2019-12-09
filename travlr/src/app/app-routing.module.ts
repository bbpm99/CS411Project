import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaceComponent } from './place/place.component';
import { SavedComponent } from './saved/saved.component';
import { DisplayComponent } from './display/display.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'new-itinerary',
    component: PlaceComponent
  },
  {
    path: 'saved-itineraries',
    component: SavedComponent
  },
  {
    path: 'display',
    component: DisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
