import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminSigninDto } from './dto/signin-admin.dto';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('/superadmin')
  async addSuperadmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.addSuperadmin(createAdminDto);
  }

  @Post('/add')
  async addAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.addAdmin(createAdminDto);
  }

  @Post('/signin')
  async signin(@Body() signinAdminDto: AdminSigninDto, @Res({ passthrough: true }) res: Response) {
    return this.adminService.signin(signinAdminDto, res);
  }
}
