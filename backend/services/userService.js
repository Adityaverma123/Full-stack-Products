const pool = require('../config/db');
 const getUserDetails = async (id) => {
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    console.log("userrr", userResult)
        if (userResult.rows.length === 0) {
            const error = new Error('User not found');
            error.statusCode = 404; 
            throw error; 
        }
        return userResult.rows[0];
}

 const insertUserDetails = async ({username, hashedPassword}) => {
    const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, hashedPassword]
    );
    return result.rows[0]
}

 const getUserDetailsByUserName = async (username) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0] 
}

const getUserInfo = async (req, res) => {
    res.json({ user: req.user.username, role: req.user.role });
};

module.exports = {getUserDetails, insertUserDetails, getUserDetailsByUserName, getUserInfo};
