const routes = require('express').Router();

const Grocery = require('./../models/Grocery');

routes.get("/api/groceries", (req, res) => {
    Grocery.find({}, (err, groceries) => {
        err ? res.status(400).send(err.message) : res.json(groceries)
    });
});

routes.post("/api/grocery", (req, res) => {
    const reqObj = req.body.grocery;
    let grocery = new Grocery({
        title: reqObj.title,
        url: reqObj.url,
        pubdate: reqObj.pubdate,
        imgsrc: reqObj.imgsrc,
        snippet: reqObj.snippet
    });

    grocery.save({runValidators: true})
        .then((grocery,err) => {
            console.log(err);
            res.status(200).send(grocery)})
        .catch(err=> {
            if (err) {
                console.error(err.message);
                let statusCode = err.message.includes('Duplicate') ? 409 : 503;
                res.status(statusCode).send(err.message);
            }
    });
});

routes.delete("/api/grocery/:id", (req, res) => {
    let groceryId = req.params.id;

    Grocery.findOneAndRemove({_id: groceryId}, (err, doc) => {
       err ? res.status(404).send(err) : res.send({doc}) 
    });
});

routes.put('/api/grocery/:id/:count', (req, res) => {
    let count = parseInt(req.params.count);
    let groceryId = req.params.id;

    Grocery.findOneAndUpdate({_id: groceryId}, {$inc: {likes: count}}, {new: true}, (err, doc)=> {
        err ? res.status(404).send(err) : res.send({doc})
    });

})

module.exports = routes;