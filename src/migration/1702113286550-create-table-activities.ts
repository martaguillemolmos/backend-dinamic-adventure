import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableActivities1702113286550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "activities",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
            length: "25",
          },
          {
            name: "type",
            type: "enum",
            enum: ["terrestre", "acuatica"],
            default: '"acuatica"'
        },
          {
            name: "id_details",
            type: "int",
          },
          {
            name: "intensity",
            type: "enum",
            enum: ["high", "medium", "low"],
            default: '"medium"'
        },
        {
            name: "minimum_age",
            type: "int",
            length: "2",
          },
          {
            name: "description",
            type: "varchar",
            length: "1500",
          },
          {
            name: "price",
            type: "int",
            length: "10",
          },

          {
            name: "image",
            type: "varchar",
            length: "300",
          },
          {
            name: "is_active",
            type: "boolean",
            default: "true",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["id_details"],
            referencedTableName: "details",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("activities");
  }
}
