const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
// import sequelize connection
const exphbs = require("express-handlebars");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;
const SQL_FORCE = process.env.SQL_FORCE || false;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

const hbs = exphbs.create({ helpers });

// set up sessions
const sess = {
  secret: "JUVEIjf834nh38hbH",
  cookie: {
    maxAge: 1800000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: SQL_FORCE }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
  });
});
