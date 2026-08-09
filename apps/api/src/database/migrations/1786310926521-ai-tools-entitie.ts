import { MigrationInterface, QueryRunner } from "typeorm";

export class AiToolsEntitie1786310926521 implements MigrationInterface {
    name = 'AiToolsEntitie1786310926521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ai_tools\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`iconUrl\` varchar(500) NULL, \`deletedAt\` datetime(6) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_04fe3deae9135ad8655be3281c\` (\`name\`), UNIQUE INDEX \`IDX_afb826eb89090e229932ad18db\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_afb826eb89090e229932ad18db\` ON \`ai_tools\``);
        await queryRunner.query(`DROP INDEX \`IDX_04fe3deae9135ad8655be3281c\` ON \`ai_tools\``);
        await queryRunner.query(`DROP TABLE \`ai_tools\``);
    }

}
