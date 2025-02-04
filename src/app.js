require("dotenv").config();
const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors()); // app.use(cors({origin:['https://www.google.com']})); allow some domain //*ถ้าไม่ใส่ ก็เข้าถึงได้ทุกคน ซึ่งไม่ปลอดภัย
app.use(express.json())


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
