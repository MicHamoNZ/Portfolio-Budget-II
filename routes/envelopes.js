const express = require("express");
const router = express.Router();

const {
    getEnvelopes,
    getEnvelopeById,
    addEnvelope,
    updateEnvelope,
    deleteEnvelope,
    addEnvelopeTransaction,
    getEnvelopeTransactions
} = require('../controllers/envelopes')

router.get('/envelopes/', getEnvelopes);

router.get('/envelopes/:id', getEnvelopeById);

router.post('/envelopes/', addEnvelope);

router.put('/envelopes/:id', updateEnvelope);

router.delete('/envelopes/:id', deleteEnvelope);

router.get('/envelopes/:id/transactions', getEnvelopeTransactions);

router.post('/envelopes/:id/transactions', addEnvelopeTransaction);

module.exports = router;