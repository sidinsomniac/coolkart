import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories', query => query.orderByChild('name')).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((action) => ({
          key: action.key,
          value: action.payload.val(),
        }));
      })
    );
  }


  saveFilePath(path: string) {
    // this.db.object('/imageUrl/'+user.uid).update();
  }
}
