import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("app")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: "Saludo de prueba" })
  @ApiResponse({ status: 200, description: "Devuelve un saludo." })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
