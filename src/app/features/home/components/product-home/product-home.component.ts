import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-product-home',
  imports: [CardComponent],
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.css',
})
export class ProductHomeComponent implements OnInit {
  private readonly productService = inject(ProductService);


  productList = signal<Product[]>([]);

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);

        this.productList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

 
}
