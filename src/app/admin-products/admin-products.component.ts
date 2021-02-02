import { SelectionModel } from "@angular/cdk/collections";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  AdminProductResponseModel,
  ProductModel,
} from "app/shared/models/products.model";
import { ProductService } from "app/shared/services/product.service";
import { AddProductDialog } from "./add-product/add-product.component";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: [
    "./admin-products.component.scss",
    "../shared/styles/responsive-table.component.scss",
  ],
  providers: [ProductService],
})
export class AdminProductsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<ProductModel>(true, []);

  constructor(
    private productService: ProductService,
    private matDialog: MatDialog
  ) {}

  dataSource: MatTableDataSource<ProductModel>;
  displayedColumns = ["select", "name",  "qrCode", "points"];

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ProductModel>();
    this.getAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(
      (res: AdminProductResponseModel) => {
        this.dataSource.data = res.data.products;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  onAddProduct() {
    let dialogRef = this.matDialog.open(AddProductDialog, {
      height: "auto",
      width: "auto",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllProducts();
    });
  }

  onUpdate() {
    const product = this.selection.selected[0];

    this.productService.updateProduct(product).subscribe(
      (res) => {
        this.getAllProducts();
        this.selection.clear();
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  onDelete() {
    const product = this.selection.selected[0];
    console.log(product);

    this.productService.deleteProduct(product._id).subscribe(
      (res) => {
        this.getAllProducts();
        this.selection.clear();
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
}
