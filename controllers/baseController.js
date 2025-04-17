const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  //req.flash("notice", "This is a flash message.") // Example flash message
  res.render("index", { title: "Home" }, { nav: nav }); // Pass nav as locals
}

module.exports = baseController