import { MigrationInterface, QueryRunner } from 'typeorm';

export class PurchasesEntities1789130533107 implements MigrationInterface {
  name = 'PurchasesEntities1789130533107';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`purchases\` (\`id\` varchar(36) NOT NULL, \`buyerId\` varchar(255) NOT NULL, \`promptId\` varchar(255) NOT NULL, \`sellerId\` varchar(255) NOT NULL, \`amount\` decimal(10,2) NOT NULL, \`stripeCheckoutSessionId\` varchar(255) NOT NULL, \`stripePaymentIntentId\` varchar(255) NULL, \`status\` enum ('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_c0399cea12aa29daf6d6d888fc\` (\`stripeCheckoutSessionId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchases\` ADD CONSTRAINT \`FK_22533450a1d627dc3ae071f22ae\` FOREIGN KEY (\`buyerId\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchases\` ADD CONSTRAINT \`FK_a6265c32a9d1d5addadebaf1bc4\` FOREIGN KEY (\`promptId\`) REFERENCES \`prompts\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`purchases\` DROP FOREIGN KEY \`FK_a6265c32a9d1d5addadebaf1bc4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchases\` DROP FOREIGN KEY \`FK_22533450a1d627dc3ae071f22ae\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c0399cea12aa29daf6d6d888fc\` ON \`purchases\``,
    );
    await queryRunner.query(`DROP TABLE \`purchases\``);
  }
}
