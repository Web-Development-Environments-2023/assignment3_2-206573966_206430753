const axios = require("axios");
const DButils = require("./DButils");
const api_domain = "https://api.spoonacular.com/recipes";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */

/**
 * This function returns recipe information according to the recipe id
 */
async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}


/**
 * This function returns the recipe from the search result after using the specific given parameters
 */
async function searchRecipe(recipeName,Number,Cuisine,Diet,Intolerances,Sort) 
{
    console.log("2")
    return await axios.get(`${api_domain}/complexSearch?apiKey=${process.env.spooncular_apiKey}&${recipeName}&${Number}&${Cuisine}&${Diet}&${Intolerances}&${Sort}`);    
}


/**
 * This function takes and return the specific information from the recipe according to the recipe id
 */
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

/**
 * This function takes and return the full specific information from the recipe according to the recipe id
 */
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

/**
 * This function recives a list of recepies id's and returns the recepies previws.
 */
async function getRecipesPreviewBulk(recipe_id) {
    return await axios.get(`${api_domain}/informationBulk?ids=${recipe_id}`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

/**
 * This function handles the recipe preview part for each recipe id in the list
 */
async function getRecipesPreview(recipe_ids_list){
    return_array = []
    for (let i = 0; i < recipe_ids_list.length; i++) {
        let temp = await getRecipeDetails(recipe_ids_list[i]);
        return_array[i] = temp;
    }
    return return_array
}


async function getRecipesPreviewTemp(recipe_ids_list){
    return_array = []
    for (let i = 0; i < recipe_ids_list.length; i++) {
        let temp = await getRecipeDetails(recipe_ids_list[i]);
        return_array[i] = temp;
    }
    return return_array
}


/**
 * This function return 3 random recipes
 */
async function getRandomRecipes() {
    return await axios.get(`${api_domain}/random`, {
        params: {
            number: 3,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

/**
 * This function takes and return the specific information to the random recipe
 */
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

/**
 * This function takes and return the specific information to the recipe from the search 
 */
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

/**
 * This function handles the recipe information part for each recipe id in the search result list
 */
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
exports.searchRecipe=searchRecipe;
exports.getSearchResult=getSearchResult;
exports.getRecipessearchbyID=getRecipessearchbyID;
exports.getRecipesPreviewTemp = getRecipesPreviewTemp;
exports.getRecipesPreviewBulk = getRecipesPreviewBulk
