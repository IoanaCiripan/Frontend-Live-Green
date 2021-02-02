import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BarcodeFormat } from "@zxing/library";
import { ProductModel, ScanModel } from "app/shared/models/products.model";
import { ProductService } from "app/shared/services/product.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-earn-points",
  templateUrl: "./earn-points.component.html",
  styleUrls: ["./earn-points.component.scss"],
  providers: [ProductService],
})
export class EarnPointsComponent {
  productDetails: ProductModel;

  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo = null;
  deviceSelected: string;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor(
    private readonly _dialog: MatDialog,
    private productService: ProductService
  ) {}

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    let scanModel = {
      qrCode: this.qrResultString,
    } as ScanModel;
    this.productService.scanCode(scanModel).subscribe(
      (res) => {
        this.productDetails = res.data;
        console.log(this.productDetails);
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || "";
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || "";
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
}
