import { IsString, MaxLength, MinLength, IsNumber, Max, Min, IsEmail, IsBoolean, IsEnum, IsDate } from "class-validator"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

const Intensity = {
    high: 'high',
    medium: 'medium',
    low: 'low'
  }

@Entity()
export class Activity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @IsString()
    @MaxLength(25)
    @MinLength(3)
    title!: string

    @Column()
    id_details!: number;

    @Column({type:"enum", enum: Intensity})
    @IsEnum(Intensity)
    intensity!:string

    @Column()
    @IsNumber()
    @Max(99)
    @Min(2)
    minimum_age!: number

    @Column()
    @IsString()
    @MaxLength(1500)
    @MinLength(10)
    description!: string

    @Column()
    @IsString()
    @MaxLength(300)
    @MinLength(3)
    image!: string

    @Column({default: true})
    @IsBoolean()
    is_active!: boolean

    @Column()
    @IsDate()
    created_at!: Date
  
    @Column()
    @IsDate()
    update_at!: Date
}
