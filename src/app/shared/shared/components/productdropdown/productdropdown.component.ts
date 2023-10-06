import { Component, Input, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { TicketService } from 'src/app/ticket/ticket.service';
import { Product2 } from '../../models/ticket';
import { City } from '../../models/city';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

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
  
  constructor (private ticketService: TicketService){}

  ngOnInit(): void {
    this.control = <FormControl>this.formGroupParent.get(this.controlName);
    this.products = this.ticketService.getAllProducts();
  }

}

export interface dropdown {
  label: string;
  value: string;
}
