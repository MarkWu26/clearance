const db = require('../utils/db');
const { validationResult } = require('express-validator');
const helper = require('../services/helper');

const createForm = (req, res) => {
    const { unit, officeName, office_id, officeAbbrev, group } = req.body;

    // Check validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    // Provide default values or handle undefined values
    const sanitizedUnit = unit || '';
    const sanitizedOfficeName = officeName || '';
    const sanitizedOfficeId = office_id || '';
    const sanitizedOfficeAbbrev = officeAbbrev || '';
    const sanitizedGroup = group || '';

    db.execute(
        'INSERT INTO clearance_frm (unit, officeName, office_id, officeAbbrev, `group`) VALUES (?, ?, ?, ?, ?)',
        [String(sanitizedUnit), sanitizedOfficeName, sanitizedOfficeId, sanitizedOfficeAbbrev, sanitizedGroup],
        (err, data) => {
            if (err) {
                console.error('Create Form Error:', err);
                return res.status(500).json({ success: false, error: 'Failed to create form' });
            } else {
                res.json({
                    success: true,
                });
            }
        }
    );
};

const getForms = (req, res) => {
    try {
        let forms = [];

        db.execute('SELECT * FROM clearance_frm', (err, data) => {
            if (err) {
                console.error('Get Forms Error:', err);
                return res.status(500).json({ success: false, error: 'Failed to get forms' });
            }

            for (let i = 0; i < data.length; i++) {
                forms.push({
                    id: data[i].id,
                    unit: data[i].unit,
                    officeName: helper.decodeHtml(data[i].officeName),
                    officeAbbrev: helper.decodeHtml(data[i].officeAbbrev),
                    group: helper.decodeHtml(data[i].group),
                });
            }

            return res.status(200).json(forms);
        });
    } catch (error) {
        console.error('Get Forms Error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const deleteForm = (req, res) => {
    try {
        const id = req.params.id;

        db.execute('SELECT office_id FROM clearance_frm WHERE office_id = ?', [id], (err, data) => {
            if (err) {
                console.error('Delete Form Error:', err);
                return res.status(500).json({ success: false, error: 'Failed to delete form' });
            }

            if (data.length > 0) {
                return res.json({ success: false, error: 'Cannot delete: Clearance Form is currently in use.' });
            } else {
                db.execute('DELETE FROM clearance_frm WHERE id = ?', [id], (err, data) => {
                    if (err) {
                        console.error('Delete Form Error:', err);
                        return res.status(500).json({ success: false, error: 'Failed to delete form' });
                    }

                    return res.status(200).json({ success: true });
                });
            }
        });
    } catch (error) {
        console.error('Delete Form Error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const updateForm = (req, res) => {
    const { id, unit, officeName, office_id, officeAbbrev, group } = req.body;

    // Check validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    // Provide default values or handle undefined values
    const sanitizedId = id || '';
    const sanitizedUnit = unit || '';
    const sanitizedOfficeName = officeName || '';
    const sanitizedOfficeId = office_id || '';
    const sanitizedOfficeAbbrev = officeAbbrev || '';
    const sanitizedGroup = group || '';

    db.execute(
        'UPDATE clearance_frm SET unit = ?, officeName = ?, office_id = ?, officeAbbrev = ?, `group` = ? WHERE id = ?',
        [String(sanitizedUnit), sanitizedOfficeName, sanitizedOfficeId, sanitizedOfficeAbbrev, sanitizedGroup, sanitizedId],
        (err, data) => {
            if (err) {
                console.error('Update Form Error:', err);
                return res.json({ success: false, error: 'Failed to update form' });
            } else {
                res.json({
                    success: true,
                });
            }
        }
    );
};

module.exports = {
    createForm,
    getForms,
    deleteForm,
    updateForm,
};
