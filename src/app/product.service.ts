import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  createProduct(product) {
    return this.db.list('/products').push(product);
  }

  getAllProducts() {
    return this.db.list('/products').snapshotChanges().pipe(
      map(actions => actions.map(action => ({
        key: action.key,
        value: action.payload.val()
      })))
    );
  }

  getProduct(productId) {
    return this.db.object('/products/'+productId).snapshotChanges().pipe(
      map(snap => {
        let productObject = (<object>snap.payload.val());
        return {...productObject,...{key: snap.key}};
      })
    );
  }

  updateProduct(productId,product) {
    return this.db.object('/products/'+productId).update(product)
  }

  deleteProduct(productId) {
    return this.db.object('/products/'+productId).remove();
  }

}
