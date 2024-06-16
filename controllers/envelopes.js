const { db } = require('../config');

// @desc        Get all Envelopes
// @route       GET /api/v1/envelopes
exports.getEnvelopes = async (req, res) => {
    const query = 'SELECT * FROM envelopes';

    try {
        const envelopes = await db.query(query);
        if (envelopes.rowCount < 1) {
            return res.status(404).send({
                message: 'Records not found.'
            })
        };
        res.status(200).send({
            status: 'Success',
            message: 'Envelope information retrieved.',
            data: envelopes.rows,
        });

    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
};

// @desc        Get an Envelope
// @route       GET /api/v1/envelopes/:id
exports.getEnvelopeById = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM envelopes WHERE id = $1';

    try {
        const envelope = await db.query(query, [id]);
        if (envelope.rowCount < 1) {
            return res.status(404).send({
                message: 'No envelope information found.'
            })
        };
        res.status(200).send({
            status: 'Success',
            message: 'Envelope information retrieved.',
            data: envelope.rows[0],
        });

    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
};

// @desc        Create an Envelope
// @route       POST /api/v1/envelopes
exports.addEnvelope = async (req, res) => {
    const { name, budget } = req.body;
    const query =
        'INSERT INTO envelopes(name, budget) VALUES($1, $2) RETURNING *';

    try {
        const newEnvelope = await db.query(query, [name, budget]);
        res.status(201).send({
            status: 'Success',
            message: 'New envelope created.',
            data: newEnvelope.rows[0],
        });

    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
};

// @desc        Update an Envelope
// @route       PUT /api/v1/envelopes/:id
exports.updateEnvelope = async (req, res) => {
    const { id } = req.params;
    const { name, budget } = req.body;
    const query =
        'UPDATE envelopes SET name = $1, budget = $2 WHERE id = $3 RETURNING *';

    try {
        const updatedEnvelope = await db.query(query, [name, budget, id]);
        res.status(200).send(updatedEnvelope.rows[0]);

    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
};

// @desc		Delete an Envelope
// @route		DELETE /api/v1/envelopes/:id
exports.deleteEnvelope = async (req, res) => {
    const { id } = req.params;
    const envelopesQuery = 'SELECT * FROM envelopes WHERE id = $1';
    const deleteFromQuery = 'DELETE FROM envelopes WHERE id = $1';

    try {
        const record = await db.query(envelopesQuery, [id]);
        if (record.rowCount < 1) {
            return res.status(404).send({
                message: 'Record not found.'
            })
        }
        
        await db.query(deleteFromQuery, [id]);
        res.sendStatus(202);
        
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    };
};

// @desc        Creates a new envelope transaction
// @route       POST /api/v1/envelopes/{id}/transactions
exports.addEnvelopeTransaction = async (req, res) => {
    const { id } = req.params;
    const { description, amount } = req.body;
    const { date } = new Date();

    const envelopeQuery = 'SELECT * FROM envelopes WHERE envelopes.id = $1;';
    const transactionQuery = 'INSERT INTO transactions(description, amount, transaction_dt, envelope_id) 	VALUES($1, $2, $3, $4) RETURNING *;';
    const updateEnvelopeQuery = 'UPDATE envelopes SET budget = budget - CAST($1 AS money) WHERE id = $2 RETURNING *;';

    try {
        // SQL transaction
        await db.query('BEGIN');
        const envelope = await db.query(envelopeQuery, [id]);
        
        if (envelope.rowCount < 1) {
          return res.status(404).send({
            message: 'No envelope information found.',
          });
        };

        const newTransaction = await db.query(transactionQuery, [description, amount, date, id]);
        await db.query(updateEnvelopeQuery, [amount, id]);
        await db.query('COMMIT');

        res.status(201).send({
            status: 'Success',
            message: 'New transaction created',
            data: newTransaction.rows[0],
        });
    } catch (error) {
        await db.query('ROLLBACK');
        return res.status(500).send({
            error: error.message
        });        
    };
};

// @desc        Retrieve all transactions for an envelope
// @route       GET /api/v1/envelope/:id/transactions
exports.getEnvelopeTransactions = async (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM transactions WHERE envelope_id = $1;';

    try {
        const transactions = await db.query(query, [id]);
        if (transactions.rows < 1) {
            return res.status(404).send({
                message: 'No envelope information found.',
            });
        };

        res.status(200).send({
            status: 'Success',
            message: 'Envelope transactions retrieved',
            data: transactions.rows,
        });        
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    };
};