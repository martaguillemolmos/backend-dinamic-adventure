import { IsString, MaxLength, MinLength, IsNumber, Max, Min, IsEmail, IsBoolean, IsEnum, IsDate } from "class-validator"

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Bussiness extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column()
    @IsString()
    @MaxLength(50)
    @MinLength(3)
    name!: string
  
    @Column()
    @IsString()
    @MaxLength(250)
    @MinLength(3)
    description!: string

    @Column()
    @IsNumber()
    @Max(999999999)
    @Min(600000000)
    phone!: number
  
    @Column()
    @MaxLength (50)
    @IsEmail()
    email!: string
  
    @Column()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    ubication!: string
  
    @Column()
    @IsDate()
    created_at!: Date
  
    @Column()
    @IsDate()
    updated_at!: Date
}
