import { Component, OnInit } from '@angular/core';
import { SigninService} from '../signin.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private signinService: SigninService) { }

  ngOnInit() {
    this.signinService.signIn();
  }

}
