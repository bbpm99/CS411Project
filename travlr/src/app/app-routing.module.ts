import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaceComponent } from './place/place.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SavedComponent } from './saved/saved.component';


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
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'saved-itineraries',
    component: SavedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
