const express = require('express');

const {
    getEnvelopes,
} = require('./controllers/envelopes');

const envelopesRouter = express.Router();

// Get all envelopes
envelopesRouter.get('/', getEnvelopes);