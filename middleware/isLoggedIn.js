module.exports = function  (req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Necesita iniciar sesión')
        return res.redirect('/')
    }
    next();
}