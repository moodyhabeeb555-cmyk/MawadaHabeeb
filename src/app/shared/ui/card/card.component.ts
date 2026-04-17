
import { Component, inject, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/product.interface';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  product = input.required<Product>();

   addToCart(id: string): void {
    if (localStorage.getItem('freshToken')) {
      this.cartService.addProductToCart(id).subscribe({
        next: (res) => {
          console.log(res);
          if(res.status === 'success'){

            this.cartService.cartCount.set(res.numOfCartItems)
          this.toastrService.success(res.message, 'FreshCart', {

            progressBar: true,
            closeButton: true,
          });
        }},
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.toastrService.warning('login first', 'FreshCart', {
        progressBar: true,
        closeButton: true,
      });
    }
  }
}
