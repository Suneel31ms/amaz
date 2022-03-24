import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
dotenv.config();

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.MONGODB_URL ) 
  .then(() => console.log("Connected DB"))
  .catch((err) => { 
    console.log(err.message);
  });

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res) => {
  res.status(500).send({ message: err.message });
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
