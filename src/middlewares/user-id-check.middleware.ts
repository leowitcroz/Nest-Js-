import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { log } from "console";
import { NextFunction, Request, Response } from "express";

export class UserIdCheckMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        console.log('antes');

        if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            throw new BadRequestException('ID invalido!')
        }

        console.log('depois');
        

        next()
    }

}