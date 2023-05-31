const axios = require("axios");
const DButils = require("./DButils");
const api_domain = "https://api.spoonacular.com/recipes";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}
async function searchRecipe(recipeName,Number,Cuisine,Diet,Intolerances,Sort) 
{
    return await axios.get(`${api_domain}/complexSearch?apiKey=${process.env.spooncular_apiKey}&${recipeName}&${Number}&${Cuisine}&${Diet}&${Intolerances}&${Sort}`);    
}

async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}
async function getFullRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image,servings, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients,analyzedInstructions} = recipe_info.data;
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        servings:servings,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        extendedIngredients:extendedIngredients,
        analyzedInstructions:analyzedInstructions,
    }
}
async function getRecipesPreview(recipe_ids_list){
    return_array = []
    for (let i = 0; i < recipe_ids_list.length; i++) {
        return_array[i] = await getRecipeDetails(recipe_ids_list[i])
      }
      return return_array
}



async function getRandomRecipes() {
    return await axios.get(`${api_domain}/random`, {
        params: {
            number: 3,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

function getRecipeDetailsRandom(recipe_details) {
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_details;
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}


async function getSearchResult(recipe_id) {

    let recipe_info1 = await getRecipeInformation(recipe_id);
    let {id,title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree,analyzedInstructions} = recipe_info1.data;
    value={
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        analyzedInstructions:analyzedInstructions,
    }
    return value;
}

async function getRecipessearchbyID(recipe_ids_list){
    return_array = []
    for (let i = 0; i < recipe_ids_list.length; i++) {
        return_array[i] =await getSearchResult(recipe_ids_list[i])
      }
    
    return return_array
}


exports.getRecipeDetails = getRecipeDetails;
exports.getRecipesPreview = getRecipesPreview;
exports.getRandomRecipes = getRandomRecipes;
exports.getRecipeDetailsRandom = getRecipeDetailsRandom;
exports.getFullRecipeDetails = getFullRecipeDetails;
exports.searchRecipe=searchRecipe
exports.getSearchResult=getSearchResult
exports.getRecipessearchbyID=getRecipessearchbyID
