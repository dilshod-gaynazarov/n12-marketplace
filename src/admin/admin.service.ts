import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { compare, hash } from 'bcrypt';
import { AdminSigninDto } from './dto/signin-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { generateTokens } from 'src/utils/token';
import { Response } from 'express';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    private jwtService: JwtService,
  ) { }

  async addSuperadmin(createAdminDto: CreateAdminDto): Promise<object> {
    try {
      const hashed_password = await hash(createAdminDto.password, 7);
      const superadmin = await this.adminModel.create({
        username: createAdminDto.username,
        hashed_password: hashed_password,
        email: createAdminDto.email,
        role: 'superadmin'
      });
      return {
        message: 'success',
        data: superadmin
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addAdmin(createAdminDto: CreateAdminDto): Promise<object> {
    try {
      const hashed_password = await hash(createAdminDto.password, 7);
      const admin = await this.adminModel.create({
        username: createAdminDto.username,
        hashed_password: hashed_password,
        email: createAdminDto.email,
        role: 'admin'
      });
      return {
        message: 'success',
        data: admin
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async signin(adminSigninDto: AdminSigninDto, res: Response) {
    try {
      const { username, password } = adminSigninDto;
      const admin = await this.adminModel.findOne({ where: { username } });
      if (!admin) {
        throw new BadRequestException('username or password incorrect');
      }
      const is_valid_password = await compare(password, admin.hashed_password);
      if (!is_valid_password) {
        throw new BadRequestException('username or password incorrect');
      }
      const payload = { id: admin.id, role: admin.role };
      const { access_token, refresh_token } = await generateTokens(this.jwtService, payload);
      res.cookie('refresh_token', refresh_token);
      return {
        message: 'success',
        token: access_token
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
  
}
