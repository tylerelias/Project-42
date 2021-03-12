// TODO: For when admin access is implemented
module.exports = function(req, res, next) {
    if (!req.user.isAdmin) return res.status(403)

    next();
}