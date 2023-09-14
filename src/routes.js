function routes(app) {
    app.use('/type', require('./routes/type_user.js'));
    app.use('/calendar', require('./routes/calendar_activity.js'));
    app.use('/course_modules', require('./routes/courses_modules.js'));
    app.use('/users', require('./routes/users.js'));
    return;
}

module.exports = routes;