const express = require("express");
const app = express();
const port = 3000;

// 根路徑會重新導航到網站首頁
app.get("/", (req, res) => {
    res.redirect("/restaurants");
});

// 設定網站首頁路由
app.get("/restaurants", (req, res) => {
    res.send("home page of restaurants");
});

// 設定餐廳詳細資料路由
app.get("/restaurant/:id", (req, res) => {
    const id = req.params.id;
    res.send(`restaurant: ${id}`);
});

app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port}`);
});