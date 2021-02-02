import { OffersModule } from "app/offers/offers.module";

export interface OfferModel {
    id: string;
    name: string;
    city: string;
    description: string;
    image: string;
    points: number;
    expirationDate: Date;
    people: number;
    modified?: boolean;
}

export interface OfferResponseModel {
    state: string;
    numOffers: number;
    data: OfferModel[];
}

export interface AdminOfferResponseModel {
    state: string;
    numOffers: number;
    data: DataModel;
}

export interface DataModel {
    offers: OfferModel[];
}