const path = require("path");
const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");

module.exports = function (app) {
  const authController = require("../controller/authController.js");
  const documentController = require("../controller/documentController.js");

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUserNameOrEmail],
    authController.signup
  );

  app.post("/api/auth/signin", authController.signin);

  app.post("/api/document/extract", documentController.extract);
  app.post("/api/document/add", [authJwt.verifyToken], documentController.addDoc);
  app.delete("/api/document/:id", [authJwt.verifyToken], documentController.delete);
  app.get("/api/documents", documentController.findAll);

  app.get("*", (req, res) => {
    let url = path.join(__dirname, "../../client/build", "index.html");
    if (!url.startsWith("/app/")) url = url.substring(1);
    res.sendFile(url);
  });
};
