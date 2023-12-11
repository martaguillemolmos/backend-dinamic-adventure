import {
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  Max,
  Min,
  IsBoolean,
  IsDate,
} from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./User";
import { Activity } from "./Activity";

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  id_user!: number;

  @Column()
  id_activity!: number;

  @Column()
  @IsString()
  @MaxLength(250)
  @MinLength(3)
  description!: string;

  @Column()
  @IsNumber()
  @Max(5)
  @Min(1)
  score!: number;

  @Column({ default: true })
  @IsBoolean()
  is_active!: boolean;

  @Column()
  @IsDate()
  created_at!: Date;

  @Column()
  @IsDate()
  update_at!: Date;

  //Declaramos la relación que existe entre esta tabla y Users.
  @ManyToOne(() => Users, (users) => users.reviews)
  @JoinColumn({ name: "id_user" })
  user!: Users;

  //Relación uno a uno con Activity
  @OneToOne(() => Activity, (activity) => activity.review)
  @JoinColumn({ name: "id_activity" }) // Coloca @JoinColumn aquí
  activity!: Activity;
}
