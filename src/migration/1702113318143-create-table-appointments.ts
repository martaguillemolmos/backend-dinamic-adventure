import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableAppointments1702113318143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "appointments",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "id_user",
                  type: "int",
                },
                {
                  name: "id_activity",
                  type: "int",
                },
                {
                  name: "participants",
                  type: "int",
                  length: "4"
                },
                {
                  name: "date",
                  type: "timestamp",
                },
                {
                    name: "price",
                    type: "int",
                    length: "10"
                },
                {
                  name: "status_appointment",
                  type: "enum",
                  enum: ["pending", "approved", "canceled", "made"],
                  default: '"pending"'
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
                  name: "update_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
                  onUpdate: "CURRENT_TIMESTAMP",
                },
              ],
              foreignKeys: [
                {
                    columnNames: ["id_user"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                  },
                {
                  columnNames: ["id_activity"],
                  referencedTableName: "activity",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE",
                }
              ],
            }),
            true
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable ("appointments");
    }

}
