import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json({ limit: "16kb" })); // this line is for data comming from client in the form of json data or form data and and we have limited that data to 16kb

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // this is for data coming from url and to handle this we are using middleware it

app.use(express.static("public")); // this middleware is used to handle images, pdf, document request coming from file and will be stored inside public folder(04_chai_backend)=>public

app.use(cookieParser()); // it is for implementing CRUD operation to the client browser()

export { app };
