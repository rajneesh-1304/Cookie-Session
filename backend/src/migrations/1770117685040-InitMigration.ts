import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1770117685040 implements MigrationInterface {
    name = 'InitMigration1770117685040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
