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
    let cartQuantityList$ = await this.cartService.getTotalItems();
    cartQuantityList$.subscribe(quantityList => {
      this.shoppingCartItemCount = quantityList.reduce((a, b) => a + b, 0);
    });
  }

  logout() {
    this.authService.logout();
  }

}
