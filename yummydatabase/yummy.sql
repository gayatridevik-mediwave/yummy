--select from db--
SELECT
yr.recipe_id ID,
yr.recipe_name RECIPE,
yr.food_type FoodType,
ri.img_url ImageURL,
ri.img_alt ImageInfo,
yrd.ing_req IngridentReq,
yrd.steps_to_prepare PrepSteps,
yrd.description RecipeDesc
 FROM
 yummy_recipe yr
INNER JOIN recipe_image ri 
ON yr.recipe_id=ri.recipe_id
INNER JOIN yummy_recipe_desc yrd
ON yr.recipe_id=yrd.recipe_id
WHERE 
yr.recipe_id=?;


`SELECT yr.recipe_id ID,
        yr.recipe_name Recipename,
        yr.food_typ FoodType
        yri.img_url Imageurl,
        yri.img_alt Imagealt,
        yrd.ing_reg IngridentReg,
        yrd.steps_to_prepare StepsToPrepare,
        yrd.description Description
        FROM
        yummy_recipe yr
        INNER JOIN recipe_image yri
        ON yr.recipe_id =yri.recipe_id
        INNER JOIN yummy_recipe_desc yrd
        ON yr.recipe_id=yrd.recipe.id
        WHERE yr.recipe_id = 1;`
        
       





 PRAGMA table_info(yummy_recipe);
0|recipe_id|INTEGER|1||1
1|recipe_name|VARCHAR(256)|0||0
2|food_type|VARCHAR(256)|0||0

sqlite> PRAGMA table_info(recipe_image);
0|img_id|INTEGER|1||1
1|recipe_id|INTEGER|0||0
2|img_url|VARCHAR(256)|0||0
3|img_alt|VARCHAR(256)|0||0

sqlite> PRAGMA table_info(yummy_recipe_desc);
0|des_id|INTEGER|1||1
1|recipe_id|INTEGER|0||0
2|ing_req|TEXT|0||0
3|steps_to_prepare|TEXT|0||0
4|description|TEXT|0||0




