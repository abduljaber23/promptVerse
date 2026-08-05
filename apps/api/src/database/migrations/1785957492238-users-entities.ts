import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersEntities1785957492238 implements MigrationInterface {
    name = 'UsersEntities1785957492238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`balance\` decimal(10,2) NOT NULL DEFAULT '0.00', \`role\` enum ('USER', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'USER', \`status\` enum ('INACTIVE', 'ACTIVE', 'BANNED') NOT NULL DEFAULT 'ACTIVE', \`isEmailVerified\` tinyint NOT NULL DEFAULT 0, \`emailVerifiedAt\` timestamp NULL, \`verificationToken\` varchar(255) NULL, \`verificationTokenExpiresAt\` timestamp NULL, \`resetPasswordToken\` varchar(255) NULL, \`resetPasswordTokenExpiresAt\` timestamp NULL, \`stripeCustomerId\` varchar(255) NULL, \`stripeAccountId\` varchar(255) NULL, \`stripeOnboardingComplete\` tinyint NOT NULL DEFAULT 0, \`lastLoginAt\` timestamp NULL, \`deletedAt\` datetime(6) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_3676155292d72c67cd4e090514\` (\`status\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_profiles\` (\`id\` varchar(36) NOT NULL, \`avatar\` varchar(500) NULL, \`bio\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, UNIQUE INDEX \`REL_6ca9503d77ae39b4b5a6cc3ba8\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`social_links\` (\`id\` varchar(36) NOT NULL, \`platform\` enum ('WEBSITE', 'TWITTER', 'INSTAGRAM', 'GITHUB', 'LINKEDIN', 'YOUTUBE', 'TIKTOK', 'DISCORD') NOT NULL, \`url\` varchar(500) NOT NULL, \`profile_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` ADD CONSTRAINT \`FK_6ca9503d77ae39b4b5a6cc3ba88\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`social_links\` ADD CONSTRAINT \`FK_f5fb51a7f6fbc93af70f07899ef\` FOREIGN KEY (\`profile_id\`) REFERENCES \`user_profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`social_links\` DROP FOREIGN KEY \`FK_f5fb51a7f6fbc93af70f07899ef\``);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` DROP FOREIGN KEY \`FK_6ca9503d77ae39b4b5a6cc3ba88\``);
        await queryRunner.query(`DROP TABLE \`social_links\``);
        await queryRunner.query(`DROP INDEX \`REL_6ca9503d77ae39b4b5a6cc3ba8\` ON \`user_profiles\``);
        await queryRunner.query(`DROP TABLE \`user_profiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_3676155292d72c67cd4e090514\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
