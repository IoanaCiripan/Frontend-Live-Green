import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ResponseModel } from "app/shared/models/response.model";
import { UserModel } from "app/shared/models/user.model";
import { UserService } from "app/shared/services/user.service";
import { OfferModel, OfferResponseModel } from "../shared/models/offer.model";
import { OfferService } from "../shared/services/offer.service";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.css"],
  providers: [OfferService, UserService],
})
export class OffersComponent implements OnInit {
  offers: OfferModel[] = [];
  searchForm: FormGroup;
  user: UserModel;

  constructor(
    private offerService: OfferService,
    public fb: FormBuilder,
    private userService: UserService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: new FormControl(""),
    });

    this.getAllOffers();
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

  onSearch() {
    let points = this.searchForm.get("search").value;
    if (points) {
      this.offerService.searchOffer(points).subscribe(
        (res: OfferResponseModel) => {
          this.offers = res.data;
        },
        (err) => {
          console.log(err.error.message);
        }
      );
    }
    this.getAllOffers();
  }

  applyForOffer(offer: OfferModel) {
    console.log(offer);
    if (this.user.totalPoints >= offer.points) {
      this.snackBar.open(
        "Ati achizionat aceasta oferta! In scurt timp veti primi un mail cu detallile!",
        "×",
        { panelClass: "success", verticalPosition: "top", duration: 5000 }
      );

      this.offerService.getOffer(offer.id).subscribe( res => {
        console.log(res);
      }, err => {
        console.log(err.error.message);
      })
    } else {
      this.snackBar.open(
        "Nu aveti destul puncte pentru a achizitiona aceasta oferta! Continuati sa reciclati produse!",
        "×",
        { panelClass: "error", verticalPosition: "top", duration: 5000 }
      );
    }
  }

  setDefaultPic(offer: OfferModel) {
    offer.image = "../../assets/img/placeholder.png";
  }
}
