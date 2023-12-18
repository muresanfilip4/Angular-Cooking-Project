import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';


@Injectable({
    providedIn: 'root'
    //alternative to adding this service in app.module/providers
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {
        
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://angular-recipes-book-project-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(response => {
            console.log(response);
        } ); 
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://angular-recipes-book-project-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
        )
    }
}