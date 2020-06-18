import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public imageProps:Subject<{name:string, imageUrl:string}> = new Subject();

  constructor(private storage: AngularFireStorage) { }

  uploadFile(path,fileDetails) {

    const ref = this.storage.ref(path);

    ref.put(fileDetails).then(snapshot => {

      ref.getDownloadURL().toPromise().then(url => {
        console.log('DownloadUrl', url);
        return url;
      }).then(url => {
        this.imageProps.next({
          name: snapshot['metadata']['name'],
          imageUrl: url
        })
      })

      console.log('Uploaded a blob or file!', snapshot);
    });
  }

  deleteImage(path) {
    return this.storage.storage.refFromURL(path).delete();
  }
}
