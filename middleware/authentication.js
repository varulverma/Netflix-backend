const jwt = require("jsonwebtoken");
const R = require("ramda");
const SessionAccessor = require('../accessor/sessionAccessor');
const SECRET_KEY = "varul12345";

function checkIfAuthenticated(req, res, next) {
  const tokenString = req.headers["authorization"];
  if (!R.isNil(tokenString)) {
    const actualToken = tokenString.split("")[1];
    if (!R.isNil(actualToken)) {
      let data = jwt.verify(actualToken, SECRET_KEY);
      let userId= data['userId'];
      SessionAccessor.getSessionByKey(userId,actualToken)
      .then((sessions)=>{
        let session = sessions[0];
        if(!R.isNil(session)){
            req.userId= userId;
            next();
        }
        else{
            res.status(481).send('Could not finf a session for you! Please Login Again');
        }
      });
    }
    else{
        res.staus(401).send('Please login before accessing the API');
    }
  }
  else{
    res.status(401).send('Please Login before accessing the API')
  }
}

module.exports ={
    checkIfAuthenticated
}