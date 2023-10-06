import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { Product2 } from '../../models/ticket';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { ComponentService } from '../component.service';

@Component({
  selector: 'app-productdropdown',
  templateUrl: './productdropdown.component.html',
  styleUrls: ['./productdropdown.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    }
  ]
})
export class ProductdropdownComponent implements OnInit {
  @Input() formGroupParent!: FormGroup | any;
  @Input() controlName!: string;

  control!: FormControl;
  products: Product2[] = [];
  selectedProduct: Product2 | undefined;
  
  constructor (private componentService : ComponentService){}

  ngOnInit(): void {
    this.control = <FormControl>this.formGroupParent.get(this.controlName);
    this.componentService.getProducts().subscribe({
      next: response => {
        this.products = response
      }
    });
  }

}