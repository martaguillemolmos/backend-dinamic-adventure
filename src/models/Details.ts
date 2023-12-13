import { IsString, MaxLength, MinLength, IsNumber, Max, Min, IsEmail, IsBoolean, IsEnum, IsDate } from "class-validator"
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Activity } from "./Activity"

const Types= {
    requiriments: 'requiriments',
    details: 'details',
    itinerary: 'itinerary'
  }

@Entity()
@Unique(['type', 'information'])
export class Details extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({type:"enum", enum: Types})
    @IsEnum(Types)
    type!:string
  
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
    updated_at!: Date

  //Declaramos la relación que existe entre Details y Activity.
  @OneToMany(() => Activity, (activities) => activities.details)
  activities!: Activity[];
}
