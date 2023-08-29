import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/public-route.decorator';
import { ResponseDto } from '../../common/dto/responseDto';
import { SUCCESS_SIGNIN } from '../../constants';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOkResponse({ description: SUCCESS_SIGNIN })
  @Public()
  async signin(@Body() signinDto: SigninDto): Promise<ResponseDto<string>> {
    const signin = await this.authService.signin(
      signinDto.accountName,
      signinDto.password,
    );
    return new ResponseDto(signin, 200, SUCCESS_SIGNIN);
  }
}
