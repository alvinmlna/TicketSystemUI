import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { Product2, Status } from '../../models/ticket';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { ComponentService } from '../component.service';

@Component({
  selector: 'app-statusdropdown',
  templateUrl: './statusdropdown.component.html',
  styleUrls: ['./statusdropdown.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    }
  ]
})
export class StatusdropdownComponent implements OnInit {
  @Input() formGroupParent!: FormGroup | any;
  @Input() controlName!: string;

  control!: FormControl;
  status: Status[] = [];
  selectedStatus!: Status | undefined;
  
  constructor (private componentService : ComponentService){}

  ngOnInit(): void {
    this.control = <FormControl>this.formGroupParent.get(this.controlName);
    this.status = this.componentService.getStatus();
  }
}
