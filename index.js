const port = 8080;
const express = require("express");
const app = express();
app.use(express.static("./public"));

app.get("/", function (req, res) {
	res.send();
});

app.listen(port, () => {
	console.log(`starting at port ${port}`);
});