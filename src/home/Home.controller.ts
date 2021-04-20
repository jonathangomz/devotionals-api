import { Controller, Get } from "@nestjs/common";

@Controller()
export class HomeController {

  @Get()
  index() {
    return {
      message: 'You are in the public section for the devotionals api',
      paths: [],
    }
  }

}