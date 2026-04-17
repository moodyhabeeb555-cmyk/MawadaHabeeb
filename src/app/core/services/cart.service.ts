import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  cartCount = signal<number>(0);


  createCashOrder(cartId:string, data:object):Observable<any>{
    return this.httpClient.post(environment.baseURL + `/api/v1/orders/${cartId}`, data )
  }

  createVisaOrder(cartId:string, data:object): Observable<any> {
    return this.httpClient.post(environment.baseURL + `/api/v1/orders/checkout-session/${cartId}?url=${environment.url}`, data ,);
  }
  addProductToCart(prodId:string): Observable<any> {
    return this.httpClient.post(environment.baseURL + `/api/v2/cart`, {
      productId: prodId,
    });
  }

  getLoggedUserCard():Observable<any> {
    return this.httpClient.get(environment.baseURL +`/api/v2/cart`);
  }

  removeProductItem(id:string):Observable<any>{
    return this.httpClient.delete(environment.baseURL + `/api/v2/cart/${id}`)
  }
  updateCartCount(id:string,count:number):Observable<any>{
    return this.httpClient.put(environment.baseURL + `/api/v2/cart/${id}`,
      {
  "count": count
}
    );
  }

  clearCart():Observable<any>{
    return this.httpClient.delete(environment.baseURL + `/api/v2/cart`)
  }
}
