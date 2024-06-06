const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const postsRouter = require("./routers/posts.js");

app.use(express.json);

app.use('/posts', postsRouter);

app.listen(port, host, () => {
    console.log(`Server attivo su http://${host}:${port}`);
})