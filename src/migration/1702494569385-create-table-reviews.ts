import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableReviews1702494569385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "review",
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
                        name: "description",
                        type: "varchar",
                        length: "250"
                    },
                    {
                        name: "score",
                        type: "int",
                        length: "5"
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: "true"
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
                        onUpdate: "CURRENT_TIMESTAMP"
                    }
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
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable ("review");
    }


}
