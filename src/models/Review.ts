import { IsString, MaxLength, MinLength, IsNumber, Max, Min, IsEmail, IsBoolean, IsEnum, IsDate } from "class-validator"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Review extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    id_user!: number;

    @Column()
    id_activity!: number;

    @Column()
    @IsString()
    @MaxLength(250)
    @MinLength(3)
    description!: string

    @Column()
    @IsNumber()
    @Max(5)
    @Min(1)
    score!: number

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
