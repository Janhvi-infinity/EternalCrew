const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
router.get('/' , projectController.homepage);
router.get('/project/:id', projectController.exploreProject);
router.get('/categories' , projectController.exploreCategories);
router.get('/categories/:id' , projectController.exploreCategoriesById);
router.get('/explore-latest', projectController.exploreLatest);
router.get('/explore-random', projectController.exploreRandom);
router.get('/submit-project', projectController.submitProject);
router.post('/search', projectController.searchProject);
router.post('/submit-project', projectController.submitProjectOnPost);


module.exports = router;
