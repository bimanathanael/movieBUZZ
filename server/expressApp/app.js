const express = require ('express')
const app = express()
const route = require('./routes')
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(route)

app.listen(PORT , () => {
  console.log("listening on ", PORT)
})