import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create_user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() {email,name,password}: CreateUserDTO) {
    return { 
      email,
      name,
      password
    };
  }

  @Get()
  async readAll() {
    return { users: [{}] };
  }

  @Get(':id')
  async readOne(@Param() params) {
    return { user: {}, params };
  }

  @Put(':id')
  async updateAll(@Body() body, @Param() params) {
    return {
      method: 'put',
      body,
      params,
    };
  }

  @Patch(':id')
  async updateParcial(@Body() body, @Param() params) {
    return {
      method: 'patch',
      body,
      params,
    };
  }

  @Delete(':id')
  async delete(@Param() param) {
    return {
      param,
    };
  }
}

// o @Param pega os paremetros da url como o id
