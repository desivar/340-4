const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  //req.flash("notice", "This is a flash message.") // Example flash message
  res.render("index", { title: "Home", nav }); // Pass nav directly in the data object
}

module.exports = baseController