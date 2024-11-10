const express = require('express')
const app = express()
const cors = require('cors');
const port = 3001

const mainRouter = require('./routes/index')

app.use(cors({
    origin: 'http://localhost:3000' // Allow only your React app's origin
}));

app.use(mainRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})