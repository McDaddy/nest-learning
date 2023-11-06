import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Inject,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

const map = new Map<string, QrCodeInfo>();

interface QrCodeInfo {
  status:
    | 'noscan'
    | 'scan-wait-confirm'
    | 'scan-confirm'
    | 'scan-cancel'
    | 'expired';
  userInfo?: {
    username: string;
  };
}
// noscan 未扫描
// scan-wait-confirm -已扫描，等待用户确认
// scan-confirm 已扫描，用户同意授权
// scan-cancel 已扫描，用户取消授权
// expired 已过期

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('qrcode/generate')
  async generate(@Req() request: Request) {
    const uuid = randomUUID();
    const dataUrl = await qrcode.toDataURL(
      `${request.protocol}://${request.headers.host}/pages/confirm.html?id=${uuid}`,
    );

    map.set(`qrcode_${uuid}`, {
      status: 'noscan',
    });

    return {
      qrcode_id: uuid,
      img: dataUrl,
    };
  }

  @Get('qrcode/check')
  async check(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    if (info.status === 'scan-confirm') {
      return {
        token: await this.jwtService.sign({
          username: info.userInfo.username,
        }),
        ...info,
        username: info.userInfo.username,
      };
    }
    return info;
  }

  @Get('qrcode/scan')
  async scan(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-wait-confirm';
    return 'success';
  }

  @Get('qrcode/confirm')
  async confirm(
    @Query('id') id: string,
    @Headers('xx-jwt-token') auth: string,
  ) {
    let user;
    try {
      const info = await this.jwtService.verify(auth);

      user = { username: info.username };
    } catch (e) {
      throw new UnauthorizedException('token 过期，请重新登录');
    }

    const info = map.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-confirm';
    info.userInfo = { username: user.username };
    return 'success';
  }

  @Get('qrcode/cancel')
  async cancel(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-cancel';
    return 'success';
  }

  @Get('login')
  async login(@Query('username') username: string) {
    return {
      token: await this.jwtService.sign({
        username: username,
      }),
    };
  }

  @Get('userInfo')
  async userInfo(@Headers('xx-jwt-token') auth: string) {
    try {
      const info = await this.jwtService.verify(auth);

      if (info.username) {
        return { username: info.username };
      }
      return 'failed';
    } catch (e) {
      throw new UnauthorizedException('token 过期，请重新登录');
    }
  }
}
