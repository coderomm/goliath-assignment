import { Request, Response } from "express";

export type AppContext = {
    user: { userId: string } | null;
    token?: string;
    req: Request;
    res: Response;
};