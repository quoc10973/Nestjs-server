import { Injectable, NestMiddleware } from '@nestjs/common';
import rateLimit from 'express-rate-limit';


const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
    standardHeaders: true, // Trả về thông tin trong headers `RateLimit-*`
    legacyHeaders: false, // Tắt các header cũ
});

@Injectable()
export class LimitLoginAttemptsMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        loginRateLimiter(req, res, next);
    }
}