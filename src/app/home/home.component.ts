import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Recipe } from './home.model';
import { AngularFireStorage } from 'angularfire2/storage';

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
  selectedFiles:FileList;
  file:File;
  imagesrc;

  constructor(private homeService:HomeService, private storage:AngularFireStorage ) {}

  chooseFiles(event){
    this.selectedFiles=event.target.files;
    if(this.selectedFiles.item(0))
      this.uploadpic();
  }

  uploadpic(){
    let file = this.selectedFiles.item(0);
    let uniqkey= 'pic' + Math.floor(Math.random()*1000000);
    const uploadTask= this.storage.upload('/angularfirestore/' + uniqkey,file).then(
      ()=>{
        const ref = this.storage.ref('/angularfirestore/' + uniqkey);
        const downloadURL=ref.getDownloadURL().subscribe(
          (url)=>{
            const Url = url; // for ts
            this.imagesrc = url;
            console.log(Url);
          }
        )
      }
    );
  }
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
