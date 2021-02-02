import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import {
  ProductModel,
  ProductResponseModel,
  ScanModel,
  ScanResponseModel,
} from "../models/products.model";
import { UserModel } from "../models/user.model";

@Injectable()
export class ProductService {
  constructor(public http: HttpClient) {}

  public url = environment.webApi + "/products";

  getProducts() {
    return this.http.get(this.url);
  }

  searchProduct(points: number) {
    let params = new HttpParams();
    if (points < 100) {
      params = params.set("points[lte]", points.toString());
    } else {
      params = params.set("points[gte]", points.toString());
    }
    return this.http.get(this.url, { params });
  }

  scanCode(scanModel: ScanModel): Observable<ScanResponseModel> {
    return this.http.patch<ScanResponseModel>(
      this.url + "/scanCode",
      scanModel
    );
  }

  deleteProduct(productId: string) {
    return this.http.delete(this.url + "/" + productId);
  }

  updateProduct(product: ProductModel) {
    return this.http.patch(this.url + "/" + product._id, product);
  }

  createProduct(product: ProductModel) {
    return this.http.post(this.url, product);
  }
}
