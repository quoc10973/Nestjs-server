import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        //1 get the token from the request header
        const token = request.headers.authorization?.split(' ')[1];

        //2 verify the token
        if (!token) {
            throw new UnauthorizedException('Unauthorized');
        }
        try {
            const decoded = this.jwtService.verify(token);
        }
        catch (err) {
            if (err.message === 'jwt expired') {
                throw new UnauthorizedException('Token expired');
            }
        }

        //3 find the user from the database base on the token payload
        //4 assign the user to the request object

        return false;  // return true if user is authenticated and let the request pass, return false if user is not authenticated and block the request 
    }
}