import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent implements OnInit {
  IdOfItems!: string | null;

  constructor(
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.IdOfItems = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
