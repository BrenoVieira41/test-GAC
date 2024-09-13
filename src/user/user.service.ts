import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserInput } from './dto/create-user.input';
import { hash, compareSync } from 'bcrypt';
import {
  BORNDATE_ERROR_MESSAGE,
  BORNDATE_YEAR_INVALID,
  CODE_ERROR_MESSAGE,
  CREATE_ERROR_MESSAGE,
  DELETE_ERROR_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
  GET_ERROR_MESSAGE,
  PASSWORD_NOT_FOUND,
  UPDATE_ERROR_MESSAGE,
  UPDATE_SUCCESS_MESSAGE,
  USER_NOT_FOUND,
  VALUE_NOT_FOUND,
} from './user.constants';
import * as moment from 'moment';
import { UserLogin } from '../auth/dto/login-user.input';
import { Users } from './user.entity';
import { GetUserInput } from './dto/get-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserInput): Promise<any> {
    data.borndate = this.userBornDate(String(data.borndate));
    this.userCodeValdiate(data.code);
    await this.userAlreadyExist(data.email);

    try {
      const { password } = data;
      data.password = await hash(password, 8);

      const user = await this.userRepository.create(data);
      Reflect.deleteProperty(user, 'password');
      return user;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException([CREATE_ERROR_MESSAGE]);
    }
  }

  async getUser(data: GetUserInput) {
    const { email, id } = data;

    if (!email && !id) throw new UnauthorizedException([VALUE_NOT_FOUND]);

    try {
      const user: Users = await this.userRepository.get({ id: id });
      Reflect.deleteProperty(user, 'password');

      return user;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException([GET_ERROR_MESSAGE]);
    }
  }

  async update(id: string, data: UpdateUserInput) {
    if (!Object.values(data).length) throw new BadRequestException([VALUE_NOT_FOUND]);
    if (data.borndate) {
      data.borndate = this.userBornDate(String(data.borndate));
    }
    if (data.code) {
      this.userCodeValdiate(data.code);
    }
    if (data.email) await this.userAlreadyExist(data.email);

    try {
      const user = await this.userRepository.get({ id });

      await this.userRepository.update(id, data);

      return UPDATE_SUCCESS_MESSAGE;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException([UPDATE_ERROR_MESSAGE]);
    }
  }

  private async userAlreadyExist(email: string) {
    const userAlreadyExist = await this.userRepository.get({ email });

    if (userAlreadyExist) throw new BadRequestException(['usuario já existe']);
  }

  async delete(id: string): Promise<String> {
    let user = await this.userRepository.get({ id });

    if (!user) throw new BadRequestException([USER_NOT_FOUND]);
    try {
      await this.userRepository.delete(id);

      return DELETE_SUCCESS_MESSAGE;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException([DELETE_ERROR_MESSAGE]);
    }
  }

  async validateUser(data: UserLogin): Promise<Users | null> {
    const user: Users = await this.userRepository.get({ email: data.email });

    if (!user) throw new UnauthorizedException([USER_NOT_FOUND]);
    if (!data.password) throw new BadRequestException([PASSWORD_NOT_FOUND]);

    if (user && compareSync(data.password, user.password)) return { password: data.password, ...user };

    return null;
  }

  private userBornDate(bornDate: string): Date {
    const current = moment(new Date());
    const newBornDate = moment(bornDate, 'DD/MM/YYYY', true);

    if (current < newBornDate) throw new BadRequestException([BORNDATE_ERROR_MESSAGE]);
    if (!newBornDate.isValid()) throw new BadRequestException([BORNDATE_ERROR_MESSAGE]);

    const diffInYears = current.diff(newBornDate, 'year');
    if (diffInYears < 18) throw new ForbiddenException([BORNDATE_YEAR_INVALID]);
    return moment(newBornDate).toDate();
  }

  private userCodeValdiate(code: string): any {
    if (code.length !== 4 || !/^\d{4}$/.test(code)) throw new BadRequestException([CODE_ERROR_MESSAGE]);

    const numbers = new Set(code);
    if (numbers.size !== code.length) throw new BadRequestException([CODE_ERROR_MESSAGE]);
  }

  // private validateYears(bornDate: string): any {
  //   const current = moment(new Date());
  //   const newBornDate = moment(bornDate, 'DD/MM/YYYY', true);

  //   if (current < newBornDate) throw new BadRequestException([BORNDATE_ERROR_MESSAGE]);
  //   if (!newBornDate.isValid()) throw new BadRequestException([BORNDATE_ERROR_MESSAGE]);

  //   const [day, month, year] = bornDate.split('/').map(Number);;
  //   const today = new Date();
  //   let pass =
  //   (today.getMonth() > month - 1 ||
  //   (today.getMonth() === month - 1 && today.getDate() >= day)) ? 0 : -1;

  //   const currentAge = (today.getFullYear() - year) + pass;
  //   console.log(currentAge);
  // }
}
