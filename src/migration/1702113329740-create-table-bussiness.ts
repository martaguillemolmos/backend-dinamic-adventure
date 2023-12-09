import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableBussiness1702113329740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "bussiness",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "description",
            type: "varchar",
            length: "250",
          },
          {
            name: "phone",
            type: "int",
            length: "14",
            isUnique: true
        },
        {
            name: "email",
            type: "varchar",
            length: "100",
            isUnique: true
        },
          {
            name: "ubication",
            type: "varchar",
            length: "100",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "update_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("bussiness");
  }
}
