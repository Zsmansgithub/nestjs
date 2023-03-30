import { ApiProperty } from '@nestjs/swagger';
export class CreateGuardDto {
    @ApiProperty({ example: '张三老师', enum: ['1', '2', '3'], required: true })
    name: string
    @ApiProperty({ example: 33, required: false })
    age: number
}
