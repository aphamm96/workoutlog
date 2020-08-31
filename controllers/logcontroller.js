const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log')

router.post('/create', validateSession, (req, res) => {
    const logEntry = {
        routineName: req.body.log.routineName,
        routineDescription: req.body.log.routineDescription,
        result: req.body.log.result,
        member: req.user.id
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error:err}))
})

router.get("/", (req, res) => {
    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error:err}))
})

router.get("/member", validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: {member: userid}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error:err}))
});

router.put("/update/:logId", validateSession, function (req, res) {
    const updateLogEntry = {
        routineName: req.body.log.routineName,
        routineDescription: req.body.log.routineDescription,
        result: req.body.log.result
    };

    const query = { where: { id: req.params.logId, member: req.user.id} };

    Log.update(updateLogEntry, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({error:err}));
});

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = {where: { id: req.params.id, member: req.user.id}};

    Log.destroy(query)
    .then(() => res.status(200).json({message: "Workout routine deleted."}))
    .catch((err) => res.status(500).json({error: err}));
})

module.exports = router