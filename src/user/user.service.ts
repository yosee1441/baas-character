import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User as UserInterface } from './interfaces';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.findOneByEmail(dto.email);
    if (user) {
      return user;
    }
    return this.userRepository.save({
      email: dto.email,
    });
  }

  findOneByEmail(email: UserInterface['email']): Promise<User | null> {
    return this.userRepository.findOneBy({ email: email });
  }
}
