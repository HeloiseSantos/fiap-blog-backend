const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://heloisehssantos:ICbxVAGGRlZSLHgP@fiap-blog-backend.rl2oe.mongodb.net/?retryWrites=true&w=majority&appName=fiap-blog-backend"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("Server listening in port ${port}");
    });
  })
  .catch((err) => console.log(err));
