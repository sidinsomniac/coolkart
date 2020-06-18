import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, Sort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  public products: any[];

  public filteredProducts: any[];
  public dataSource = new MatTableDataSource(this.filteredProducts);

  public subscription: Subscription;

  public displayedColumns: string[] = ['title', 'price', 'category', ' '];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAllProducts().subscribe(products => {
      this.filteredProducts = this.products = products;
      this.setDataSource();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterProduct(event) {
    debugger;
    let query = event.target.value.toLowerCase();
    this.filteredProducts = query ?
      this.products.filter(product => product.value.productTitle.toLowerCase().includes(query)) : this.products;
    this.setDataSource();
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource(this.filteredProducts);
  }

  sortData(sort: Sort) {
    const data = this.filteredProducts.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return this.compare(a.value.productTitle, b.value.productTitle, isAsc);
        case 'price': return this.compare(a.value.productPrice, b.value.productPrice, isAsc);
        case 'category': return this.compare(a.value.productCategory, b.value.productCategory, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    console.log(a);
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
