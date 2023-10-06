import { Component, Input, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { Category, Priority, Product2 } from '../../models/ticket';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { ComponentService } from '../component.service';
import { dropdownModel } from '../../models/components/dropdownModel';


@Component({
  selector: 'app-prioritydropdown',
  templateUrl: './prioritydropdown.component.html',
  styleUrls: ['./prioritydropdown.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    }
  ]
})
export class PrioritydropdownComponent implements OnInit {
  @Input() formGroupParent!: FormGroup | any;
  @Input() controlName!: string;

  control!: FormControl;
  
  values: dropdownModel[] = [];
  selectedValue: dropdownModel | undefined;
  
  constructor (private componentService : ComponentService){}

  ngOnInit(): void {
    this.control = <FormControl>this.formGroupParent.get(this.controlName);
    this.componentService.getPriority().subscribe({
      next: response => {
        this.values = response
      }
    });
  }
}
