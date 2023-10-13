import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { Product2, Status } from '../../models/ticket';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { ComponentService } from '../component.service';
import { dropdownModel } from '../../models/components/dropdownModel';

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
  status: dropdownModel[] = [];
  selectedStatus!: dropdownModel | undefined;
  
  constructor (private componentService : ComponentService){}

  ngOnInit(): void {
    this.control = <FormControl>this.formGroupParent.get(this.controlName);
    this.componentService.getStatus().subscribe({
      next: response => {
        this.status = response.map((x) => {
          return {id : x.statusId, name : x.name};
        })
      }
    });
  }
}
