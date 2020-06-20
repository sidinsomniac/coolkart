import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/category.service';
import { Observable, Subscription } from 'rxjs';
import { ImageService } from 'src/app/image.service';
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
  public categories: any[];
  public imageSubscription: Subscription;

  public productForm = this.fb.group({
    productTitle: ['', Validators.required],
    productCategory: ['', Validators.required],
    productCategoryName: [''],
    productPrice: ['', [Validators.required, Validators.min(0)]],
    productDescription: ['', Validators.required],
    productImage: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private categoryService: CategoryService, private imageService: ImageService, private productService: ProductService) { }

  ngOnInit() {
    // GET LIST OF CATEGORIES
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    });
    // GET ID IF PRODUCT IS TO BE UPDATED
    this.id = this.route.snapshot.paramMap.get('id');
    
    // UPDATE CATEGORY NAME
    this.productForm.get('productCategory').valueChanges.subscribe(value => {
      this.productForm.patchValue({
        productCategoryName: this.returnCategoryName(value)[0].value.name
      })
    });

    // UPDATE PRODUCT IF IN EDIT MODE
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
    this.imageService.uploadFile(path, this.selectedFile);
  }

  setImageProp() {
    this.imageSubscription = this.imageService.imageProps.asObservable().subscribe(prop => {
      console.log(prop);
      this.productForm.patchValue({
        productImage: prop.imageUrl
      })
    });
  }

  // CONVERT DESCRIPTION TO ARRAY ITEMS
  stylizeDescription() {
    let splittedDesc = '';
    if (this.productForm.value.productDescription.includes('\n')) {
      splittedDesc = this.productForm.value.productDescription.split('\n');
      this.productForm.patchValue({
        productDescription: splittedDesc
      });
    } else {
      if (typeof (this.productForm.value.productDescription) != 'object') {
        this.productForm.get('productDescription').reset();
      }
    }
  }

  returnCategoryName(categoryVal) {
    return this.categories.filter(category => category.key === categoryVal )
  }

  deleteProduct() {
    if (this.id) {
      if (!confirm('Are you sure you want to delete this product?')) return;
      this.productService.deleteProduct(this.id);
      this.imageService.deleteImage(this.productForm.value.productImage);
      this.router.navigate(['/admin/products']);
    }
  }

  saveProduct() {
    console.log(this.productForm.value);
    if (this.productForm.valid) {
      if (this.id) {
        this.productService.updateProduct(this.id, this.productForm.value);
      } else {
        this.productService.createProduct(this.productForm.value);
      }
      this.router.navigate(['/admin/products']);
    } else {
      if (this.productForm.get('productImage').invalid) {
        this.invalidImage = true;
      }
      this.invalidForm = true;
    }
  }

  ngOnDestroy() {
    this.imageSubscription.unsubscribe();
  }

}
