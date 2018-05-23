import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl="/api/category/categories";

  constructor(private http: HttpClient) { }

  getCategories(){
    return this.http.get(this.categoryUrl);
  }
}