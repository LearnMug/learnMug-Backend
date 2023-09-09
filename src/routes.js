function routes(app) {
    app.use('/type', require('./routes/type_user.js'));
    return;
}

module.exports = routes;