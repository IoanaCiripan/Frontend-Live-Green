import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { off } from "process";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment";
import { OfferModel } from "../models/offer.model";
import { UserModel } from "../models/user.model";

@Injectable()
export class OfferService {
  constructor(public http: HttpClient) {}

  public url = environment.webApi + "/offers";

  getOffer(offerId: string) {
    return this.http.get(this.url + "/" + offerId);
  }

  getOffers() {
    return this.http.get(this.url);
  }

  searchOffer(points: number) {
    let params = new HttpParams();
    if (points < 100) {
      params = params.set("points[lte]", points.toString());
    } else {
      params = params.set("points[gte]", points.toString());
    }
    return this.http.get(this.url, { params });
  }

  deleteOffer(offerId: string) {
    return this.http.delete(this.url + "/" + offerId);
  }

  updateOffer(offer: OfferModel) {
    return this.http.patch(this.url + "/" + offer.id, offer);
  }

  createOffer(offer: OfferModel) {
    return this.http.post(this.url, offer);
  }
}
