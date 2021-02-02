import { Component, OnInit } from '@angular/core';
import { ArticleModel, ArticleResponseModel } from 'app/shared/models/article.model';
import { ArticleService } from 'app/shared/services/article.service';
import { OfferService } from '../shared/services/offer.service';
import { OfferModel, OfferResponseModel } from '../shared/models/offer.model';
import { ProductModel, ProductResponseModel } from '../shared/models/products.model';
import { ProductService } from '../shared/services/product.service'
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ArticleService, OfferService, ProductService]
})
export class DashboardComponent implements OnInit {

  articles: ArticleModel[] = [];
  offers: OfferModel[] = [];
  products: ProductModel[] = [];

  constructor(
    private articleService: ArticleService,
    private offerService: OfferService,
    private ProductService: ProductService
  ) { }
  
  ngOnInit() {
      this.getAllArticles();
      this.getAllOffers();
      this.getAllProducts();
  }

  getAllArticles() {
    this.articleService.getArticles().subscribe( (res: ArticleResponseModel) => {
      this.articles = res.data;
      console.log(this.articles);
    }, err => {
      console.log(err.error.message);
    })
  }

  navigateToArticle(article: ArticleModel) {
    window.location.href = article.link;
  }

  getAllOffers() {
    this.offerService.getOffers().subscribe( (res: OfferResponseModel) => {
      this.offers = res.data;
      console.log(this.offers);
    }, err => {
      console.log(err.error.message);
    })
  }

  getAllProducts() {
    this.ProductService.getProducts().subscribe( (res: ProductResponseModel) => {
      this.products = res.data;
      console.log(this.products);
    }, err => {
      console.log(err.error.message);
    })
  }

  setProductDefaultPic(product: ProductModel) {
    product.image = "../../assets/img/placeholder.png";
  }

  setOfferDefaultPic(offer: OfferModel) {
    offer.image = "../../assets/img/placeholder.png";
  }

}
