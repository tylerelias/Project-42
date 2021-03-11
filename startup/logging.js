require('express-async-errors');

module.exports = function() {
// This is if for some reason an exception does not get caught
// logs the exceptions and continues execution
    process.on('uncaughtException', (ex) => {
        console.log('Uncaught exception!');
        console.error(`uncaught exception: ${ex.message}`);
    });

    process.on('unhandledRejection', (ex) => {
        console.log('Uncaught rejection!');
        console.error(`uncaught rejection: ${ex.message}`);
    });
}