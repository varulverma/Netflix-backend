const R = require("ramda");
const UserService = require("../service/userService");

function signupHandler(req, res) {
  const userInput = req.body;

  console.log(`userInput = ${JSON.stringify(userInput)}`);

  if (R.isNil(userInput.email)) {
    res.status(400).send("email not present");
    return;
  }

  if (R.isNil(userInput.phone)) {
    res.status(400).send("phone not present");
    return;
  }

  if (R.isNil(userInput.name)) {
    res.status(400).send("name not present");
    return;
  }

  if (R.isNil(userInput.password)) {
    res.status(400).send("password not present");
    return;
  }

  UserService.addNewUser(userInput)
  .then(()=> res.status(200).send('User created successfully!!'))
  .catch((error)=> res.status(500).send(error));
}
module.exports = {
  signupHandler,
};
