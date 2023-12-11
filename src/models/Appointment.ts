import {
  IsNumber,
  Max,
  Min,
  IsBoolean,
  IsEnum,
  IsDate,
} from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./User";
import { Activity } from "./Activity";

const Status = {
  pending: "pending",
  approved: "approved",
  canceled: "canceled",
  made: "made",
};

@Entity()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  id_user!: number;

  @Column()
  id_activity!: number;

  @Column()
  @IsNumber()
  @Max(50)
  @Min(1)
  participants!: number;

  @Column()
  @IsDate()
  date!: Date;

  @Column()
  @IsNumber()
  @Max(4000)
  @Min(1)
  price!: number;

  @Column({ type: "enum", enum: Status })
  @IsEnum(Status)
  status_appointment!: string;

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
  @ManyToOne(() => Users, (users) => users.appointments)
  @JoinColumn({ name: "id_user" })
  user!: Users;

  @ManyToOne(() => Activity, (activities) => activities.appointments)
  @JoinColumn({ name: "id_activity" })
  activity!: Activity;
}
