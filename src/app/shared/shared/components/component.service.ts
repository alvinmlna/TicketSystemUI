import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Priority, Product2, Status, User } from '../models/ticket';
import { dropdownModel } from '../models/components/dropdownModel';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  baseUrl = "https://localhost:7047/api/";

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product2[]>(this.baseUrl + 'product').pipe(
      map (
      response => {
        const model = response.map(o => ( {
          id : o.productId,
          name: o.productName
        }));
        return model;
      }
      )
    );;
  }

  getCategory() {
    return this.http.get<Category[]>(this.baseUrl + 'category').pipe(
      map (
      response => {
        const model = response.map(o => ( {
          id : o.categoryId,
          name: o.categoryName
        }));
        return model;
      }
      )
    );;
  }

  getStatus() {
    return this.http.get<Status[]>(this.baseUrl + 'status').pipe(
      map (
      response => {
        const model = response.map(o => ( {
          id : o.statusId,
          name: o.name
        }));
        return model;
      }
      )
    );;
  }

  getAllAdmins() {
    return this.http.get<User[]>(this.baseUrl + 'user/admin').pipe(
      map (
      response => {
        const model = response.map(o => ( {
          id : o.userId,
          name: o.name
        }));
        return model;
      }
      )
    );;
  }

  getPriority() : Observable<dropdownModel[]> {
    return this.http.get<Priority[]>(this.baseUrl + 'priority').pipe(
      map (
      response => {
        const model = response.map(o => ( {
          id : o.priorityId,
          name: o.priorityName
        }));
        return model;
      }
      )
    );
  }
}
