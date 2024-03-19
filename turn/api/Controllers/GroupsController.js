const db = require('../utils/db');
const { validationResult } = require('express-validator');
const helper = require('../services/helper');

const getGroups = (req, res) => {
    try {
        let groups = [];

        db.execute('SELECT * FROM groups', (err, data) => {
            if (err) {
                console.error('Get groups Error:', err);
                return res.status(500).json({ success: false, error: 'Failed to get groups' });
            }

            for (let i = 0; i < data.length; i++) {
                groups.push({
                    id: data[i].clearance_group_id,
                    name: data[i].name,
                    abbrev: helper.decodeHtml(data[i].abbrev),
                });
            }

            console.log('groups: ', groups)

            return res.status(200).json(groups);
        });
    } catch (error) {
        console.error('Get groups Error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = {
    getGroups
}