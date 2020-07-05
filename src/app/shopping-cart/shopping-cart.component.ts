import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<ShoppingCart>;
  products: string[];
  totalPrices: number[];
  grandTotal: number;
  public shoppingCartItemCount: number = 0;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();

    // CALCULATE TOTAL ITEMS IN CART
    let cartQuantityList$ = await this.cartService.getTotalItemsInCart();
    cartQuantityList$.subscribe(totalCartItems => {
      this.shoppingCartItemCount = totalCartItems.totalCount;
      this.products = totalCartItems.items ? Object.values(totalCartItems.items) : [];
      this.totalPrices = totalCartItems.totalPrice;
      this.grandTotal = totalCartItems.grandTotal;
      console.log(totalCartItems);
    });
  }

  clearCart() {
    this.cartService.clearCart();
  }

}
