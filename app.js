require('dotenv').config();
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bcrypt = require("bcryptjs");
const cors  = require('cors')
//add
const Register = require("./server/models/registers");
const Institute_reg = require("./server/models/insti_reg");

const app = express();
const port = process.env.PORT;
//add
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());

require('dotenv').config();

app.use(express.urlencoded({ extended : true}));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');

app.set('view engine', 'ejs');
const routes = require('./server/routes/projectRoutes.js')
app.use('/', routes );

//User registration
app.get("/register", (req,res) => {
  res.render("register", {layout: "register"})
});
app.get("/login", (req,res) => {
  res.render("login", {layout: "login"})
});
app.get("/institute_reg", (req,res) => {
  res.render("institute_reg", {layout: "institute_reg"})
});
app.get("/institute_log", (req,res) => {
  res.render("institute_log", {layout: "institute_log"})
});

app.post("/register", async (req,res) => {
  try {
      const password = req.body.password;
      const cpassword = req.body.password2;

      if(password == cpassword){
          const user = new Register({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
          })

           //JWT part
           //console.log("the success part" + user);

          const token = await user.generateAuthToken();
          //  console.log(user);
          //  console.log("the token part " + token);

          //const registerd = await user.save();

          await user.save(); //when fail its goes to catch
          //console.log(saveUser); //when success it print.
          console.log('Saved ! ');
          // await user.save();
          res.status(201).render("login", {layout: "login"});

      }else{
          res.send("passwords not matching")
      }
  } catch (error) {
      res.status(400).send(error);
      console.log("U got this!");
  }
})

//User login
app.post("/login", async (req,res) => {
  try {

      const email = req.body.email;
      const password = req.body.password;

      const useremail = await Register.findOne({email:email});

       // middleware jwt token
      const token = await useremail.generateAuthToken();
      //  console.log("the token part login " + token);
      //res.cookie("jwt", token);

      let passwordCompared = await bcrypt.compare(password,useremail.password)
      if(passwordCompared){
          // res.status(201).render("kk", {layout: "kk"});
          res.json(token);
      }else{
          res.send("password are not matching");
      }

      //console.log(`${email} and password is ${password}`)

  }catch (error) {
      console.log(error)
      res.status(400).send("invalid login details")
  }
})

//Institution registration
app.post("/institute_reg", async (req,res) => {
  try {
      const password = req.body.password;
      const cpassword = req.body.password2;

      console.log("Password checking!!");

      if(password == cpassword){

          const institute = new Institute_reg({
            institutename: req.body.institutename,
            institutecode: req.body.institutecode,
            universityname: req.body.universityname,
            course: req.body.course,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            pincode: req.body.pincode,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
          });

          //JWT part
          //console.log("the success part" + institute);
          const token = await institute.generateAuthToken();
          //console.log(token);
          //res.status(201).send({institute,token});
          //console.log(institute);
          //console.log("the token part institute reg " + token);

          let saveUser = await institute.save(); //when fails it goes to catch
          //console.log(saveUser); //when success it print.
          console.log('Saved ! ');
          // await user.save();
          res.status(201).render("institute_log", {layout: "institute_log"});

      }else{
          res.send("passwords not matching")
      }
  } catch (error) {
      res.status(400).send(error);
  }
})

//Institution Login
app.post("/institute_log", async (req, res) => {
  try {

      const email = req.body.email;
      const password = req.body.password;

      const instituteemail = await Institute_reg.findOne({email:email});
      console.log("done till this ");

      // middleware jwt token
      const token = await instituteemail.generateAuthToken();
      console.log("the token part institute login  " + token);
      //res.cookie("jwt", token);
      
      if(instituteemail.password2 == password){
          res.status(201).render("kk", {layout: "kk"});

      }else{
          res.send("password are not matching");
      }

      //console.log(`${email} and password is ${password}`)

  }catch (error) {
      res.status(400).send("invalid login details")
  }
})

app.listen(port, () => {
    console.log(`Listening to port no ${port}`)
})