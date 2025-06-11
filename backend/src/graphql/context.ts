import { Request, Response } from "express";

export type AppContext = {
    user?: { id: string } | null;
    token?: string;
    req: Request;
    res: Response;
};