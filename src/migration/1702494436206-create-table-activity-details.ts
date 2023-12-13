import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableActivityDetails1702494436206 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "activity-details",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "id_details",
                type: "int",
              },
              {
                name: "id_activity",
                type: "int",
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
              {
                columnNames: ["id_activity"],
                referencedTableName: "activity",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
              },
            ],
          }),
          true
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("activity-details");
      }

}
