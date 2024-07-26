require("dotenv").config();

const { app } = require("./functions/app");

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
