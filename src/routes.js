function routes(app) {
    app.use('/type', require('./routes/type_user.js'));
    app.use('/calendar', require('./routes/calendar_activity.js'));
    app.use('/course_modules', require('./routes/courses_modules.js'));
    app.use('/course_categories', require('./routes/course_categories.js'));
    app.use('/categories', require('./routes/categories.js'));
    app.use('/modules', require('./routes/modules.js'));
    app.use('/users', require('./routes/users.js'));
    return;
}

module.exports = routes;