import pino, { Bindings, Logger } from "pino";
import { config } from "./config";

export class LoggerFactory {
    public static istance: LoggerFactory;
    private logger: Logger;

    constructor(options = {}) {
        this.logger = this.initializeLogger(options);
        if (LoggerFactory.istance) {
            return LoggerFactory.istance
        }
        LoggerFactory.istance = this;
    }

    private initializeLogger(options = {}) {
        const env = process.env.NODE_ENV === "production" ? "production" : "development";
        const baseConfig = config[env];

        let logger: Logger;
        try {
            logger = pino({
                ...baseConfig,
                ...options
            });

            // Log initialization success
            logger.info({
                env,
                nodeVersion: process.version,
                pid: process.pid
            }, 'Logger initialized successfully');
        }
        catch (error) {
            // Fallback to basic configuration if there's an error
            console.error('Error initializing logger:', error);
            logger = pino({
                level: 'info',
                timestamp: true
            });
        }

        return logger;
    }

    public getLogger(): Logger {
        return this.logger
    }

    createChildLogger(bindings: Bindings) {
        const logger = this.getLogger();
        return logger.child(bindings);
    }
}