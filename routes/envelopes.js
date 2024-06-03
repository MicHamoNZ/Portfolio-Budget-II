const express = require('express');

const {
    getEnvelopes,
    getEnvelopeById,
    addEnvelope,
    updateEnvelope,
    deleteEnvelope,
} = require('../controllers/envelopes');

const router = express.Router();

// Get all envelopes
router.get('/envelopes/', getEnvelopes);

// Get an envelope
router.get('/envelopes/:id', getEnvelopeById);

// Add an envelope
router.post('/envelopes/', addEnvelope);

// Update an envelope
router.put('/envelopes/:id', updateEnvelope);

// Delete an envelope
router.delete('/envelopes/:id', deleteEnvelope);

module.exports = router;