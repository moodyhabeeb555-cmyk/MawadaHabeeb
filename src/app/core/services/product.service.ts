import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);

  getAllProducts(pageNum:number = 1): Observable<any> {
    return this.httpClient.get(environment.baseURL + `/api/v1/products?page=${pageNum}`);
  }

  getSpecificProduct(productId: string): Observable<any> {
    return this.httpClient.get(environment.baseURL + `/api/v1/products/${productId}`);
  }
}
