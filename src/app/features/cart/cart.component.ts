import { NgxSpinnerComponent } from 'ngx-spinner';
import { CartService } from './../../core/services/cart.service';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Cart } from './models/cart.interface';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {

  private readonly cartService = inject (CartService);
  private readonly pLATFORM_ID = inject (PLATFORM_ID);


  cartDetials = signal<Cart>({} as Cart);

  ngOnInit():void {
if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getCartData();

} }

  getCartData():void{
   this.cartService.getLoggedUserCard().subscribe({
      next:(res) => {
        console.log(res.data);
        this.cartDetials.set(res.data);
      }
    })
  }

  removeItem(id:string):void {
    this.cartService.removeProductItem(id).subscribe ({
      next: (res) => {
        console.log(res);
        this.cartService.cartCount.set(res.numOfCartItems);
         this.cartDetials.set(res.data);
      }
    })
  }

  update(id:string, count:number):void{
this.cartService.updateCartCount(id,count).subscribe ({
  next: (res) =>{
    console.log(res);
    this.cartDetials.set(res.data);
  }
})
  }

  clearItem():void {
    this.cartService.clearCart().subscribe ({
      next: (res) => {
        console.log(res);
        this.cartDetials.set(res.data);
      }
    })
  }

}
