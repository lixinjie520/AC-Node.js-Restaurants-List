const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const restaurants = require("./public/jsons/restaurant.json").results;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

// 載入json檔案
app.use(express.static("public"));

// 根路徑會重新導航到網站首頁
app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

// 設定網站首頁和搜尋的路由
app.get("/restaurants", (req, res) => {
  const keyword = req.query.keyword;
  //console.log(keyword);
  const matchedRestaurants = keyword
    ? restaurants.filter((rest) =>
        Object.values(rest).some((property) => {
          if (typeof property === "string") {
            return property.toLowerCase().includes(keyword.toLowerCase());
          }
        })
      )
    : restaurants;
  res.render("index", { restaurants: matchedRestaurants, keyword });
});

// 設定餐廳詳細資料路由
app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find((rest) => rest.id.toString() === id);
  res.render("detail", { restaurant });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
