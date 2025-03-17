var mongoose = require("mongoose");
function getUserModel()
{
   var userScheema = mongoose.Schema;

   var userColSchema =
   {
      uid: { type: String, required: true, index: true }, // Ensure uid is unique
      password: String,
   }
   var options = {
      versionKey: false, // Avoids __v field in MongoDB
   };

   // var UserColSchema = new userScheema(userColSchema, options);
   // var UserColRef = mongoose.model("franchisees", UserColSchema);
   // return UserColRef;

   return mongoose.models.franchisees || mongoose.model("franchisees", new userScheema(userColSchema, options));
   
   // var UserColSchema = new userScheema(userColSchema, options);
   // var UserColRef = mongoose.model("login", UserColSchema);
   // return UserColRef;
}

module.exports = { getUserModel }