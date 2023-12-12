import express from "express"
import bodyParser from "body-parser"
import { config } from "dotenv"

const app = express()
const port = process.env.PORT || 3000

// console.log(process.env.PORT)

const titles = []
const bodies = []

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("home.ejs")
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

    titles.push(req.body.title)
    bodies.push(req.body.text)
    console.log(titles)
    console.log(bodies)
    res.render("home.ejs", {
        titlesList: titles,
        bodyList: bodies
    })
})


app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})