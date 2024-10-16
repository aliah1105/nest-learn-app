/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */
import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

declare global {
    namespace Express {
        interface Request {
            currentUser?: User
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private userService: UsersService
    ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};
        if (userId) {
            const user = await this.userService.findOne(userId);
            req.currentUser = user;
        }
        next()
    }

}