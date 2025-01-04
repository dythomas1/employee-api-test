const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;



app.use(morgan("dev"));
app.use(helmet());
app.use(cors({origin: 8100 }));


app.get("/api/external", (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

app.get("/api/messages/public", (req, res) => {
  res.send({
    message: "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});


app.listen(port, () => console.log(`API Server listening on port ${port}`));
