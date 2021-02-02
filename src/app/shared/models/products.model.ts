export interface ProductModel {
    _id?: string;
    name: string;
    points: number;
    qrCode: string;
    createdAt?: Date;
    image?: string;
}

export interface ProductResponseModel {
    status: string;
    numArticles: number;
    data: ProductModel[];
}

export interface ScanResponseModel {
    status: string;
    numArticles: number;
    data: ProductModel;
}

export interface ScanModel {
    qrCode: string;
}

export interface AdminProductResponseModel {
    state: string;
    numProducts: number;
    data: DataModel;
}

export interface DataModel {
    products: ProductModel[];
}