
BEGIN;

DROP TABLE IF EXISTS "users", "news", "donors", "survey", "stats", "partners", "social_media" CASCADE;

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar(100) DEFAULT 'user',
	"email" varchar(100) NOT NULL UNIQUE,
	"role" varchar(100) NOT NULL DEFAULT 'user',
	"password" varchar(1000),
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "news" (
	"id" SERIAL NOT NULL,
	"photo" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"date" TEXT NOT NULL
);

CREATE TABLE "donors" (
	"id" SERIAL NOT NULL,
	"email" TEXT NOT NULL,
	"amount" INTEGER NOT NULL
);

CREATE TABLE "survey" (
	"id" SERIAL NOT NULL,
	"rate" INTEGER NOT NULL
);

CREATE TABLE "stats" (
	"id" SERIAL NOT NULL,
	"families_ben" INTEGER NOT NULL,
	"orphans" INTEGER NOT NULL,
	"employees" INTEGER NOT NULL,
	"families_prod" INTEGER NOT NULL,
	"revenues" INTEGER NOT NULL,
	"expenses" INTEGER NOT NULL,
	"facebook" TEXT,
	"twitter" TEXT,
	"instagram" TEXT
);

CREATE TABLE "partners" (
	"id" SERIAL NOT NULL,
	"img" TEXT NOT NULL
);

INSERT INTO users  (username, email, password, role)
VALUES( 'admin','admin@tamken.com'  ,'$2a$10$aYdb8VPiGwRGdJT2Qs8mN.fVuveprC9hnChFaHcHJeDDfNRVzXQsG','admin');


COMMIT;
