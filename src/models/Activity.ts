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
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Appointment } from "./Appointment";
import { Details } from "./Details";
import { Review } from "./Review";

const Intensity = {
  high: "high",
  medium: "medium",
  low: "low",
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

  @Column()
  id_details!: number;

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
  @IsString()
  @MaxLength(300)
  @MinLength(3)
  image!: string;

  @Column({ default: true })
  @IsBoolean()
  is_active!: boolean;

  @Column()
  @IsDate()
  created_at!: Date;

  @Column()
  @IsDate()
  update_at!: Date;

  //Declaramos la relación que existe entre Activity y Review
  @OneToOne(() => Review, (review) => review.activity)
  @JoinColumn()
  review!: Review;

  //Declaramos la relación que existe entre Activity y la tabla intermedia, Appointment
  @OneToMany(() => Appointment, (appointments) => appointments.activity)
  appointments!: Appointment[];

  //Declaramos la relación muchos a muchos entre User y Activity
  @ManyToMany(() => User)
  @JoinTable({
    name: "appointments",
    joinColumn: {
      name: "id_activity",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_user",
      referencedColumnName: "id",
    },
  })
  activitiesUsers!: User[];

  //Declaramos la relación que existe entre esta tabla y Details.
  @ManyToOne(() => Details, (details) => details.activities)
  @JoinColumn({ name: "id_details" })
  details!: Details;
}
