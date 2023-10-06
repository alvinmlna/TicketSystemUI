import { Component, Input, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { Category, Product2 } from '../../models/ticket';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { ComponentService } from '../component.service';


@Component({
  selector: 'app-categorydropdown',
  templateUrl: './categorydropdown.component.html',
  styleUrls: ['./categorydropdown.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    }
  ]
})
export class CategorydropdownComponent implements OnInit {
  @Input() formGroupParent!: FormGroup | any;
  @Input() controlName!: string;

  control!: FormControl;
  
  category: Category[] = [];
  selectedCategory: Category | undefined;
  
  constructor (private componentService : ComponentService){}

  ngOnInit(): void {
    this.control = <FormControl>this.formGroupParent.get(this.controlName);
    this.componentService.getCategory().subscribe({
      next: response => {
        this.category = response
      }
    });
  }
}
