var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));

/**
 * This path will do the search and will return recipes details
 */
router.get("/search/:query&:number&:cuisine&:diet&:intolerances&:sort", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.searchRecipe(req.params.query,req.params.number,req.params.cuisine,req.params.diet,req.params.intolerances,req.params.sort);
    let recipes_array = [];
    recipe.data["results"].map((element) => recipes_array.push(element["id"])); //extracting the recipe ids into array
    const results = await recipes_utils.getRecipessearchbyID(recipes_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
  //recipes_utils.getSearchResult(element))
});

/**
 * This path returns 3 different random recipes 
 */
router.get("/getRandomRecipes", async (req, res, next) => {
  console.log(req)
  try {
    const recipe = await recipes_utils.getRandomRecipes();
    let recipes_array = [];
    recipe.data["recipes"].map((element) => recipes_array.push(recipes_utils.getRecipeDetailsRandom(element))); //extracting the recipe ids into array
    res.send(recipes_array);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns a full recipe details of a recipe by its id
 */
router.get("/getFullRecipe/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getFullRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});



/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});




module.exports = router;
