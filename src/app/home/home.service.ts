import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import { Recipe } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  recipesList:AngularFireList<any>;
  categoryUrl="assets/json/categories.json";
  recipesUrl="assets/json/recipe.json";

  

  constructor(private http:HttpClient, private firebase:AngularFireDatabase) { }


  getRecipeList(){
    return this.firebase.list('recipes');
  }

  insertRecipe(data:Recipe){
    if(!this.recipesList){
      this.recipesList = this.getRecipeList();
    }
    console.log(data)
    this.recipesList.push(data);
  }
  updateRecipe(id,data:Recipe){
    if(!this.recipesList){
      this.recipesList = this.getRecipeList();
    }
    //copy obj
    //var datat=Object.assign({}, data);
    //delete datat.id;
    //datat.title='kolacici';
    this.recipesList.update(id,data)
  }

  getCategories(){
    return this.http.get(this.categoryUrl);
  }

  getRecipes(){
    return this.http.get(this.recipesUrl);
  }
}
