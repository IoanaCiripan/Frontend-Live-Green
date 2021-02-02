import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserModel } from '../models/user.model';

@Injectable()
export class ArticleService {

    constructor(public http: HttpClient){}

    public url = environment.webApi + '/articles';

    getArticles() {
        return this.http.get(this.url);
    }
}