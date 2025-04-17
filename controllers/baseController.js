
const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  // INSERT THIS LINE --> console.log("Data from utilities.getNav():", nav);
  //req.flash("notice", "This is a flash message.") // Example flash message
  res.render("index", {title: "Home", nav})
}

module.exports = baseController