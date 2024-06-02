const { db } = require('../config');

// @desc Get all Envelopes
// @route GET /api/v1/envelopes
exports.getEnvelopes = async (req, res) => {
    const query = 'SELECT * FROM envelopes';

    try {
        const envelopes = await db.query(query);
        if (envelopes.rowCount < 1) {
            return res.status(404).send({
                message: 'Records not found'
            })
        };
        res.status(200).send({
            status: 'Success',
            message: 'Envelope information retrieved',
            data: envelopes.rows,
        });

    } catch (error) {
        return res.status(500).send({
            error: error.message;
        });
    }
};