require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/not-found");
const morgan = require("morgan");
const limiter = require("./middlewares/rate-limit");
const authRouter = require("./routes/auth-route");

const app = express();

app.use(cors()); // app.use(cors({origin:['https://www.google.com']})); allow some domain //*ถ้าไม่ใส่ ก็เข้าถึงได้ทุกคน ซึ่งไม่ปลอดภัย
app.use(morgan("dev"));
app.use(limiter);
app.use(express.json());

app.use("/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
