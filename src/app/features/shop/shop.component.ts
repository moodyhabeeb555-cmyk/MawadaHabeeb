import { ProductService } from './../../core/services/product.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../shared/ui/card/card.component';
import { Product } from '../../core/models/product.interface';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

@Component({
  selector: 'app-shop',
  imports: [CardComponent, NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  pageSize = signal<number>(0);
  cp = signal<number>(0);
  total = signal<number>(0);

  productList = signal<Product[]>([]);

  private readonly productService = inject(ProductService);
  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);

        this.productList.set(res.data);

        this.pageSize.set(res.metadata.limit);
        this.cp.set(res.metadata.currentPage);
        this.total.set(res.results);
      },
    });
  }

  pageChange(num:number):void {
this.productService.getAllProducts(num).subscribe({
      next: (res) => {
        console.log(res);

        this.productList.set(res.data);

        this.pageSize.set(res.metadata.limit);
        this.cp.set(res.metadata.currentPage);
        this.total.set(res.results);
      },
    });
  }
}
