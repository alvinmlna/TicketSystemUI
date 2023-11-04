import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../account.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import Utils from 'src/app/shared/shared/Helpers/utils';

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService : AccountService,
    private messageService : MessageService,
    private spinnerService: NgxSpinnerService
    ){}
    
  onSubmit(){
    this.spinnerService.show();
    this.accountService.login(this.loginForm.value).subscribe({
      next: res => {
        this.spinnerService.hide();
        var returnUrl = Utils.userHomePage(res.roleId)
        this.router.navigateByUrl(returnUrl);
      },
      error: err => {
        this.spinnerService.hide();
        this.messageService.add({ severity: 'error', summary: 'ERROR', detail: err.error });
      },
      })
  }
}
