import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
  Res,
  Session,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Session() session): string {
    console.log('session: ', session);
    if (session.username) {
      return `Hello ${session.username}, you are logged in`;
    } else {
      return 'Please login in';
    }
  }

  @Get('viewJwtPage')
  view(@Headers('x-jwt-token') jwt: string): string {
    if (jwt) {
      try {
        const data = this.jwtService.verify(jwt);
        console.log('data: ', data);

        return `Hello ${data.username}, you are logged in by jwt`;
      } catch (error) {
        console.log('error: ', error);
        return 'login error, bad jwt token';
      }
    }
    return 'missing jwt token';
  }

  @Post('sessionLogin')
  sessionLogin(
    @Session() session,
    @Body() body: { username: string; password: string },
  ) {
    if (body.username === 'mcdaddy' && body.password === '123456') {
      session.username = body.username;
      return 'login successful';
    } else {
      return 'Invalid username or password';
    }
  }

  @Get('sessionLogout')
  logout(@Session() session): string {
    session.destroy();
    return 'you are logged out';
  }

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('jwtLogin')
  jwtLogin(
    @Res({ passthrough: true }) @Res() response: Response,
    @Body() body: { username: string; password: string },
  ) {
    if (body.username === 'mcdaddy' && body.password === '123456') {
      const newToken = this.jwtService.sign({
        username: body.username,
      });
      response.setHeader('token', newToken);
      return 'login successful by jwt';
    } else {
      return 'Invalid username or password';
    }
  }
}
