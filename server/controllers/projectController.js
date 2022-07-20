require('../models/database');
const res = require('express/lib/response');
const Category = require('../models/Category');
const Project = require('../models/Project');


/** 
 * GET /
 * HOMEPAGE
*/
// ['MachineLearning', 'DataScience', 'WebDev', 'AppDev', 'FluidDynamics','ThermoDynamics','MachineDesigning'],
// IoT , App Devlopment , 3D Printing , COA , Web Devlopment , DS  
exports.homepage = async(req, res) => {

    try {
        const limitNnumber = 5;
        const categories = await Category.find({}).limit(limitNnumber);
        const latest = await Project.find({}).sort({_id: -1}).limit(limitNnumber);
        const iot = await Project.find({'category': 'IoT'}).limit(limitNnumber);
        const appDev = await Project.find({'category': 'App Devlopment'}).limit(limitNnumber);
        const printing  = await Project.find({'category': '3D Printing'}).limit(limitNnumber);
        const webDev = await Project.find({'category': 'Web Devlopment'}).limit(limitNnumber);
        const coa = await Project.find({'category': 'COA'}).limit(limitNnumber);
        const DS = await Project.find({'category': 'DS'}).limit(limitNnumber);
        const food = {latest , iot, appDev ,printing , webDev ,coa , DS  };
        // res.render('index' , { title : 'Projecto- Home', categories, food});
        res.json(food)
        
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
        
    }  
}

/** 
 * GET /categories
 * Categories
*/
exports.exploreCategories = async(req, res) => {

    try {
        const limitNnumber = 20;
        const categories = await Category.find({}).limit(limitNnumber);
        res.render('categories' , { title : 'Projecto- All_Projects', categories});
        
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
        
    }  
}

/** 
 * GET /categories/:id
 * Categories by Id
*/
exports.exploreCategoriesById = async(req, res) => {

    try {
        let categoryId = req.params.id;
        const limitNumber = 10;
        const categoryById = await Project.find({ 'category': categoryId }).limit(limitNumber);
        res.render('categories' , { title : 'Projecto- Category-Project', categoryById});
        
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
        
    }  
}

/** 
 * GET /project/:id
 * Project
*/
exports.exploreProject = async(req, res) => {

    try {
        let recipeId = req.params.id;
        const project = await Project.findById(recipeId);
        res.render('project' , { title : 'Projecto- Projects' , project });
        
    } catch (error) {
        res.send({message: error.message || "Error Occured" });
        
    }  
}
/**
 * POST /search
 * Search searchProject
 */
 exports.searchProject = async(req, res) => {
    //  searchTerm
    try {
        let searchTerm = req.body.searchTerm;
        let project = await Project.find( { $text: { $search: searchTerm, $diacriticSensitive: true}} );
        res.render('search' , {title: 'Projecto-Search' ,project  });
        res.json(project);
    } catch (error) {
        res.send({message: error.message || "Error Occured" });
    }    
 }
/** 
 * GET /explore-latest
 *  exploreLatest
*/
exports.exploreLatest = async(req, res) => {

    try {
        const limitNumber = 20;
        const project = await Project.find({}).sort({ _id: -1 }).limit(limitNumber);
        res.render('explore-latest', { title: 'Cooking Blog - Explore Latest', project } );
      } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
      }
}

/**
 * GET / explore-random
 * Explore Random as JSON
 */
exports.exploreRandom = async(req , res) => {
    try {
       let count = await Project.find().countDocuments();
       let random = Math.floor(Math.random()*count);
       let project = await Project.findOne().skip(random).exec();
       
        res.render('explore-random', { title: 'Projecto- Explore Random', project} );
      } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
      }
}



/**
 * GET /submit-project
 * Submit Project
*/
exports.submitProject = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-project', { title: 'Projecto- Uplode Project', infoErrorsObj, infoSubmitObj  } );
  }



/**
 * POST /submit-project
 * Submit Project
*/
exports.submitProjectOnPost = async(req, res) => {
    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }
  
      const newProject = new Project({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        technology: req.body.ingredients,
        category: req.body.category,
        domain:  req.body.domains,
        image: newImageName
      });
    
      
      await newProject.save();
      req.flash('infoSubmit', 'Project has been added.')
      res.redirect('/submit-project');
    } catch (error) {
      // res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/submit-project');
    }
  }
  
  

// ['MachineLearning', 'DataScience', 'WebDev', 'AppDev', 'FluidDynamics','ThermoDynamics','MachineDesigning'],

// async function insertDymmyCategoryData(){
//    try {
//        await Category.insertMany(
//         [{
//                 "name": "IoT",
//                 "image": "Iot_1.jpg"
//             },
//             {
//                 "name": "DS",
//                 "image": "DS_1.jpg"
//             },
//             {
//                 "name": "App Devlopment",
//                 "image": "webDev.png"
//             },
//             {
//                 "name": "Web Devlopment",
//                 "image": "webDev.png"
//             },
//             {
//                 "name": "COA",
//                 "image": "COA_1.jpg"
//             },
//             {
//                 "name": "3D Printing",
//                 "image": "3DP_1.png"
//             },
//         ]);
//    } catch (error) {
//       console.log('err' , + error) 
//    } 
// }

// insertDymmyCategoryData();


