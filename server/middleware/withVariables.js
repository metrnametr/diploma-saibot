module.exports = function(req, res, next){
    res.locals.isAuth = res.isAuth;

    next();
}