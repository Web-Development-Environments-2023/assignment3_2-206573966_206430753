var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");


/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  console.log("here");
  console.log(req.session)
  console.log(req.session.user_id)
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});




/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    console.log("here in fav");
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

router.post('/addRecipe', async (req,res,next) => {
  try{
    let recipe_details = {
    user_id : req.session.user_id,
    title : req.body.title,
    img : req.body.img,
    time : req.body.time,
    popularity : req.body.popularity,
    vegan: req.body.vegan,
    vegetarian: req.body.vegetarian,
    glutenFree: req.body.glutenFree,
    extendedIngredients:req.body.extendedIngredients,
    analyzedInstructions:req.body.analyzedInstructions,
    servings:req.body.servings
    }
    await DButils.execQuery(
      `INSERT INTO MyRecipes (user_id,recipe_name,recipe_time,popularity,vegan,gloten,courses_num,instructions,ingredients,vegetarian,img) VALUES (${recipe_details.user_id}, '${recipe_details.title}' ,'${recipe_details.time}', ${recipe_details.popularity},
      ${recipe_details.vegan}, ${recipe_details.glutenFree},${recipe_details.servings},'${recipe_details.analyzedInstructions}','${recipe_details.extendedIngredients}',${recipe_details.vegetarian},'${recipe_details.img}')`
    );
    res.status(201).send({ message: "recipe created", success: true });
  } catch(error){
    next(error); 
  }
});


router.get('/ThreelastView', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getLastViewedRecipes(user_id);
    let recipes_id_array = [];
    if(recipes_id[0]==undefined)
    {
      res.status(200).send([]);
    }
    else{
      if(recipes_id[0].recipe1!=null)
      {
          recipes_id_array.push(recipes_id[0].recipe1);
      }
      if(recipes_id[0].recipe2!=null)
      {
          recipes_id_array.push(recipes_id[0].recipe2);
      }
      if(recipes_id[0].recipe3!=null)
      {
          recipes_id_array.push(recipes_id[0].recipe3);
      }
      console.log(recipes_id_array)
      const results = await recipe_utils.getRecipesPreview(recipes_id_array);

      res.status(200).send(results);
  }
  } catch(error){
    next(error); 
  }
});

router.get('/returnMyRecipe', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let my_recipes = {};
    const recipes_id = await user_utils.getMyRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.id)); //extracting the recipe ids into array
    const results = await user_utils.getMyRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

router.get('/returnMyFullRecipe/:recipeId', async (req,res,next) => {
  try{
    const results = await user_utils.getMyFullRecipesPreview(req.params.recipeId);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});


router.get('/returnMyFamilyRecipe', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let my_recipes = {};
    const recipes_id = await user_utils.getMyFamilyRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.id)); //extracting the recipe ids into array
    const results = await user_utils.getMyFamilyRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

router.get('/returnMyFullFanilyRecipe/:recipeId', async (req,res,next) => {
  try{
    const results = await user_utils.getMyFullFamilyRecipesPreview(req.params.recipeId);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});





/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/UserViewed', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsViewed(user_id,recipe_id);
    /**
     * adding and update 3 last viewd
     */
    let holder=await DButils.execQuery(`select place from lastviewd where user_id=${user_id}`);
    place=holder[0].place
    await user_utils.addtoThreelastView(user_id,recipe_id,place)
    res.status(200).send("The Recipe successfully saved as user viewed");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/UserViewed', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getAllViewedRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    res.status(200).send(recipes_id_array);
  } catch(error){
    next(error); 
  }
});


module.exports = router;
