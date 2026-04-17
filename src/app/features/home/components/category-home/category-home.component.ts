import { Component, inject, OnInit, signal } from '@angular/core';
import { CatogriesService } from '../../../../core/services/catogries.service';
import { Category } from '../../../../core/models/category.interface';

@Component({
  selector: 'app-category-home',
  imports: [],
  templateUrl: './category-home.component.html',
  styleUrl: './category-home.component.css',
})
export class CategoryHomeComponent implements OnInit {
  private readonly catogriesService = inject (CatogriesService);

categoriesList = signal<Category[]>([])

  ngOnInit(): void {
    this.getCategoriesData();
  }
  getCategoriesData():void{
    this.catogriesService.getAllCategories().subscribe({
      next: (res) => {

        this.categoriesList.set(res.data)
      },
      error:(err) =>{
        console.log(err);
      }
    })
  }
}
