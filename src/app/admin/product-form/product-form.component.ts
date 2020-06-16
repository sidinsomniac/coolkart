import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public selectedFile = null;

  public productForm = this.fb.group({
    productTitle: [''],
    productCategory: [''],
    productPrice: [''],
    productDescription: [''],
    productImage: {value: '', disabled: true}
  })

  constructor(private storage: AngularFireStorage, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onFileSelected(event, label) {
    const fileName = event.target.value.split("\\").pop();
    label.innerHTML = fileName;

    const path = `images/${Date.now()}_${fileName}`;
    const ref = this.storage.ref(path);

    this.selectedFile = event.target.files[0];

    ref.put(this.selectedFile).then(snapshot => {
      console.log('Uploaded a blob or file!', snapshot);
      console.log(this.productForm.value.productImage);
    });
  }

}
