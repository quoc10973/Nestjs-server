import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TestController } from './controller/testController';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get() //Decorators are used to define the metadata for the class
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/quoc')
  quocHandsome(): object {
    return { quoc: 'handsome' };
  }

}
