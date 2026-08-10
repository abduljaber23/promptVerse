import { MigrationInterface, QueryRunner } from 'typeorm';

export class PromptsEntities1786318727869 implements MigrationInterface {
  name = 'PromptsEntities1786318727869';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`preview_images\` (\`id\` varchar(36) NOT NULL, \`url\` varchar(500) NOT NULL, \`sortOrder\` int NOT NULL DEFAULT '1', \`promptId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`prompts\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`promptContent\` text NOT NULL, \`previewResult\` text NULL, \`coverImage\` varchar(255) NULL, \`price\` decimal(10,2) NOT NULL, \`salesCount\` int NOT NULL DEFAULT '0', \`viewsCount\` int NOT NULL DEFAULT '0', \`favoritesCount\` int NOT NULL DEFAULT '0', \`averageRating\` decimal(3,2) NOT NULL DEFAULT '0.00', \`isFeatured\` tinyint NOT NULL DEFAULT 0, \`status\` enum ('PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED', \`deletedAt\` datetime(6) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`sellerId\` varchar(255) NOT NULL, \`categoryId\` varchar(255) NOT NULL, \`aiToolId\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_c52dca698a6184f3ed3f5efe40\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`preview_images\` ADD CONSTRAINT \`FK_9f988131b08da6f514722b7ce33\` FOREIGN KEY (\`promptId\`) REFERENCES \`prompts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prompts\` ADD CONSTRAINT \`FK_5c9d6d69841314dc0719d600c07\` FOREIGN KEY (\`sellerId\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prompts\` ADD CONSTRAINT \`FK_1223a07f19c771f2e0976a4d084\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prompts\` ADD CONSTRAINT \`FK_b7bdbaa8c0cdc70ebcc8c1cceff\` FOREIGN KEY (\`aiToolId\`) REFERENCES \`ai_tools\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`prompts\` DROP FOREIGN KEY \`FK_b7bdbaa8c0cdc70ebcc8c1cceff\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prompts\` DROP FOREIGN KEY \`FK_1223a07f19c771f2e0976a4d084\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prompts\` DROP FOREIGN KEY \`FK_5c9d6d69841314dc0719d600c07\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`preview_images\` DROP FOREIGN KEY \`FK_9f988131b08da6f514722b7ce33\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c52dca698a6184f3ed3f5efe40\` ON \`prompts\``,
    );
    await queryRunner.query(`DROP TABLE \`prompts\``);
    await queryRunner.query(`DROP TABLE \`preview_images\``);
  }
}
