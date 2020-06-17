import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs';
import { ImageUploadService } from 'src/app/image-upload.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public selectedFile = null;
  public id = '';
  public invalidForm = false;
  public invalidImage = false;
  public categories$: Observable<any[]>;

  public productForm = this.fb.group({
    productTitle: ['', Validators.required],
    productCategory: ['', Validators.required],
    productPrice: ['', [Validators.required, Validators.min(0)]],
    productDescription: ['', Validators.required],
    productImage: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private categoryService: CategoryService, private imageUpload: ImageUploadService, private productService: ProductService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).pipe(
        take(1)
      ).subscribe(prodData => {
        this.productForm.patchValue({
          productTitle: prodData['productTitle'],
          productCategory: prodData['productCategory'],
          productPrice: prodData['productPrice'],
          productDescription: prodData['productDescription'],
          productImage: prodData['productImage']
        })
      })
    }
    this.setImageProp();
  }

  onFileSelected(event, label) {
    // SET FILE NAME
    const fileName = event.target.value.split("\\").pop();
    label.innerHTML = fileName;
    // SET IMAGE PATH
    const path = `images/${Date.now()}_${fileName}`;
    this.selectedFile = event.target.files[0];

    // UPLOAD FILE AND GET BACK URL
    this.imageUpload.uploadFile(path, this.selectedFile);
  }

  setImageProp() {
    this.imageUpload.imageProps.subscribe(prop => {
      console.log(prop);
      this.productForm.patchValue({
        productImage: prop.imageUrl
      })
    });
  }

  stylizeDescription() {
    let splittedDesc = '';
    if (this.productForm.value.productDescription.includes('\n')) {
      splittedDesc = this.productForm.value.productDescription.split('\n');
      this.productForm.patchValue({
        productDescription: splittedDesc
      });
    }
  }

  saveProduct() {
    console.log(this.productForm.value);
    if (this.productForm.valid) {
      if (this.id) {
        this.productService.updateProduct(this.id, this.productForm.valueChanges);
      } else {
        this.productService.createProduct(this.productForm.value)
      }
      this.router.navigate(['/admin/products']);
    } else {
      if (this.productForm.get('productImage').invalid) {
        this.invalidImage = true;
      }
      this.invalidForm = true;
    }
  }

}
