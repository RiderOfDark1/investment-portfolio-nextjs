const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers.authorization.split(' ')[1];
    console.log(token);
    if(!token) return res.status(403).json({ error: 'Token required'});

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({ error: 'Invalid token' });
        req.userId = decoded.id;
        next();
    });
};

router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM investments WHERE user_id = $1', [req.userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch investments' });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const { symbol, quantity, purchase_price } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO investments (user_id, symbol, quantity, purchase_price) VALUES($1, $2, $3, $4) RETURNING *',
            [req.userId, symbol, quantity, purchase_price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add investment' });
    }
});

module.exports = router;