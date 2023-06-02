const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into MyFavorites (user_id,recipe_id) values (${user_id},${recipe_id})`);
}

async function markAsViewed(user_id, recipe_id){
    await DButils.execQuery(`insert into userrecipeviewed (user_id,recipe_id) values (${user_id},${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from MyFavorites where user_id=${user_id}`);
    return recipes_id;
}

async function getAllViewedRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from userrecipeviewed where user_id=${user_id}`);
    return recipes_id;
}

async function getLastViewedRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select * from lastviewd where user_id=${user_id}`);
    return recipes_id;
}

async function getMyRecipes(user_id)
{
    const recipes_id = await DButils.execQuery(`select id from MyRecipes where user_id=${user_id}`);
    return recipes_id;
}

async function getMyFamilyRecipes(user_id)
{
    const recipes_id = await DButils.execQuery(`select id from MyFamilyRecipes where user_id=${user_id}`);
    return recipes_id;
}


async function getMyRecipeInformation(recipe_id) {
    const recipe_information = await DButils.execQuery(`select * from MyRecipes where id='${recipe_id}'`);
    return recipe_information;
}

async function getMyRecipePreviewDetails(recipe_id) {
    let recipe_info = await getMyRecipeInformation(recipe_id);
    let { id ,user_id, recipe_name, recipe_time,popularity, vegan,gloten,courses_num, instructions, ingridiants, vegetarian, img} = recipe_info[0];
    value={
        id: id,
        recipe_name: recipe_name,
        recipe_time: recipe_time,
        popularity: popularity,
        vegan: vegan,
        gloten: gloten,
        vegetarian: vegetarian,
        img: img,
    };
    return value;
}

async function getMyRecipesPreview(recipe_ids_list){
    return_array = []
    for (let i = 0; i < recipe_ids_list.length; i++) {
        return_array[i] =await getMyRecipePreviewDetails(recipe_ids_list[i])
      }
      return return_array
}

async function getMyFamilyRecipeInformation(recipe_id) {
    const recipe_information = await DButils.execQuery(`select * from MyFamilyRecipes where id='${recipe_id}'`);
    return recipe_information;
}

async function getMyFamilyRecipePreviewDetails(recipe_id) {
    let recipe_info = await getMyFamilyRecipeInformation(recipe_id);
    let { id ,user_id, recipe_name, recipe_time,popularity, vegan,gloten,courses_num, instructions, ingridiants, vegetarian, img} = recipe_info[0];
    value={
        id: id,
        recipe_name: recipe_name,
        recipe_time: recipe_time,
        popularity: popularity,
        vegan: vegan,
        gloten: gloten,
        vegetarian: vegetarian,
        img: img,
    };
    return value;
}

async function getMyFamilyRecipesPreview(recipe_ids_list){
    return_array = []
    for (let i = 0; i < recipe_ids_list.length; i++) {
        return_array[i] =await getMyFamilyRecipePreviewDetails(recipe_ids_list[i])
      }
      return return_array
}

async function addtoThreelastView(user_id,recipe_id,place){
    await DButils.execQuery(`UPDATE lastviewd SET recipe${place}=${recipe_id} WHERE user_id=${user_id}`);
    let new_place=place+1;
    if(new_place==4)
    {
        new_place=1;
    }
    await DButils.execQuery(`UPDATE lastviewd SET place=${new_place} WHERE user_id=${user_id}`);
  };



exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.getMyRecipes = getMyRecipes;
exports.getMyRecipeInformation = getMyRecipeInformation;
exports.getMyRecipePreviewDetails = getMyRecipePreviewDetails;
exports.getMyRecipesPreview = getMyRecipesPreview;
exports.getMyFamilyRecipesPreview = getMyFamilyRecipesPreview;
exports.getMyFamilyRecipePreviewDetails = getMyFamilyRecipePreviewDetails;
exports.getMyFamilyRecipeInformation = getMyFamilyRecipeInformation;
exports.getMyFamilyRecipes=getMyFamilyRecipes;
exports.getLastViewedRecipes=getLastViewedRecipes;
exports.markAsViewed=markAsViewed;
exports.getAllViewedRecipes=getAllViewedRecipes;

exports.addtoThreelastView=addtoThreelastView;
