import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        //1 get the token from the request header
        const token = request.headers.authorization?.split(' ')[1];

        //2 verify the token
        if (!token) {
            throw new UnauthorizedException('Unauthorized');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
            //3 find the user from the database base on the token payload
            let user = await this.userService.getUserByEmail(payload.email);
            if (!user) {
                throw new UnauthorizedException('Unauthorized');
            }
            //4 assign the user to the request object
            request.currentUser = user;
            return true;  // return true if user is authenticated and let the request pass, return false if user is not authenticated and block the request 
        }
        catch (err) {
            if (err.message.includes('expired')) {
                throw new UnauthorizedException('Token expired');
            }
            if (err.message.includes('malformed')) {
                throw new UnauthorizedException('Token invalid');
            }
        }





    }
}