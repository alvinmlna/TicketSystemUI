import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Product2, Status } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  baseUrl = "https://localhost:7047/api/";

  constructor(private http: HttpClient) { }

  getProducts() {
    let emp : Product2[] = [
      {productId : 3, productName : "TradeNet"},
      {productId : 2, productName : "TradeNet 2"},
      {productId : 1, productName : "TradeNet 3"},
    ]
    return emp;
  }

  getCategory() {
    let category : Category[] = [
      {categoryId : 1, categoryName : "Category 1"},
      {categoryId : 2, categoryName : "Category 2"},
      {categoryId : 3, categoryName : "Category 3"},
    ]
    return category;
  }

  getStatus() {
    let status : Status[] = [
      {statusId : 1, name : "NEW", statusGroupId : 1},
      {statusId : 2, name : "OPEN", statusGroupId : 1},
      {statusId : 3, name : "CLOSE", statusGroupId : 1},
    ]
    return status;
  }
}
