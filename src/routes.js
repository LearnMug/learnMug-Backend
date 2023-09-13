function routes(app) {
    app.use('/type', require('./routes/type_user.js'));
    app.use('/users', require('./routes/users.js'));
    return;
}

module.exports = routes;