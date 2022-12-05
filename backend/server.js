const express = require("express");

const app = express();

const PORT = 4000;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}`);
});
