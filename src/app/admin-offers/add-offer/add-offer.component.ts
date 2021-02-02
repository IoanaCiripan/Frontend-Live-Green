import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { OfferModel } from "app/shared/models/offer.model";
import { OfferService } from "app/shared/services/offer.service";
import { contains } from "jquery";

@Component({
  selector: "app-add-offer",
  templateUrl: "./add-offer.component.html",
  styleUrls: ["./add-offer.component.scss"],
  providers: [OfferService],
})
export class AddOfferDialog implements OnInit {
  offerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddOfferDialog>,
    public formBuilder: FormBuilder,
    private offerService: OfferService
  ) {}

  ngOnInit() {
    this.offerForm = this.formBuilder.group({
      name: new FormControl(""),
      city: new FormControl(""),
      description: new FormControl(""),
      points: new FormControl(""),
      expirationDate: new FormControl(""),
      people: new FormControl(""),
      image: new FormControl(null),
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveFile(event) {
    this.offerForm.controls["image"].setValue(event.name);
    console.log(this.offerForm.controls["image"].value);
  }

  onSave() {
    const name = this.offerForm.controls["name"].value;
    const city = this.offerForm.controls["city"].value;
    const description = this.offerForm.controls["description"].value;
    const points = this.offerForm.controls["points"].value;
    const expirationDate = this.offerForm.controls["expirationDate"].value;
    const people = this.offerForm.controls["people"].value;
    const image = this.offerForm.controls["image"].value;

    const offer = {
      name: name,
      description: description,
      city: city,
      points: points,
      expirationDate: expirationDate,
      people: people,
      image: image,
    } as OfferModel;

    this.offerService.createOffer(offer).subscribe(
      (res) => {
        console.log(res);
        this.closeDialog();
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
}
