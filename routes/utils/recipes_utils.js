const axios = require("axios");
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

async function getRecipesPreview(recipe_ids_list){
    return_array = []
    for (let i = 0; i < recipe_ids_list.length; i++) {
        return_array[i] = getRecipeDetails(recipe_ids_list[i])
      }
      return return_array
}

async function getMyRecipeInformation(recipe_id) {
    const recipe_information = await DButils.execQuery(`select * from MyRecipes where id='${recipe_id}'`);
    return recipe_information;
}

async function getMyRecipePreviewDetails(recipe_id) {
    let recipe_info = await getMyRecipeInformation(recipe_id);
    let { recipeID ,user_id, title, readyInMinutes,aggregateLikes, vegan,glutenFree,courses_num, instructions, ingridiants, vegetarian, image} = recipe_info.data;

    return {
        recipeID: recipeID,
        title: title,
        readyInMinutes: readyInMinutes,
        popularity: aggregateLikes,
        vegan: vegan,
        glutenFree: glutenFree,
        vegetarian: vegetarian,
        image: image,
    }
}

async function getMyRecipesPreview(recipe_ids_list){
    return_array = []
    for (let i = 0; i < recipe_ids_list.length; i++) {
        return_array[i] = getMyRecipePreviewDetails(recipe_ids_list[i])
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
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_details.data;
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



exports.getRecipeDetails = getRecipeDetails;
exports.getRecipesPreview = getRecipesPreview;
exports.getMyRecipeInformation = getMyRecipeInformation;
exports.getMyRecipePreviewDetails = getMyRecipePreviewDetails;
exports.getMyRecipesPreview = getMyRecipesPreview;
exports.getRandomRecipes = getRandomRecipes;
exports.getRecipeDetailsRandom = getRecipeDetailsRandom;


