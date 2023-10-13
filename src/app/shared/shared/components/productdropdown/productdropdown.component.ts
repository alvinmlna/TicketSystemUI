import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { Product2 } from '../../models/ticket';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { ComponentService } from '../component.service';
import { dropdownModel } from '../../models/components/dropdownModel';

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
  products: dropdownModel[] = [];
  selectedProduct: dropdownModel | undefined;
  
  constructor (private componentService : ComponentService){}

  ngOnInit(): void {
    this.control = <FormControl>this.formGroupParent.get(this.controlName);
    this.componentService.getProducts().subscribe({
      next: response => {
        var mappedResponse =  response.map((x) => {
          return {id : x.productId, name : x.productName};
        })
        this.products = [{id:0, name: 'Select Product'}, ...mappedResponse]
      }
    });
  }

}