async function insertDymmyRecipeData(){
   try {
       await Project.insertMany([
        {
            "name": "Movie Recommendation System",
            "description": "Recommendation systems are becoming increasingly important in today’s extremely busy world. People are always short on time with the myriad tasks they need to accomplish in the limited 24 hours. Therefore, the recommendation systems are important as they help them make the right choices, without having to expend their cognitive resources.",
            "email": "devvv@gmail.com",
            "technology": [ "Collaborative filtering ", "Memory-based Algorithm "
    
            ],
            "domain": "Hardware",
            "category":  'Web Devlopment',
            "image": "ML.png",
            
    
        },
    
        {
            "name": " Diesses Detection ",
            "description": "Recommendation systems are becoming increasingly important in today’s extremely busy world. People are always short on time with the myriad tasks they need to accomplish in the limited 24 hours. Therefore, the recommendation systems are important as they help them make the right choices, without having to expend their cognitive resources.",
            "email": "devvv@gmail.com",
            "technology": [ "image prossecing ", "Memory-based Algorithm "],
            "domain": "Hardware",
            "category": 'COA' ,
            "image": "iot.jpg",
            
    
        },
    
        {
            "name": " Blog website ",
            "description": "Recommendation systems are becoming increasingly important in today’s extremely busy world. People are always short on time with the myriad tasks they need to accomplish in the limited 24 hours. Therefore, the recommendation systems are important as they help them make the right choices, without having to expend their cognitive resources.",
            "email": "devvv@gmail.com",
            "technology": [ "image prossecing ", "Memory-based Algorithm "],
            "domain": "Hardware",
            "category":  '3D Printing',
            "image": "iot.jpg",
            
    
        },
    
        
        {
            "name": " Design Of Airfoil ",
            "description": "Recommendation systems are becoming increasingly important in today’s extremely busy world. People are always short on time with the myriad tasks they need to accomplish in the limited 24 hours. Therefore, the recommendation systems are important as they help them make the right choices, without having to expend their cognitive resources.",
            "email": "devvv@gmail.com",
            "technology": [ "image prossecing ", "Memory-based Algorithm "],
            "domain": "Hardware",
            "category":  'App Devlopment' ,
            "image": "iot.jpg",
            
    
        },
        
    
        
        {
            "name": " Themperature Sink ",
            "description": "Recommendation systems are becoming increasingly important in today’s extremely busy world. People are always short on time with the myriad tasks they need to accomplish in the limited 24 hours. Therefore, the recommendation systems are important as they help them make the right choices, without having to expend their cognitive resources.",
            "email": "devvv@gmail.com",
            "technology": [ "image prossecing ", "Memory-based Algorithm "],
            "domain": "Hardware",
            "category": 'IoT',
            "image": "iot.jpg",
            
    
        },
    
        
        {
            "name": " Staires Climbing Wheel",
            "description": "Recommendation systems are becoming increasingly important in today’s extremely busy world. People are always short on time with the myriad tasks they need to accomplish in the limited 24 hours. Therefore, the recommendation systems are important as they help them make the right choices, without having to expend their cognitive resources.",
            "email": "devvv@gmail.com",
            "technology": [ "image prossecing ", "Memory-based Algorithm "],
            "domain": "Hardware",
            "category": 'IoT',
            "image": "iot.jpg",
            
    
        },
    
        {
            "name": "Can And Follower",
            "description": "Recommendation systems are becoming increasingly important in today’s extremely busy world. People are always short on time with the myriad tasks they need to accomplish in the limited 24 hours. Therefore, the recommendation systems are important as they help them make the right choices, without having to expend their cognitive resources.",
            "email": "devvv@gmail.com",
            "technology": [ "image prossecing ", "Memory-based Algorithm "],
            "domain": "Hardware",
            "category": 'IoT',
            "image": "iot.jpg",
            
    
        },
        {
            "name": " Clutch Design",
            "description": "Recommendation systems are becoming increasingly important in today’s extremely busy world. People are always short on time with the myriad tasks they need to accomplish in the limited 24 hours. Therefore, the recommendation systems are important as they help them make the right choices, without having to expend their cognitive resources.",
            "email": "devvv@gmail.com",
            "technology": [ "image prossecing ", "Memory-based Algorithm "],
            "domain": "Hardware",
            "category": 'App Devlopment',
            "image": "iot.jpg",
            
    
        },
        {
            "name": "Crank Shaft",
            "description": "Recommendation systems are becoming increasingly important in today’s extremely busy world. People are always short on time with the myriad tasks they need to accomplish in the limited 24 hours. Therefore, the recommendation systems are important as they help them make the right choices, without having to expend their cognitive resources.",
            "email": "devvv@gmail.com",
            "technology": [ "image prossecing ", "Memory-based Algorithm "],
            "domain": "Hardware",
            "category":'App Devlopment',
            "image": "iot.jpg",
            
    
        },
    
        {
            "name": " News website ",
            "description": "Recommendation systems are becoming increasingly important in today’s extremely busy world. People are always short on time with the myriad tasks they need to accomplish in the limited 24 hours. Therefore, the recommendation systems are important as they help them make the right choices, without having to expend their cognitive resources.",
            "email": "devvv@gmail.com",
            "technology": [ "image prossecing ", "Memory-based Algorithm "],
            "domain": "Hardware",
            "category": 'App Devlopment',
            "image": "iot.jpg",
            
    
        },
    
    
    ]);
   } catch (error) {
      console.log('err' , + error) 
   } 
}

insertDymmyRecipeData();

// 'Machine Learning', 'Data Science', 'Web Dev', 'App Dev', 'Fluid Dynamics','Thermo Dynamics','Machine Designing'



// 'App_Dev', 'Fluid_Dynamics','Thermo_Dynamics','Machine_Designing'