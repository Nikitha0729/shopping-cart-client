import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from './cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/record';

  constructor(private http: HttpClient) {}

  getRecords(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }

  addRecord(record: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, record);
  }

  updateRecord(id: string, record: Cart): Observable<Cart> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Cart>(url, record);
  }

  deleteRecord(recordId: string): Observable<any> {
    const url = `${this.apiUrl}/${recordId}`;
    return this.http.delete(url);
  }
}
