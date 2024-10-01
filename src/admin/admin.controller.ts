import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminSigninDto } from './dto/signin-admin.dto';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/superadmin')
  async addSuperadmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.addSuperadmin(createAdminDto);
  }

  @Post('/add')
  async addAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.addAdmin(createAdminDto);
  }

  @Post('/signin')
  async signin(
    @Body() signinAdminDto: AdminSigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signin(signinAdminDto, res);
  }

  @Post('/refreshToken/:id')
  async refreshToken(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(id, refresh_token, res);
  }
}
