import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { take } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  public id: string = '';
  public rating: number = 0;
  public reviewers: number = 0;
  public productDetails = {};
  public subscription: Subscription;
  public quantity: number = 0;

  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // GET THE PRODUCT
    if (this.id) this.productService.getProduct(this.id).pipe(take(1)).subscribe(product => {
      this.productDetails = product;
      this.rating = (<any>product).rating;
      this.reviewers = (<any>product).reviewers;

      // GET THE SHOPPING CART
      this.shoppingCartService.getCart().then(
        shoppingCart => {
          this.subscription = shoppingCart.subscribe(cart => {
            this.quantity = this.shoppingCartService.getQuantity(cart, product);
          })
        }
      )
    });
  }


  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product)
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
