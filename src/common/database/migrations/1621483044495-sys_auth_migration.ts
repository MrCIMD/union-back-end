import {MigrationInterface, QueryRunner} from "typeorm";

export class sysAuthMigration1621483044495 implements MigrationInterface {
    name = 'sysAuthMigration1621483044495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "icons" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '0', "name" character varying NOT NULL, "path" character varying NOT NULL, CONSTRAINT "PK_7d32565ab060c67427b635607de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '0', "roleId" integer NOT NULL, "routeId" integer NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '0', "picture" character varying NOT NULL, "firstname" character varying(50) NOT NULL, "lastname" character varying(50) NOT NULL, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '0', "name" character varying(20) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "routes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '0', "name" character varying(30) NOT NULL, "url" character varying NOT NULL, "level" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "iconId" integer, "parentId" integer, CONSTRAINT "PK_76100511cdfa1d013c859f01d8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '0', "email" character varying NOT NULL, "password" character varying NOT NULL, "rememberToken" character varying, "profileId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '0', "name" character varying(30) NOT NULL, "description" character varying NOT NULL, "isDefault" boolean NOT NULL DEFAULT false, "iconId" integer, CONSTRAINT "PK_7bfb822f56be449c0b8adbf83cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions_actions" ("permissionsId" integer NOT NULL, "actionsId" integer NOT NULL, CONSTRAINT "PK_1f708e336a85d7223f99f2cb764" PRIMARY KEY ("permissionsId", "actionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d97be9c78497b5b371847d4f65" ON "permissions_actions" ("permissionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0ddba9bd62ad222f635ae0592a" ON "permissions_actions" ("actionsId") `);
        await queryRunner.query(`CREATE TABLE "routes_actions" ("routesId" integer NOT NULL, "actionsId" integer NOT NULL, CONSTRAINT "PK_f0158c91113c3e36cb2dd367ea3" PRIMARY KEY ("routesId", "actionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d14a8c3c0f87752dfc903d482" ON "routes_actions" ("routesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0d9604114ccaee33ce2c198afe" ON "routes_actions" ("actionsId") `);
        await queryRunner.query(`CREATE TABLE "routes_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, CONSTRAINT "PK_1569d6772596714bc83831a764b" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c7726a56de4c6c81323e86421" ON "routes_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_69e0e3ca60bfdaf0f8e1a31c06" ON "routes_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_36d7b8e1a331102ec9161e879ce" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_b9041349edf99252727c0989fa6" FOREIGN KEY ("routeId") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "routes" ADD CONSTRAINT "FK_12a936efe55292caa9c22b29b09" FOREIGN KEY ("iconId") REFERENCES "icons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "routes" ADD CONSTRAINT "FK_33b39c719f84507768e36463922" FOREIGN KEY ("parentId") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "actions" ADD CONSTRAINT "FK_52d33af72972a99a6d9338c24cc" FOREIGN KEY ("iconId") REFERENCES "icons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions_actions" ADD CONSTRAINT "FK_d97be9c78497b5b371847d4f656" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions_actions" ADD CONSTRAINT "FK_0ddba9bd62ad222f635ae0592ab" FOREIGN KEY ("actionsId") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "routes_actions" ADD CONSTRAINT "FK_5d14a8c3c0f87752dfc903d482e" FOREIGN KEY ("routesId") REFERENCES "routes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "routes_actions" ADD CONSTRAINT "FK_0d9604114ccaee33ce2c198afe6" FOREIGN KEY ("actionsId") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "routes_closure" ADD CONSTRAINT "FK_3c7726a56de4c6c81323e864216" FOREIGN KEY ("id_ancestor") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "routes_closure" ADD CONSTRAINT "FK_69e0e3ca60bfdaf0f8e1a31c063" FOREIGN KEY ("id_descendant") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes_closure" DROP CONSTRAINT "FK_69e0e3ca60bfdaf0f8e1a31c063"`);
        await queryRunner.query(`ALTER TABLE "routes_closure" DROP CONSTRAINT "FK_3c7726a56de4c6c81323e864216"`);
        await queryRunner.query(`ALTER TABLE "routes_actions" DROP CONSTRAINT "FK_0d9604114ccaee33ce2c198afe6"`);
        await queryRunner.query(`ALTER TABLE "routes_actions" DROP CONSTRAINT "FK_5d14a8c3c0f87752dfc903d482e"`);
        await queryRunner.query(`ALTER TABLE "permissions_actions" DROP CONSTRAINT "FK_0ddba9bd62ad222f635ae0592ab"`);
        await queryRunner.query(`ALTER TABLE "permissions_actions" DROP CONSTRAINT "FK_d97be9c78497b5b371847d4f656"`);
        await queryRunner.query(`ALTER TABLE "actions" DROP CONSTRAINT "FK_52d33af72972a99a6d9338c24cc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP CONSTRAINT "FK_33b39c719f84507768e36463922"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP CONSTRAINT "FK_12a936efe55292caa9c22b29b09"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_b9041349edf99252727c0989fa6"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_36d7b8e1a331102ec9161e879ce"`);
        await queryRunner.query(`DROP INDEX "IDX_69e0e3ca60bfdaf0f8e1a31c06"`);
        await queryRunner.query(`DROP INDEX "IDX_3c7726a56de4c6c81323e86421"`);
        await queryRunner.query(`DROP TABLE "routes_closure"`);
        await queryRunner.query(`DROP INDEX "IDX_0d9604114ccaee33ce2c198afe"`);
        await queryRunner.query(`DROP INDEX "IDX_5d14a8c3c0f87752dfc903d482"`);
        await queryRunner.query(`DROP TABLE "routes_actions"`);
        await queryRunner.query(`DROP INDEX "IDX_0ddba9bd62ad222f635ae0592a"`);
        await queryRunner.query(`DROP INDEX "IDX_d97be9c78497b5b371847d4f65"`);
        await queryRunner.query(`DROP TABLE "permissions_actions"`);
        await queryRunner.query(`DROP TABLE "actions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "routes"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "icons"`);
    }

}
