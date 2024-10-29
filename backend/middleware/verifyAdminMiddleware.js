// Middleware to verify if user has admin role
const verifyAdminMiddlewware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};
module.exports = verifyAdminMiddlewware;
