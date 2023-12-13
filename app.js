import express from "express"
import bodyParser from "body-parser"
import { config } from "dotenv"
import pkg from "lodash"

const _ = pkg

const app = express()
const port = process.env.PORT || 3000

// console.log(process.env.PORT)

const posts = []
let oldTitle = ""
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
    
    const pT = _.lowerCase(req.params.postTitle)

    let found = false
    posts.forEach(post => {
        const t = _.lowerCase(post.title)
        if(pT === t){
            res.render("post.ejs", {
                post: post
            })
            found = true
        }
    })
    if(!found)  res.render("post.ejs")
})

app.get("/posts/:postTitle/update", (req, res) => {

    const pT = _.lowerCase(req.params.postTitle)
    oldTitle = req.params.postTitle

    posts.forEach(post => {
        const t = _.lowerCase(post.title)
        if(pT === t){
            res.render("update.ejs", {
                post: post
            })
        }
    })
})

app.post("/updatePost", (req, res) => {
    const oT = _.lowerCase(oldTitle)

    posts.forEach(post => {
        const t = _.lowerCase(post.title)
        if(oT === t){
            post.title = req.body.title
            post.body = req.body.text
            oldTitle = ""
        }
    })
    res.redirect("/")
})

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})