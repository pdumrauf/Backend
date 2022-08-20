const log = require("log4js");

log.configure({
    appenders: {
        consoleLogger: { type: "console" },
        warningFileLogger: { type: "file", filename: "warning.log" },
        errorFileLogger: { type: "file", filename: "error.log" },

        loggerDefault: { type: "logLevelFilter", appender: "consoleLogger", level: "info" },
        loggerWarning: { type: "logLevelFilter", appender: "warningFileLogger", level: "warn" },
        loggerError: { type: "logLevelFilter", appender: "errorFileLogger", level: "error" },
    },
    categories: {
        default: {
            appenders: ["loggerDefault"],
            level: "all",
        },
        custom: {
            appenders: ["loggerDefault", "loggerWarning", "loggerError"],
            level: "all",
        },
    },
});

const logger = log.getLogger("custom");
module.exports = logger;