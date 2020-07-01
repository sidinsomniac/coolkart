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

  private getItem(cartId, product) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  private async getOrCreateCartId():Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let res = await this.createCart()
    localStorage.setItem('cartId', res.key);
    return res.key;
  }

  async addToCart(product) {
    this.updateItemQuantity(product,1);
  }

  async removeFromCart(product) {
    this.updateItemQuantity(product,-1);
  }

  private async updateItemQuantity(product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.val())
      item$.update({ quantity: item.payload.val().quantity + change })
      else
      item$.set({ product: product, quantity: 1 })
    });
  }
}
