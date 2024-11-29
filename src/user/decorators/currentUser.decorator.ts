import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { userResponse } from '../userDTO/userResponse';

//tạo ra một decorator để lấy thông tin user hiện tại
export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        let currentUser = plainToInstance(userResponse, request.currentUser, { excludeExtraneousValues: true });
        return currentUser;
    },
);
