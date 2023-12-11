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
} from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appointment } from "./Appointment";
import { Activity } from "./Activity";
import { Review } from "./Review";

const Roles = {
  user: "user",
  admin: "admin",
  super_admin: "super_admin",
};

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  name!: string;

  @Column()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  surname!: string;

  @Column()
  @IsNumber()
  @Max(999999999)
  @Min(600000000)
  phone!: number;

  @Column()
  @MaxLength(50)
  @IsEmail()
  email!: string;

  @Column()
  @IsString()
  @MaxLength(12)
  @MinLength(6)
  password!: string;

  @Column({ default: true })
  @IsBoolean()
  is_active!: boolean;

  @Column({ type: "enum", enum: Roles })
  @IsEnum(Roles)
  role!: string;

  @Column()
  @IsDate()
  created_at!: Date;

  @Column()
  @IsDate()
  updated_at!: Date;

  //Declaramos la relación que existe entre User y la tabla intermedia, Appointment
  @OneToMany(() => Appointment, (appointments) => appointments.user)
  appointments!: Appointment[];

  //Declaramos la relación que existe entre User y la tabla intermedia, Appointment
  @OneToMany(() => Review, (reviews) => reviews.user)
  reviews!: Review[];

  //Declaramos la relación muchos a muchos entre User y Activity
  @ManyToMany(() => Activity)
  @JoinTable({
    name: "appointments",
    joinColumn: {
      name: "id_user",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_activity",
      referencedColumnName: "id",
    },
  })
  usersActivities!: Activity[];
}
