import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../account.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  loginForm = new FormGroup({
    email:  new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  returnUrl: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService : AccountService,
    private messageService : MessageService
    )
    {
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
      error: err => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'ERROR', detail: err.error });
      }
    })
  }
}
