import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransferRepository {
  constructor(private prisma: PrismaService) {}
}
