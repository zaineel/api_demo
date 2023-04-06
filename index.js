const PORT = 8000
const cheerio  = require('cheerio')
const express = require ('express')
const axios = require('axios')
const { response } = require('express')

const app = express()
challenges = []

app.get('/hello', (req,res) => 
{
    res.json('Hello, Welcome to my stream! Using Node.JS')
}
)

app. get('/challenges', (req, res) => {
    axios.get('https://ghw.mlh.io/challenges')
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('a:contains("")', html).each(function() {
            const title = $(this).text()
            const url = $(this).attr('href')
            challenges.push({
                title,
                url
            })
        }) 
            
        res.json(challenges) 
    })
    
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
