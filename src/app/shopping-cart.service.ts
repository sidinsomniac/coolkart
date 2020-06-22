import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private createCart() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts' + cartId).valueChanges();
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let res = await this.createCart()
      localStorage.setItem('cartId', res.key);
      return this.getCart(res.key);
    }
    return this.getCart(cartId);
  }
}
