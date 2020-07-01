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
  public rating:number = 0;
  public reviewers:number = 0;
  public productDetails = {};
  public shoppingCart = {};
  public subscription: Subscription;

  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // GET THE PRODUCT
    if (this.id) this.productService.getProduct(this.id).pipe(take(1)).subscribe(product => {
      this.productDetails = product;
      this.rating = (<any>product).rating;
      this.reviewers = (<any>product).reviewers;
      console.log(product);
    });
    // GET THE SHOPPING CART
    this.shoppingCartService.getCart().then(
      shoppingCart => {
        this.subscription = shoppingCart.subscribe(cart => {
          this.shoppingCart = cart;
        })
      }
    )
  }

  addToCart(product:Product) {
    this.shoppingCartService.addToCart(product)
  }
  
  removeFromCart(product:Product) {
    this.shoppingCartService.removeFromCart(product)
  }

  getQuantity(product:Product) {
    console.log(this.shoppingCart);
    let item;
    if (!this.shoppingCart) return 0;
    if (this.shoppingCart['items'])
    item = this.shoppingCart['items'][product.key];
    return item ? item.quantity : 0;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
