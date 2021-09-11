const express = require("express");
const devConfig = require("./webpack.config");
const webpack = require("webpack");
const path = require("path");

const app = express();

app.use("/assets", express.static("public"));

const port = process.env.PORT || 8080;

const devModeEnabled = process.env.NODE_ENV === "production" ? false : true;

if (!devModeEnabled) {
  app.use(express.static(__dirname + "/dist"));
}

if (devModeEnabled) {
  const compiler = webpack(devConfig);

  const webpackDevMiddleware = require("webpack-dev-middleware")(compiler, {
    publicPath: devConfig.output.publicPath,
  });

  console.log("running dev");
  app.use(webpackDevMiddleware);
} else {
  app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log("server running at port 8080");
});
