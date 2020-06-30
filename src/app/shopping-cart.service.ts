import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { take } from 'rxjs/operators';

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

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let res = await this.createCart()
    localStorage.setItem('cartId', res.key);
    return res.key;
  }

  async addToCart(product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.val())
        item$.update({ quantity: item.payload.val().quantity + 1 })
      else
        item$.set({ product: product, quantity: 1 })
    });
    console.log(cartId, product);
  }
}
