//this file will store all of our functions that will act as middleware between our request and our response and we will use it as we see fit

//after a user logs in and gets their token, any http request will have a category in headers called authorization that will hold their token. thats why when they peruse the sight the requiretoken function will pull from authorization to check if the correct token is there

const User = require("../db/models/User");

const requireToken = async (req, res, next) => {
  try{
    const token= req.headers.authorization;
    const user = await User.findByToken(token);
    console.log('req', req);
    req.user = user;
    next(); //need to call so it doesnt hang here and goes forward
  } catch (err){
      next(err);
  }
};

const isAdmin = (req, res, next) => {
  if(!req.user.isAdmin){
    return res.status(403).send('No. You are a bad pineapple and not an admin.');
  } else {
    next(); //user is allowed to move forward
  }
};

module.exports = {
  requireToken, isAdmin
}
