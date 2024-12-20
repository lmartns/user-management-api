import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    try {
      return this.usersRepository.find();
    } catch (error) {
      throw new Error(`Find all users error: ${error.message}`);
    }
  }

  async findByUserId(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new Error(`User ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new Error(`Not find user by Id: ${error.message}`);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      const user = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return this.usersRepository.save(user);
    } catch (error) {
      throw new Error(`User not created, error: ${error.message}`);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new Error(`User ${id} not found`);
      }

      if (updateUserDto.password) {
        const salt = await bcrypt.genSalt();
        updateUserDto.password = await bcrypt.hash(
          updateUserDto.password,
          salt,
        );
      }
      await this.usersRepository.update(id, updateUserDto);
      return this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(`User not updated, error: ${error.message}`);
    }
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new Error(`User ${id} not found`);
      }
      await this.usersRepository.delete(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error(`Error delete user for ${id}: ${error.message}`);
    }
  }
}
