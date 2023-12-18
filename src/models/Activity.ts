import {
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  Max,
  Min,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsDate,
  IsBase64,
} from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./User";
import { Appointment } from "./Appointment";
import { Details } from "./Details";
import { Review } from "./Review";
import { Activity_Details } from "./Activity_Details";

const Intensity = {
  high: "high",
  medium: "medium",
  low: "low",
};

const Types = {
  terrestre: "terrestre",
  acuatica: "acuatica",
};

@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsString()
  @MaxLength(25)
  @MinLength(3)
  title!: string;

  @Column({ type: "enum", enum: Types })
  @IsEnum(Types)
  type!: string;

  @Column({ type: "enum", enum: Intensity })
  @IsEnum(Intensity)
  intensity!: string;

  @Column()
  @IsNumber()
  @Max(99)
  @Min(2)
  minimum_age!: number;

  @Column()
  @IsString()
  @MaxLength(1500)
  @MinLength(10)
  description!: string;

  @Column()
  @IsNumber()
  @Max(4000)
  @Min(1)
  price!: number;

  @Column({ type: 'longblob' })
  @IsBase64()
  image!: Buffer;

  @Column({ default: true })
  @IsBoolean()
  is_active!: boolean;

  @Column()
  @IsDate()
  created_at!: Date;

  @Column()
  @IsDate()
  updated_at!: Date;

  //Declaramos la relación que existe entre User y la tabla intermedia, Appointment
  @OneToMany(() => Review, (reviews) => reviews.activity)
  reviews!: Review[];

  //Declaramos la relación que existe entre Activity y la tabla intermedia, Appointment
  @OneToMany(() => Appointment, (appointments) => appointments.activity)
  appointments!: Appointment[];

  //Declaramos la relación muchos a muchos entre User y Activity
  @ManyToMany(() => Users)
  @JoinTable({
    name: "appointment",
    joinColumn: {
      name: "id_activity",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_user",
      referencedColumnName: "id",
    },
  })
  activitiesUsers!: Users[];

   //Declaramos la relación que existe entre Activity y la tabla intermedia, Activity_Details
   @OneToMany(() => Activity_Details, (activity_details) => activity_details.activity)
   activity_details!: Activity_Details[];

    //Declaramos la relación muchos a muchos entre Details y Activity
    @ManyToMany(() => Details)
    @JoinTable({
      name: "activity-details",
      joinColumn: {
        name: "id_activity",
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: "id_details",
        referencedColumnName: "id",
      },
    })
    activitiesDetails!: Details[];
  
}
