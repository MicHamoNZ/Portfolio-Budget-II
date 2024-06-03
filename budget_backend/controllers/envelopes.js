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
