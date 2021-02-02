export interface ArticleModel {
    title: string;
    link: string;
    image: string;
    description: string;
}

export interface ArticleResponseModel {
    status: string;
    numArticles: number;
    data: ArticleModel[];
}