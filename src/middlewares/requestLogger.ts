import { Response, Request, NextFunction } from "express";
import { Logger } from "pino";

export function requestLogger(logger: Logger) {
    return (req: Request, res: Response, next: NextFunction) => {
        const startTime = process.hrtime();

        res.on('finish', () => {
            const [seconds, nanoseconds] = process.hrtime(startTime);
            const responseTime = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

            const logData = {
                method: req.method,
                url: req.url,
                statusCode: res.statusCode,
                responseTime: `${responseTime}ms`,
                userAgent: req.get('user-agent'),
                ip: req.ip,
                correlationId: req.get('x-correlation-id'),
            };

            if (res.statusCode >= 400) {
                logger.error(logData, 'Request failed');
            } else {
                logger.info(logData, 'Request completed');
            }
        });

        next();
    };
}