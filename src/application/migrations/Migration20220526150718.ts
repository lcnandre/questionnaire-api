import { Migration } from '@mikro-orm/migrations';

export class Migration20220526150718 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null);');

    this.addSql('create table "questionnaire" ("id" serial primary key, "creator_id" int not null, "title" varchar(255) not null, "share_url" varchar(255) null);');

    this.addSql('create table "question" ("id" serial primary key, "order" int not null, "title" varchar(255) not null, "questionnaire_id" int not null, "type" text check ("type" in (\'short-answer\')) not null);');
    this.addSql('create index "question_type_index" on "question" ("type");');

    this.addSql('create table "answer" ("id" serial primary key, "user_id" int not null, "question_id" int not null, "type" text check ("type" in (\'short-answer\')) not null, "text" varchar(255) null);');
    this.addSql('create index "answer_type_index" on "answer" ("type");');

    this.addSql('alter table "questionnaire" add constraint "questionnaire_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "question" add constraint "question_questionnaire_id_foreign" foreign key ("questionnaire_id") references "questionnaire" ("id") on update cascade;');

    this.addSql('alter table "answer" add constraint "answer_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "answer" add constraint "answer_question_id_foreign" foreign key ("question_id") references "question" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "questionnaire" drop constraint "questionnaire_creator_id_foreign";');

    this.addSql('alter table "answer" drop constraint "answer_user_id_foreign";');

    this.addSql('alter table "question" drop constraint "question_questionnaire_id_foreign";');

    this.addSql('alter table "answer" drop constraint "answer_question_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "questionnaire" cascade;');

    this.addSql('drop table if exists "question" cascade;');

    this.addSql('drop table if exists "answer" cascade;');
  }

}
