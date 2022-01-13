require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./models')
const {sequelize} = require('./models')
const authRoute = require('./routes/authRoute')
const listRoute = require('./routes/listRoute')
const {authenticate} = require('./controllers/authController')
const errorController = require('./controllers/errorController')

app.use(cors())
app.use(express.json())

app.use('/lists', authenticate, listRoute)
// app.use('/slists', listRoute)
app.use('/', authRoute)

app.use((req,res,next) => {
  res.status(404).json({msg: 'resource not found'})
})

app.use(errorController)

const port = process.env.PORT || 8080
app.listen(port, ()=> console.log(`Server on ${port}..`))

// sequelize.sync({force: true})
// sequelize.sync()
// sequelize.authenticate().then(()=>console.log('DB Connected..'))

// db.User.findAll().then(res => console.log(JSON.stringify(res,null,2)) )