import { IsString, MaxLength, MinLength, IsNumber, Max, Min, IsEmail, IsBoolean, IsEnum, IsDate } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

const Roles = {
    user: 'user',
    admin: 'admin',
    super_admin: 'super_admin'
  }

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column()
    @IsString()
    @MaxLength(0)
    @MinLength(3)
    name!: string
  
    @Column()
    @IsString()
    @MaxLength(0)
    @MinLength(3)
    surname!: string
  
    @Column()
    @IsString()
    @MaxLength(300)
    @MinLength(3)
    avatar!: string

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
    @MaxLength(12)
    @MinLength(6)
    password!: string
  
    @Column({default: true})
    @IsBoolean()
    is_active!: boolean
  
    @Column({type:"enum", enum: Roles})
    @IsEnum(Roles)
    role!:string
  
    @Column()
    @IsDate()
    created_at!: Date
  
    @Column()
    @IsDate()
    update_at!: Date
}
