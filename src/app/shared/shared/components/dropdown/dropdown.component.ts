import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { dropdownModel } from '../../models/components/dropdownModel';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() formGroupParent!: FormGroup | any;
  @Input() controlName!: string;
  @Input() data: dropdownModel[] = [];
}
