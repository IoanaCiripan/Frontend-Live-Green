import { SelectionModel } from "@angular/cdk/collections";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  AdminOfferResponseModel,
  OfferModel,
  OfferResponseModel,
} from "app/shared/models/offer.model";
import { OfferService } from "app/shared/services/offer.service";
import { AddOfferDialog } from "./add-offer/add-offer.component";

@Component({
  selector: "app-admin-offers",
  templateUrl: "./admin-offers.component.html",
  styleUrls: [
    "./admin-offers.component.scss",
    "../shared/styles/responsive-table.component.scss",
  ],
  providers: [OfferService],
})
export class AdminOffersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<OfferModel>(true, []);
  totalRows: number;

  constructor(
    private offerService: OfferService,
    private matDialog: MatDialog
  ) {}

  dataSource: MatTableDataSource<OfferModel>;
  displayedColumns = [
    "select",
    "name",
    "description",
    "city",
    "points",
    "expirationDate",
  ];

  ngOnInit() {
    this.dataSource = new MatTableDataSource<OfferModel>();
    this.getAllOffers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllOffers() {
    this.offerService.getOffers().subscribe(
      (res: AdminOfferResponseModel) => {
        this.dataSource.data = res.data.offers;
        this.totalRows = this.dataSource.data.length;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  onAddOffer() {
    let dialogRef = this.matDialog.open(AddOfferDialog, {
        height: 'auto',
        width: 'auto',
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getAllOffers();
      });
  }

  onUpdate() {
    const offer = this.selection.selected[0];

    this.offerService.updateOffer(offer).subscribe( res => {
        this.getAllOffers();
        this.selection.clear();
    }, err => {
        console.log(err.error.message);
    })
  }

  onDelete() {
      const offer = this.selection.selected[0];

      this.offerService.deleteOffer(offer.id).subscribe( res => {
          this.getAllOffers();
          this.selection.clear();
      }, err => {
          console.log(err.error.message);
      });
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
