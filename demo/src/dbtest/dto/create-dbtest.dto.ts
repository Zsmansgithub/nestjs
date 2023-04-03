import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator'
export class CreateDbtestDto {
    @IsString()
    spuName: string

    @IsString()
    color: string

    @IsString()
    colorCode: string

    @IsString()
    fineCode: string

    @IsNumber()
    number: number

    @IsNumber()
    isActive: number

    menchart: []

    warehouse: { name: '', code: '' }
}
