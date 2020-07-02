import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit, OnDestroy {

  @Input() product:Product;
  public subscription: Subscription;
  public quantity:number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    // GET THE SHOPPING CART
    this.shoppingCartService.getCart().then(
      shoppingCart => {
        this.subscription = shoppingCart.subscribe(cart => {
          this.quantity = this.shoppingCartService.getQuantity(cart,this.product);
        })
      }
    )
  }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product)
  }

  removeFromCart(product: Product) {
    this.shoppingCartService.removeFromCart(product)
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
