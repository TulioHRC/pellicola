import { Controller, Get } from '@nestjs/common'


@Controller('api')
export class ApiController {
    @Get()
    test(): { message: string } {
        return { message: "Hello World!"}
    }
}