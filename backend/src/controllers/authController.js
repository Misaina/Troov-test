const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.json({ msg: 'User successfully registered' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(`Server error: ${error.message}`);
    }
};

/**
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid identifiers' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid identifiers' });
        }

        const payload = {
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        };

        jwt.sign(payload, 'mysecrettoken', { expiresIn: 3600 }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(`Server error: ${error.message}`);
    }
};

module.exports = { signup, login };
