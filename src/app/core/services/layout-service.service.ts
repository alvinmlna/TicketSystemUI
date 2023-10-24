import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutServiceService {

  private currentPageSource = new ReplaySubject<string | null>(1);
  currentPage$ = this.currentPageSource.asObservable();

  constructor() { }

  loadPageTitle(title : string ){
    this.currentPageSource.next(title);
  }
}
