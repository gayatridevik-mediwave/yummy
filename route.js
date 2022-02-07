const db = require("better-sqlite3")("./yummydatabase/yummy.db", {
    fileMustExist: true,
});
const { Router } = require("express");
const router = Router();

//return all recipes
router.get(["/", "/recipes"], (req, res) => {
    const recipes = db.prepare(
        `SELECT recipe_id RID, 
          recipe_name RepName,
          food_type  FoodType
          FROM 
          yummy_recipe;`
    ).all();
    res.send(recipes);
});


//return one recipes
router.get("/:id", (req, res) => {
    const recipes = db
        .prepare(
            `SELECT
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
        yr.recipe_id=?;`
        )
        .get(req.params.id);
    if (!recipes) {
        return res.status(404).send({
            message: `${req.params.id} recipe not found`,
        });
    }
    res.send(recipes);
})


//adding one recipe
router.post("/", (req, res) => {
    const payload = req.body;
    if (
        !payload.recipe_name ||
        !payload.food_type ||
        !payload.img_url ||
        !payload.img_alt ||
        !payload.ing_req ||
        !payload.steps_to_prepare ||
        !payload.description
    ) {
        return res.status(404).send({
            message: "Enter all details about recipes",
        });
    }

    const addRecipe = db.prepare(
        `Insert INTO yummy_recipe 
        (recipe_name,food_type)
         VALUES (@recipe_name,@food_type);`
    ).run({
        recipe_name: payload.recipe_name,
        food_type: payload.food_type
    });
    const newRecipeId = addRecipe.lastInsertRowid;

    const recipeImage = db.prepare(
        `Insert INTO recipe_image
        (recipe_id,img_url,img_alt)
        VALUES (@newRecipeId,@img_url,@img_alt);`
    ).run({
        newRecipeId: newRecipeId,
        img_url: payload.img_url,
        img_alt: payload.img_alt
    });
    const recipeDesc = db.prepare(
        `Insert INTO yummy_recipe_desc
    (recipe_id,ing_req,steps_to_prepare,description) 
    VALUES (@newRecipeId,@ing_req,@steps_to_prepare,@description);`
    ).run({
        newRecipeId: newRecipeId,
        ing_req: payload.ing_req,
        steps_to_prepare: payload.steps_to_prepare,
        description: payload.description
    });
    console.log(JSON.stringify(payload));
    return res.status(201).send({
        newRecipeId: newRecipeId,
        recipe_name: payload.recipe_name,
        food_type: payload.food_type,
        img_url: payload.img_url,
        img_alt: payload.img_alt,
        ing_req: payload.ing_req,
        steps_to_prepare: payload.steps_to_prepare,
        description: payload.description,
    });
});

// //update a recipe

router.put("/:id", (req, res) => {
    const payload = req.body;
    if (!payload.recipe_name ||
        !payload.food_type ||
        !payload.img_url ||
        !payload.img_alt ||
        !payload.ing_req ||
        !payload.steps_to_prepare ||
        !payload.description) {
        return res.status(404).send({
            message: "Enter all details about recipe",
        });
    }

    const updateOneRecipe = db.prepare(
        `SELECT yr.recipe_id ID,
            yr.recipe_name Recipe,
            yr.food_type,
            ri.img_url Image,
            ri.img_alt Imgalt,
            rid.ing_reg,
            rid steps_to_prepare,
            rid description) 
            FROM 
            yummy_recipe yr
            INNER JOIN recipe_image ri
            ON yr.recipe_id = ri recipe_id
            INNER JOIN yummy_recipe_desc yrd
            ON yr.recipe_id = yrd.recipe_id
            WHERE yr.recipe_id =?;`
    )
        .get(req.params.id);
    if (!updateOneRecipe) {
        return res.status(404).send({
            message: `[req.params.id] recipe not found`,
        });
    }
    db.prepare(
        `UPDATE yummy_recipe
        SET
        recipe_name= @recipe_name,
        food_type = @ food_type,
        WHERE 
        recipe_id = @ recipe_id;`
    )
        .run({
            recipe_id: req.params.id,
            recipe_name: payload.recipe_name,
            food_type: payload.food_type,
        });

    db.prepare(
        `UPDATE recipe_image
            SET
            recipe_id = @ recipe_id
            img_url = @ img_url
            img_alt = @ img_alt
            WHERE 
            recipe_id: @recipe_id`
    ).run({
        recipe_id: req.params.recipe_id,
        img_url: payload.img_url,
        img_alt: payload.img_alt,
    });

    db.prepare(
        `UPDATE  yummy_recipe_desc
        SET 
        recipe_id = @recipe_id
        ing_req = @ ing_req
        steps_to_prepare = @ steps_to_prepare
        WHERE 
        recipe_id: @recipe_id`
    ).run({
        recipe_id: req.params.recipe_id,
        ing_req: payload.ing_req,
        steps_to_prepare: payload.steps_to_prepare,
        desc: payload.desc,
    });
    console.log(JSON.stringify(payload));
    return res.status(201).send({
        recipe_id: req.params.recipe_id,
        recipe_name: req.params.recipe_name,
        food_type: req.params.food_type,
        img_url: req.params.img_url,
        img_alt: req.params.img_alt,
        ing_req: req.params.ing_req,
        steps_to_prepare: req.params.steps_to_prepare,
        desc: req.params.desc,
    });
});

//delete a recipe
router.delete("/:id", (req, res) => {
    const deleteOneRecipe = db.
        prepare(
            `SELECT
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
        yr.recipe_id=?;`
        )
        .get(req.params.id);
    if (!deleteOneRecipe) {
        return res.status(404).send({
            message: `${req.params.id} recipe not found`,
        });
    }
    db.prepare(
        `DELETE FROM 
        recipe_image
        WHERE
     recipe_id =@ recipe_id;`
    ).run({ recipe_id: req.params.id });
    db.prepare(
        `DELETE FROM yummy_recipe_desc
        WHERE recipe_id =@recipe_id;`
    ).run({ recipe_id: req.params.id });
    db.prepare(
        `DELETE FROM yummy_recipe
        WHERE recipe_id =@recipe_id;`
    ).run({ recipe_id: req.params.id });

    return res.status(201).send({ deleteOneRecipe });
});

module.exports = router;



    // PRAGMA table_info(yummy_recipe);
    // 0|recipe_id|INTEGER|1||1
    // 1|recipe_name|VARCHAR(256)|0||0
    // 2|food_type|VARCHAR(256)|0||0

    // sqlite> PRAGMA table_info(recipe_image);
    // 0|img_id|INTEGER|1||1
    // 1|recipe_id|INTEGER|0||0
    // 2|img_url|VARCHAR(256)|0||0
    // 3|img_alt|VARCHAR(256)|0||0

    // sqlite> PRAGMA table_info(yummy_recipe_desc);
    // 0|des_id|INTEGER|1||1
    // 1|recipe_id|INTEGER|0||0
    // 2|ing_req|TEXT|0||0
    // 3|steps_to_prepare|TEXT|0||0
    // 4|description|TEXT|0||0


