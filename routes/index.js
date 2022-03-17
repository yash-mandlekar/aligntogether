var express = require('express');
const passport = require('passport');
const userModel = require('./users');
const postModel = require('./posts');
const localStrategy = require('passport-local');
var router = express.Router();

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/profile',isLoggedIn, function(req, res) {
  res.render('profile');
});

router.get('/showpost', function(req, res) {
  postModel.find()
  .then(function(data){
    res.render('posts',{data});
  })
});
router.get('/post', function(req, res) {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();  
  userModel.findOne({username: req.session.passport.user})
  .then(function(data){
    postModel.create({
      user_id: data._id,
      status: req.query.status,
      CreatedDate: date
    })
    .then(function(lolo){
      res.redirect('/showpost')
    })
  })
});
router.get('/users', function(req, res) {
  userModel.find()
  .then(function(data){
    res.send(data);
  })
});

router.post('/register', function(req, res) {
  var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    CreatedDate: date
  })
  userModel.register(newUser, req.body.password)
  .then(function(u){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile')
    })
  })
});

router.post('/POST',passport.authenticate('local',{
  successRedirect: '/profile',
  failureRedirect: '/'
}),function(req,res,next){});

router.get('/logout',function(req,res,next){
  req.logOut();
  res.redirect('/');
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
}

module.exports = router;
