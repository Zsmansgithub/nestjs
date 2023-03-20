import { PartialType } from '@nestjs/mapped-types';
import { CreateApidemoDto } from './create-apidemo.dto';

export class UpdateApidemoDto extends PartialType(CreateApidemoDto) {}
