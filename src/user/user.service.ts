import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserInput } from './dto/create-user.input';
import { hash, compareSync } from 'bcrypt';
import {
  BORNDATE_ERROR_MESSAGE,
  BORNDATE_YEAR_INVALID,
  CODE_ERROR_MESSAGE,
  CREATE_ERROR_MESSAGE,
} from './user.constants';
import * as moment from 'moment';
import { UserLogin } from '../auth/dto/login-user.input';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  //is_active se estiver ativando quando for ativo
  //is_active se estiver desativando quando estiver não ativo

  async create(data: CreateUserInput): Promise<any> {
    data.borndate = this.userBornDate(String(data.borndate));
    this.userCodeValdiate(data.code);

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

  async validateUser(data: UserLogin) {
    const user = await this.userRepository.get({ email: data.email });


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
    if (code.length !== 4 || !/^\d{4}$/.test(code)) throw new BadRequestException([CODE_ERROR_MESSAGE]); // esperado apénas 4 digitos.

    const numbers = new Set(code);
    if (numbers.size !== code.length) throw new BadRequestException([CODE_ERROR_MESSAGE]); // remove os numeros repetidos valida se sumiu algo;
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
