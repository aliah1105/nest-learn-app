/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }
  async signup(email: string, password: string) {
    const user = await this.userService.find(email);
    if (user.length) {
      throw new BadRequestException('email is used!!');
    }
    // generate salt
    const salt = randomBytes(8).toString('hex');

    // hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    
    // joinde the hashed result and salt together
    
    const hashedPassword = salt + '.' + hash.toString('hex');

    // create user
    const newUser = await this.userService.create(email, hashedPassword);

    return newUser;

  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if(!user) {
      throw new NotFoundException('User with this email not found');
    }
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if(storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad identity information');
    }
    return user;
   }
}