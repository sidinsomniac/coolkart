import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  public products: any[];
  public filteredProducts: any[];
  public subscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAllProducts().subscribe(products => {
      this.filteredProducts = this.products = products;
    });
  }

  filterProduct(event) {
    debugger;
    let query = event.target.value.toLowerCase();
    this.filteredProducts = query ?
    this.products.filter(product => product.value.productTitle.toLowerCase().includes(query)) : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
