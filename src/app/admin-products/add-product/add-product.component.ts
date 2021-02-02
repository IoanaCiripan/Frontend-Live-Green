import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ProductModel } from "app/shared/models/products.model";
import { ProductService } from "app/shared/services/product.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
  providers: [ProductService],
})
export class AddProductDialog implements OnInit {
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddProductDialog>,
    public formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: new FormControl(""),
      qrCode: new FormControl(""),
      points: new FormControl(""),
      image: new FormControl(null),
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveFile(event) {
    this.productForm.controls["image"].setValue(event.name);
    console.log(this.productForm.controls["image"].value);
  }

  onSave() {
    const name = this.productForm.controls["name"].value;
    const qrCode = this.productForm.controls["qrCode"].value;
    const points = this.productForm.controls["points"].value;
    const image = this.productForm.controls["image"].value;

    const product = {
      name: name,
      qrCode: qrCode,
      points: points,
      image: image,
    } as ProductModel;

    this.productService.createProduct(product).subscribe(
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
