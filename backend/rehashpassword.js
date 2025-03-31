const bcrypt = require("bcrypt");

const password = "balanacan123"; // Replace with the actual password
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then(hash => {
  console.log("New Hashed Password:", hash);
});
