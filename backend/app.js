const express = require('express');
const cors = require('cors');
const app = express();
const connectdb = require('./db')
const userRoutes = require('./Routes/userRoutes');
const {notFound , errorHandler} = require('./middlewares/errorMiddleware')

connectdb()
app.use(express.json());
app.use(cors())
const port = 5000;

app.get("/", (req, res) => {
  res.send("API running");
});


app.use('/api/user',userRoutes)

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
  console.log(`app listening on port ${port}`)
})