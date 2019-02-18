import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  categoryUrl="assets/json/categories.json";
  recipesUrl="assets/json/recipe.json";

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get(this.categoryUrl);
  }

  getRecipes(){
    return this.http.get(this.recipesUrl);
  }
}
