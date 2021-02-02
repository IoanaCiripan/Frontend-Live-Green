import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ProductModel, ProductResponseModel } from "app/shared/models/products.model";
import { ProductService } from "app/shared/services/product.service";
import { OfferModel, OfferResponseModel } from "../shared/models/offer.model";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
  providers: [ProductService],
})
export class ProductsComponent implements OnInit {
  products: ProductModel[] = [];
  searchForm: FormGroup;

  constructor(private productService: ProductService, public fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: new FormControl(""),
    });

    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(
      (res: ProductResponseModel) => {
        this.products = res.data;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  onSearch() {
    let points = this.searchForm.get("search").value;
    if (points) {
      this.productService.searchProduct(points).subscribe(
        (res: ProductResponseModel) => {
          this.products = res.data;
        },
        (err) => {
          console.log(err.error.message);
        }
      );
    }
    this.getAllProducts();
  }

  setDefaultPic(product: ProductModel) {
    product.image = "../../assets/img/placeholder.png";
  }
}
