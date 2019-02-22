const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
const app = express()

hbs.registerPartials(`${__dirname}/public/partials`)
app.set('view engine', 'hbs')

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase()
})

app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.render('home.hbs', {
    welcomeMsg: 'Welcome to this site for your use',
    titleText: 'Home'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    titleText: 'About'
  })
})

app.get('/bad', (req, res) => {
  res.json({
    error: { message: 'Error Handling this request' }
  })
})

app.get('/portfolio', (req, res) => {
  res.render('portfolio.hbs', {
    titleText: 'Portfolio'
  })
})

app.get('/help', (req, res) => {
  res.render('help.hbs', {
    titleText: 'Help'
  })
})

app.listen(port, () => {
  console.log(`Web app has started on port ${port}...`)
})
