import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { take } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public id: string = '';
  public productDetails = {};

  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getProduct(this.id).pipe(take(1)).subscribe(product => {
      this.productDetails = product;
      console.log(product);
    });
  }

  addToCart(product) {
    this.shoppingCartService.addToCart(product)
  }

}
