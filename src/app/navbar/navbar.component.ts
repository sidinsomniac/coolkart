import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public appUser: AppUser;
  public shoppingCartItemCount: number = 0;

  constructor(private authService: AuthService, private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.authService.appUser$.subscribe(user => {
      this.appUser = user;
    });

    // CALCULATE TOTAL ITEMS IN CART
    let cartQuantityList$ = await this.cartService.getTotalItemsInCart();
    cartQuantityList$.subscribe(totalQuantity => {
      this.shoppingCartItemCount = totalQuantity.totalCount;
    });
  }

  logout() {
    this.authService.logout();
  }

}
