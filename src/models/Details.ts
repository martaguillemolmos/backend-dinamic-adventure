import { IsString, MaxLength, MinLength, IsNumber, Max, Min, IsEmail, IsBoolean, IsEnum, IsDate } from "class-validator"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

const Types= {
    requiriments: 'requiriments',
    details: 'details',
    itinerary: 'itinerary'
  }

@Entity()
export class Details extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({type:"enum", enum: Types})
    @IsEnum(Types)
    types!:string
  
    @Column()
    @IsString()
    @MaxLength(300)
    @MinLength(3)
    information!: string
  
    @Column()
    @IsDate()
    created_at!: Date
  
    @Column()
    @IsDate()
    update_at!: Date
}
