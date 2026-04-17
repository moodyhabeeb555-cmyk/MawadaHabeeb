import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  productDetials = signal<Product>({} as Product);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.getProductDetials(params.get('id') !)
    });
  }

  getProductDetials(id:string): void {
    this.productService.getSpecificProduct(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productDetials.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
