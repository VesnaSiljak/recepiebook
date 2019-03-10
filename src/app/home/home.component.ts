import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Recipe } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories:any=[];
  recipes:any=[];
  categoriesObj={};
  recipesList:any[];
  dumyData=new Recipe();

  constructor(private homeService:HomeService) {}

  ngOnInit() {
    this.getCategories();
  }
  addRecipe(data:Recipe){
    this.homeService.insertRecipe(data);
  }
  updateRecipe(id,data){
    this.homeService.updateRecipe(id,data)
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
    // this.homeService.getRecipes().subscribe(
    //   (recipe:any)=>{
    //     this.recipes=recipe.recipes;
    //     for (var property in this.categoriesObj){
    //       console.log(property);
    //       for(let i=0; i<this.recipes.length; i++){
    //         if(property==this.recipes[i].category){
    //           this.categoriesObj[property]+=1;
    //         }
    //       }
    //     }
    //     console.log(this.categoriesObj);
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    //   )

      var x=this.homeService.getRecipeList();
      x.snapshotChanges().subscribe(
        item=>{
          this.recipesList=[];
          item.forEach(element=>{
            var y= element.payload.toJSON();
            y["id"]=element.key;
            this.recipesList.push(y);
          })
          this.recipes=this.recipesList;
          for (var property in this.categoriesObj){
            console.log(property);
            for(let i=0; i<this.recipes.length; i++){
              if(property==this.recipes[i].category){
                this.categoriesObj[property]+=1;
              }
            }
          }
        }

      )

  }

}
