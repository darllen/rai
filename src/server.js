require("dotenv").config();
const express = require("express");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/rai", apiRoutes);
app.use(express.static("public"));  

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
