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
  Unique,
} from "typeorm";
import { Activity } from "./Activity";
import { Activity_Details } from "./Activity_Details";

const Types = {
  requiriments: "requiriments",
  details: "details",
  itinerary: "itinerary",
};

@Entity()
@Unique(["type", "information"])
export class Details extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: Types })
  @IsEnum(Types)
  type!: string;

  @Column()
  @IsString()
  @MaxLength(300)
  @MinLength(3)
  information!: string;

  @Column()
  @IsDate()
  created_at!: Date;

  @Column()
  @IsDate()
  updated_at!: Date;

  //Declaramos la relación que existe entre Details y la tabla intermedia, Activity_Details
  @OneToMany(
    () => Activity_Details,
    (activity_details) => activity_details.detail
  )
  activity_details!: Activity_Details[];

  //Declaramos la relación muchos a muchos entre Details y Activity
  @ManyToMany(() => Details)
  @JoinTable({
    name: "activity-details",
    joinColumn: {
      name: "id_details",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_activity",
      referencedColumnName: "id",
    },
  })
  activitiesDetails!: Details[];
}
