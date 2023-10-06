import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Product2, Status, User } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  baseUrl = "https://localhost:7047/api/";

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product2[]>(this.baseUrl + 'product');
  }

  getCategory() {
    return this.http.get<Category[]>(this.baseUrl + 'category');
  }

  getStatus() {
    return this.http.get<Status[]>(this.baseUrl + 'status');
  }

  getAllAdmins() {
    return this.http.get<User[]>(this.baseUrl + 'user/admin');
  }
}
