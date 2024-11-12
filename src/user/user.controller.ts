import { Controller, Get } from '@nestjs/common';

@Controller('user') // giống @RequestMapping trong Spring boot
export class UserController {

    @Get() // http://localhost:3000/user
    getUser() {
        return 'Hello from user controller';
    }
}
