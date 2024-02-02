const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    // renderiza index.handlebars
    res.render("index")
})

module.exports = router