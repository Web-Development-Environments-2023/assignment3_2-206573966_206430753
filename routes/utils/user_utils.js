const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into MyFavorites values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from MyFavorites where user_id='${user_id}'`);
    return recipes_id;
}

async function getMyRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select id from MyRecipes where user_id='${user_id}'`);
    return recipes_id;
}



exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.getMyRecipes = getMyRecipes;

