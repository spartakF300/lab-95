const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const checkUser = require('../middleware/checkUser');
const upload = require('../multer').uploads;
const Recipes = require('../models/Recipes');
const router = express.Router();

router.get('/',checkUser, async (req, res) => {
    let params = {publish: true};

    try{
    if (req.query.id) {
        params = {user: req.query.id};

    }
    if (req.user.role === 'admin') {
        params = {};
    }

    const items = await Recipes.find(params).populate('user');
       return  res.send(items);
    }catch (e) {
        return res.status(400).send(e);
    }

});
router.get('/:id', async (req, res) => {
    try {
        const items = await Recipes.findById(req.params.id);
        res.send(items);
    } catch(e) {
        res.sendStatus(500);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const recipeData = {
            name: req.body.name,
            recipes: req.body.recipes,
            user: req.user._id
        };

        if (req.file) {
            recipeData.image = req.file.filename;
        }
        recipeData.ingredients = [...JSON.parse(req.body.ingredients)];
        const recipe = new Recipes(recipeData);

        await recipe.save();

        return res.send({id: recipe._id});
    } catch (e) {
        return res.status(400).send(e);

    }
});

router.post('/publish', [auth, permit('admin')], async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.query.id);
        if (!recipe) {
            return res.sendStatus(404);
        }
        recipe.publish = !recipe.publish;
        await recipe.save();
        return res.send(recipe._id);
    } catch (e) {
        res.sendStatus(500);
    }
});
router.delete('/', [auth, permit('admin')], async (req, res) => {
    try {
        await Recipes.deleteOne({_id:req.query.id});
        return res.status(200).send({message:'delete'});

    } catch (error) {
        return res.status(500).send({message:'error'});
    }
});
module.exports = router;