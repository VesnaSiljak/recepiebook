import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes:any[] = [];

  constructor(private homeService:HomeService) { }

  ngOnInit() {
    this.getRecipes();
  }


    getRecipes() {
      this.homeService.getRecipes().subscribe(
        (data:any) => {
          this.recipes = data.recipes
          console.log(this.recipes);
        }
      )
    }
}
