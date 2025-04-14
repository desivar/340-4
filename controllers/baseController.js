const utilities = require("../utilities/")
const baseController = {}



baseController.buildHome = async function(req, res){
  try {
      const nav = await utilities.getNav();
      res.render("index", {title: "Home", nav});
  } catch (error) {
      console.error("Error building home:", error);
      // Handle error (e.g., render an error page)
      res.render("errors/error", {message: "Failed to load home page."});
  }
}
module.exports = baseController