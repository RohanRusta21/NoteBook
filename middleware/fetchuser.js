var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET_KEY;

const fetchuser = (req, res, next) => {
  // get the user from jwt token and append user_id to req object
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send({ error: "Please use a valid token" });
  }
  try {
    // here data is the payload(user_id) from which token is formed
    // here we take token from request header and then we verify with secret_key 
    // and take out the payload(user_id) from token using secret_key
    // add user_id in request body

    const data = jwt.verify(token, secret);
    req.user = data.user;
    next(); // then process the next step
  } catch (error) {
    res.status(401).send({ error: "Please use a valid token" });
  }
};

module.exports = fetchuser;
