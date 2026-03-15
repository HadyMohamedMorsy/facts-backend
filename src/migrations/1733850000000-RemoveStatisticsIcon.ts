import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveStatisticsIcon1733850000000 implements MigrationInterface {
  name = "RemoveStatisticsIcon1733850000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statistics" DROP COLUMN IF EXISTS "icon"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statistics" ADD "icon" character varying(1024) NOT NULL DEFAULT ''`,
    );
  }
}
