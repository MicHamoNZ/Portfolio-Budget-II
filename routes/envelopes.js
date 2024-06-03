const express = require("express");
const router = express.Router();

const {
    getEnvelopes,
    getEnvelopeById,
    addEnvelope,
    updateEnvelope,
    deleteEnvelope,
} = require('../controllers/envelopes')

router.get('/envelopes/', getEnvelopes);

router.get('/envelopes/:id', getEnvelopeById);

router.post('/envelopes/', addEnvelope);

router.put('/envelopes/:id', updateEnvelope);

router.delete('/envelopes/:id', deleteEnvelope);

module.exports = router;