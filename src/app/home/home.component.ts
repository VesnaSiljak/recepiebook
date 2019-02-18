import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories:any=[];
  recipes:any=[];
  categoriesObj={};

  constructor(private homeService:HomeService) { }

  ngOnInit() {
    this.getCategories();
    
  }

  getCategories(){
    this.homeService.getCategories().subscribe(
      (data:any)=>{
        this.categories=data.categories;
        for(let i=0; i<this.categories.length; i++){
          this.categoriesObj[this.categories[i]]=0;
        }
        console.log(this.categoriesObj);
        this.getRecipes();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  getRecipes(){
    this.homeService.getRecipes().subscribe(
      (recipe:any)=>{
        this.recipes=recipe.recipes;
        for (var property in this.categoriesObj){
          console.log(property);
          for(let i=0; i<this.recipes.length; i++){
            if(property==this.recipes[i].category){
              this.categoriesObj[property]+=1;
            }
          }
        }
        console.log(this.categoriesObj);
      },
      (error)=>{
        console.log(error);
      }
      )
  }

}
