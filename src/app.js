const path = require('path')
const express = require('express')
const getData = require('./util/util')
const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const hbs = require('hbs')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

var userData = {
    title: 'Stock Exchange',
    author: 'Milton Pereira '
}

app.get('', (req, res) => {
    res.render('index', userData)
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'this is the about title',
        author: 'Milton Pereira'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page here.'
    })

})

app.get('/exchange',(req,res)=>{
    if(!req.query.asset){
        return res.status(400).json({error:{message: 'Please inform an asset', code: 400}})
    }
const symbol = req.query.asset.toUpperCase()

getData(symbol,(err,data)=>{
    if(err){
        return res.status(err.code).json({error:{ message:'Generic error',code: 500}})
    }
    res.status(200).json(data)
})
})


app.get('*', (req, res) => {
    res.render('404', {
        title: 'this is the about title',
        author: 'Milton Pereira'
    })
})

var port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is online on port ${port}`)
})