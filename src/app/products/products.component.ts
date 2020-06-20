import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products = [];
  public category: string = "";
  public filteredProducts = [];
  public categories$;
  public categoriesCollapsed: boolean = true;

  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
    this.productService.getAllProducts().pipe(
      switchMap(products => {
        this.filteredProducts = this.products = products;
        return this.route.queryParams;
      })).subscribe(params => {
        this.category = params.category;
        this.filteredProducts = this.category ? this.products.filter(product => product.value.productCategory === this.category) : this.products;
      });
  };
}
