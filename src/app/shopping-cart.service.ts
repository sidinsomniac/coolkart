import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { take, map } from 'rxjs/operators';
import { Product } from './models/product';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

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

  async getCart(): Promise<Observable<ShoppingCart | any>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let res = await this.createCart()
    localStorage.setItem('cartId', res.key);
    return res.key;
  }

  // \ADD OR REMOVE PRODUCT QUANTITY
  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.val()) {
        if (item.payload.val().quantity === 1 && change === -1) {
          item$.remove();
        } else {
          item$.update({ quantity: item.payload.val().quantity + change })
        }
      }
      else
        item$.set({ product: product, quantity: 1 })
    });
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  
  // GET ALL ITEMS IN CART
  async getTotalItemsInCart(): Promise<Observable<any>> {
    let cart$ = await this.getCart();
    return cart$.pipe(
      map(cart => {
        let tempArr = [];

        for (let productId in cart.items) {
          tempArr.push({
            quantity: cart.items[productId].quantity,
            totalPrice: cart.items[productId].quantity * cart.items[productId].product.productPrice
          });
        }
        return {
          totalCount: tempArr.reduce((a, b) => a + b.quantity, 0),
          totalPrice: tempArr.map(item => item.totalPrice),
          grandTotal: tempArr.reduce((a, b) => a + b.totalPrice, 0),
          items: cart.items
        };
      })
    )
  }

  // GET QUANTITY OF PRODUCT
  getQuantity(cart, product): number {
    console.log(cart, product);
    let item;
    if (!cart) return 0;
    if (cart['items']) {
      if (product) {
        item = cart['items'][product.key];
      }
    }
    return item ? item.quantity : 0;
  }
}
