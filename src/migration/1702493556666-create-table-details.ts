import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableDetails1702493556666 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "details",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "type",
                        type: "enum",
                        enum: ["requiriments", "details", "itinerary"],
                        default: '"details"'
                    },
                    {
                        name: "information",
                        type: "varchar",
                        length: "400"
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
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable ("details");
    }
    
}
