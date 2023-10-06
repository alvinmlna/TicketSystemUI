import { Component, Input, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { Category, Product2, User } from '../../models/ticket';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { ComponentService } from '../component.service';


@Component({
  selector: 'app-assigneddropdown',
  templateUrl: './assigneddropdown.component.html',
  styleUrls: ['./assigneddropdown.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    }
  ]
})
export class AssigneddropdownComponent implements OnInit {
  @Input() formGroupParent!: FormGroup | any;
  @Input() controlName!: string;

  control!: FormControl;
  
  admins: User[] = [];
  selectedAdmin: User | undefined;
  
  constructor (private componentService : ComponentService){}

  ngOnInit(): void {
    this.control = <FormControl>this.formGroupParent.get(this.controlName);
    this.componentService.getAllAdmins().subscribe({
      next: response => {
        this.admins = [{userId:0, name: 'All', Email: '', password: '', roleid: '0'}, ...response]
        console.log(response);
      }
    });
  }
}
