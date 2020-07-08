import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCartTotal } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  public checkoutForm = this.fb.group({
    "name": [''],
    "addressLine1": [''],
    "addressLine2": [''],
    "city": [''],
  });
  public cart:ShoppingCartTotal;
  public userId:AppUser;
  subscription: Subscription;
  userSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private cartService: ShoppingCartService,
    private orderService:OrderService,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {
    this.cartService.getTotalItemsInCart().then(
      cart$ => {
        this.subscription = cart$.subscribe(cart => {
          this.cart = cart;
          console.log(cart);
        })
      }
    );
    this.userSubscription = this.authService.appUser$.subscribe(uid => {
      this.userId = uid;
    });
  }

  async placeOrder() {
    if (!this.cart) return;
    let orderResponse;
    let order = new Order(this.userId,this.checkoutForm.value,this.cart);
    if (this.checkoutForm.valid) {
      orderResponse = await  this.orderService.placeOrder(order);
      this.router.navigate(['/order-success',orderResponse.key]);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
