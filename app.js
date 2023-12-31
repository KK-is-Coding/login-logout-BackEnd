import express from "express"
import userRouter from "./routes/user.js"
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import taskRouter from './routes/task.js'
import { errorMiddlewares } from "./middlewares/error.js"
import cors from "cors"
import userViewRouter from './routes/userview.js'
export const app = express()


config({
    path: "./data/config.env"
})


// Using Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(errorMiddlewares)
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

// Using routes
app.use("/ipp/v1/users", userRouter)
app.use("/users", userViewRouter)
// app.use("/ipp/v1/tasks", taskRouter)


app.get(('/'), (req, res) => {
    res.send("Nice Working Brother...")
})

