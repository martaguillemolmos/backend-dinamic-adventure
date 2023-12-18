import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableChangeColumnType1702825947807 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `activity` MODIFY COLUMN `image` LONGBLOB');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `activity` MODIFY COLUMN `image` VARCHAR(300)');

    }

}
