import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Sample Controller';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Debug test');
    logging.error(NAMESPACE, 'Error test');
    logging.info(NAMESPACE, 'Info test');
    logging.log(NAMESPACE, 'Log test');
    logging.warn(NAMESPACE, 'Warn test');

    logging.info(NAMESPACE, `Sample health check route called.`);

    return res.status(200).json({ message: 'pong' });
};

export default {
    sampleHealthCheck
};
