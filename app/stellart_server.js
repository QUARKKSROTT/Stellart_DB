const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config");

const stellartdb = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

stellartdb.use(cors(corsOptions));


stellartdb.use(bodyParser.json());


stellartdb.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.mongoose

  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {

    useNewUrlParser: true,
    useUnifiedTopology: true

  })
  .then(() => {

    console.log("Successfully connect to MongoDB.");
    initial();

  })
  .catch(err => {

    console.error("Connection error", err);
    process.exit();

  });


stellartdb.get("/", (req, res) => {

  res.json({ message: "Welcome to the Stellart Website" });

});


require("./routes/auth.routes")(stellartdb);
require("./routes/user.routes")(stellartdb);


const PORT = process.env.PORT || 8080;
stellartdb.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}.`);

});

function initial() {

  Role.estimatedDocumentCount((err, count) => {

    if (!err && count === 0) {

      new Role({
        name: "user"

      }).save(err => {

        if (err) {

          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({

        name: "moderator"

      }).save(err => {

        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({

        name: "admin"
      }).save(err => {

        if (err) {
          console.log("error", err);

        }

        console.log("added 'admin' to roles collection");

      });

    }

  });

}