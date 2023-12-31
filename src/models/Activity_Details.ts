import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Details } from "./Details";
import { Activity } from "./Activity";
import { IsDate } from "class-validator";

@Entity()
export class Activity_Details extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  id_details!: number;

  @Column()
  id_activity!: number;

  @Column()
  @IsDate()
  created_at!: Date;

  @Column()
  @IsDate()
  updated_at!: Date;

  //Declaramos la relación que existe entre esta tabla y Users.
  @ManyToOne(() => Details, (details) => details.activity_details)
  @JoinColumn({ name: "id_details" })
  detail!: Details;

  @ManyToOne(() => Activity, (activities) => activities.activity_details)
  @JoinColumn({ name: "id_activity" })
  activity!: Activity;
}
