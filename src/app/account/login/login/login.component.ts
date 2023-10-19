import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email:  new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  returnUrl: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute ){
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
    }

  onSubmit(){
  }
}
