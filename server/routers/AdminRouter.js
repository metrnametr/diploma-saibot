const Router = require('express').Router();
const Document = require('../models/Document');
const User = require('../models/User');

const passport = require('passport');

const mapElements = (array, type) => {
    return array.map(it => ({
        ...it['adminId']._doc
    }))
}

Router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    console.log(req.user)
    res.json({message: "Success! You can not see this without a token"});
  });

Router.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // const user = await req.admin
    //     .populate('documents.documentId')
    //     .execPopulate()

    // const users = mapElements(user.users);
    const user = req;
    const users = await User.find({
        'adminId': user._id
    }).populate('adminId')

    console.log(users)
    res.json(mapElements(users))
});

Router.get('/docs', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // const user = await req.admin
    //     .populate('documents.documentId')
    //     .execPopulate()

    const docs = await Document.find({
        'adminId': req.admin._id
    }).map(it => {
        let newIt = it;
        delete newIt.adminId
        return newIt
    })

    console.log(docs)
    // const docs = mapElements(user.documents);

    res.json(docs)
});

Router.put('/docs/edit/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findByIdAndUpdate(id, req.body);
        res.send(document);
    } catch(e) {
        console.log(e)
    }

})

// Router.get('/docs', async (req, res) => {
//     try {
//         const documents = await Document.find();
//         res.send(documents);
//     } catch(e) {
//         console.log(e)
//     }
// })


Router.post('/docs/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, body, adminId } = req.body;
    const document = new Document({
        title,
        body,
        adminId
    })
    try {
        await document.save();
        res.send({
            title,
            body
        })
    } catch(e) {
        console.log(e)
    }
});




module.exports = Router;