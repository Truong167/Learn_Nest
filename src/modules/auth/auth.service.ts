import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authService: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async signin(accountName: string, password: string): Promise<string> {
    const account = await this.authService.findOneBy({ accountName });
    if (!account) {
      throw new NotFoundException('Account does not exist');
    }
    const isMatchPassword = await bcrypt.compare(password, account.password);
    if (!isMatchPassword) {
      throw new UnauthorizedException('Infor signin wrong');
    }
    const accessToken = this.jwtService.sign(
      { userId: account?.userId },
      { secret: process.env.JWT_SERECT },
    );
    return accessToken;
  }
}
