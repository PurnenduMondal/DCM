const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const { readdirSync } = require('fs')

//app config
const app = express()
const port = process.env.PORT || 5000

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config({path: __dirname+'/.env'});
// }
dotenv.config()

//middleware
app.use(express.json({ limit: '10MB' }));
app.use(cors())

//DB config
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// routes middleware
readdirSync("./routes").map(r => app.use("/api", require("./routes/" + r)));

//send the root view in production mode
if(process.env.NODE_ENV=='production'){
  const path = require('path')
  app.use(express.static(path.resolve(__dirname,'client','build')))
  
  app.get('/', (req, res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(port, () => console.log(`Server is running on port ${port}`));