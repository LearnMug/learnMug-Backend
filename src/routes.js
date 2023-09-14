function routes(app) {
    app.use('/type', require('./routes/type_user.js'));
    app.use('/users', require('./routes/users.js'));
    app.use('/course-professor', require('./routes/course_professor.js'));
    app.use('/course-students', require('./routes/course_students.js'));
    app.use('/message-recipient', require('./routes/message_recipient.js'));
    app.use('/messages', require('./routes/messages.js'));
    return;
}

module.exports = routes;