import express from "express"
import bodyParser from "body-parser"
import { config } from "dotenv"
import pkg from "lodash"

const _ = pkg

const app = express()
const port = process.env.PORT || 3000

// console.log(process.env.PORT)

const posts = []
// const titles = []
// const bodies = []

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res) => {
    
    res.render("home.ejs", {
        posts: posts
    })
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs")
})

app.get("/about", (req, res) => {
    res.render("about.ejs")
})

app.get("/compose", (req, res) => {
    res.render("compose.ejs")
})

app.post("/submitPost", (req, res) => {

    const post = {
        title: req.body.title,
        body: req.body.text
    }
    posts.push(post)
    // titles.push(req.body.title)
    // bodies.push(req.body.text)
    res.redirect("/")
})

app.get("/posts/:postTitle", (req, res) => {
    
    console.log(req.params.postTitle)
    const pT = _.lowerCase(req.params.postTitle)
    console.log(pT)
    let found = false
    posts.forEach(post => {
        const t = _.lowerCase(post.title)
        console.log(t)
        if(pT === t){
            res.render("post.ejs", {
                post: post
            })
            found = true
        }
    })
    if(!found)  res.render("post.ejs")
})


app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})