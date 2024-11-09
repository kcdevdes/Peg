const express = require('express')
const app = express()
const port = 3000

const mainRouter = require('./routes/index')

app.use(mainRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})