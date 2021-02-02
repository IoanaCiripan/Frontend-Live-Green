import { Component, OnInit } from "@angular/core";
import { OfferModel, OfferResponseModel } from "app/shared/models/offer.model";
import {
  ProductModel,
  ProductResponseModel,
} from "app/shared/models/products.model";
import { ResponseModel } from "app/shared/models/response.model";
import { UserModel } from "app/shared/models/user.model";
import { OfferService } from "app/shared/services/offer.service";
import { ProductService } from "app/shared/services/product.service";
import { UserService } from "app/shared/services/user.service";

@Component({
  selector: "app-rewards",
  templateUrl: "./get-rewards.component.html",
  styleUrls: ["./get-rewards.component.css"],
  providers: [OfferService, ProductService, UserService],
})
export class GetRewardsComponent implements OnInit {
  user: UserModel;
  offers: OfferModel[] = [];
  products: ProductModel[] = [];

  constructor(
    private offerService: OfferService,
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAllOffers();
    this.getAllProducts();
    this.getUserData();
  }

  getAllOffers() {
    this.offerService.getOffers().subscribe(
      (res: OfferResponseModel) => {
        this.offers = res.data;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
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

  getUserData() {
    this.userService.getUser().subscribe(
      (res: ResponseModel) => {
        this.user = res.data;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  setProductDefaultPic(product: ProductModel) {
    product.image = "../../assets/img/placeholder.png";
  }

  setOfferDefaultPic(offer: OfferModel) {
    offer.image = "../../assets/img/placeholder.png";
  }
}
