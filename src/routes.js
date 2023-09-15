function routes(app) {
    app.use('/type', require('./routes/type_user.js'));
    app.use('/calendar', require('./routes/calendar_activity.js'));
    app.use('/course_modules', require('./routes/courses_modules.js'));
    app.use('/course_categories', require('./routes/course_categories.js'));
    app.use('/categories', require('./routes/categories.js'));
    app.use('/modules', require('./routes/modules.js'));
    app.use('/users', require('./routes/users.js'));
    app.use('/course-professor', require('./routes/course_professor.js'));
    app.use('/course-students', require('./routes/course_students.js'));
    app.use('/message-recipient', require('./routes/message_recipient.js'));
    app.use('/messages', require('./routes/messages.js'));
    app.use('/progress-student-module', require('./routes/progress_student_module.js'));
    app.use('/courses', require('./routes/courses.js'));
    return;
}

module.exports = routes;