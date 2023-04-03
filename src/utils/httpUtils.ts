import { Response } from "express";

export const handleError = (res: Response, error: any, statusCode: number) => {
    if (error instanceof Error) {
        res.status(statusCode).json({ message: error.message });
    } else {
        res.status(statusCode).json({ message: 'An unknown error occurred' });
    }
}
