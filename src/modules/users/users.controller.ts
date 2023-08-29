import {
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { ResponseDto } from '../../common/dto/responseDto';
import { SUCCESS_GET_DATA } from '../../constants';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ description: 'List all users' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user list',
    type: UserDto,
  })
  @Get()
  async getAllUser(): Promise<ResponseDto<User[]>> {
    const userList = await this.usersService.findAll();
    return new ResponseDto(userList, 200, SUCCESS_GET_DATA);
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto<User>> {
    const user = await this.usersService.findOne(id);

    return new ResponseDto(user, 200, SUCCESS_GET_DATA);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
