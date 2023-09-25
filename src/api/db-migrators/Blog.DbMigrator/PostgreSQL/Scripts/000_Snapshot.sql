﻿CREATE TABLE IF NOT EXISTS migrations (
    id character varying(100) NOT NULL,
    version character varying(50) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT (timezone('utc', now())),
    CONSTRAINT pk_migrations PRIMARY KEY (id)
);

START TRANSACTION;


DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE EXTENSION IF NOT EXISTS unaccent;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE TABLE categories (
        id uuid NOT NULL DEFAULT (gen_random_uuid()),
        parent_id uuid NULL,
        name character varying(100) NOT NULL DEFAULT (''),
        slug character varying(100) NOT NULL DEFAULT (''),
        description character varying(200) NOT NULL DEFAULT (''),
        level integer NOT NULL DEFAULT 1,
        created_by uuid NULL,
        created_at timestamp with time zone NOT NULL,
        updated_by uuid NULL,
        updated_at timestamp with time zone NULL,
        deleted_by uuid NULL,
        deleted_at timestamp with time zone NULL,
        CONSTRAINT pk_categories PRIMARY KEY (id),
        CONSTRAINT fk_categories_categories_parent_id FOREIGN KEY (parent_id) REFERENCES categories (id) ON DELETE RESTRICT
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE TABLE data_protection_keys (
        id integer GENERATED BY DEFAULT AS IDENTITY,
        friendly_name text NULL,
        xml text NULL,
        CONSTRAINT pk_data_protection_keys PRIMARY KEY (id)
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE TABLE tags (
        id uuid NOT NULL DEFAULT (gen_random_uuid()),
        name character varying(50) NOT NULL DEFAULT (''),
        slug character varying(50) NOT NULL DEFAULT (''),
        description character varying(200) NOT NULL DEFAULT (''),
        created_by uuid NULL,
        created_at timestamp with time zone NOT NULL,
        updated_by uuid NULL,
        updated_at timestamp with time zone NULL,
        deleted_by uuid NULL,
        deleted_at timestamp with time zone NULL,
        CONSTRAINT pk_tags PRIMARY KEY (id)
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE TABLE posts (
        id uuid NOT NULL DEFAULT (gen_random_uuid()),
        category_id uuid NOT NULL,
        title character varying(100) NOT NULL DEFAULT (''),
        slug character varying(100) NOT NULL DEFAULT (''),
        excerpt character varying(200) NOT NULL DEFAULT (''),
        content character varying(5000) NOT NULL DEFAULT (''),
        status character varying(50) NOT NULL DEFAULT ('DRAFT'),
        status_histories jsonb NOT NULL DEFAULT ('[]'),
        tags jsonb NOT NULL DEFAULT ('[]'),
        created_by uuid NULL,
        created_at timestamp with time zone NOT NULL,
        updated_by uuid NULL,
        updated_at timestamp with time zone NULL,
        deleted_by uuid NULL,
        deleted_at timestamp with time zone NULL,
        CONSTRAINT pk_posts PRIMARY KEY (id),
        CONSTRAINT fk_posts_categories_category_id FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE TABLE comments (
        id uuid NOT NULL DEFAULT (gen_random_uuid()),
        parent_id uuid NULL,
        post_id uuid NOT NULL,
        content character varying(500) NOT NULL DEFAULT (''),
        level integer NOT NULL DEFAULT 1,
        created_by uuid NULL,
        created_at timestamp with time zone NOT NULL,
        updated_by uuid NULL,
        updated_at timestamp with time zone NULL,
        deleted_by uuid NULL,
        deleted_at timestamp with time zone NULL,
        CONSTRAINT pk_comments PRIMARY KEY (id),
        CONSTRAINT fk_comments_comments_parent_id FOREIGN KEY (parent_id) REFERENCES comments (id) ON DELETE RESTRICT,
        CONSTRAINT fk_comments_posts_post_id FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE RESTRICT
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE TABLE post_reactions (
        id uuid NOT NULL DEFAULT (gen_random_uuid()),
        post_id uuid NOT NULL,
        user_id uuid NOT NULL,
        reactions jsonb NOT NULL DEFAULT ('[]'),
        CONSTRAINT pk_post_reactions PRIMARY KEY (id),
        CONSTRAINT fk_post_reactions_posts_post_id FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE RESTRICT
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE TABLE comment_reactions (
        id uuid NOT NULL DEFAULT (gen_random_uuid()),
        comment_id uuid NOT NULL,
        user_id uuid NOT NULL,
        reactions jsonb NOT NULL DEFAULT ('[]'),
        CONSTRAINT pk_comment_reactions PRIMARY KEY (id),
        CONSTRAINT fk_comment_reactions_comments_comment_id FOREIGN KEY (comment_id) REFERENCES comments (id) ON DELETE RESTRICT
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE INDEX ix_categories_parent_id ON categories (parent_id);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE INDEX ix_categories_slug ON categories (slug);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE INDEX ix_comment_reactions_comment_id ON comment_reactions (comment_id);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE INDEX ix_comments_parent_id ON comments (parent_id);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE INDEX ix_comments_post_id ON comments (post_id);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE INDEX ix_post_reactions_post_id ON post_reactions (post_id);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE INDEX ix_posts_category_id ON posts (category_id);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE INDEX ix_posts_slug ON posts (slug);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    CREATE INDEX ix_tags_slug ON tags (slug);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20230921071526_Initialize') THEN
    INSERT INTO migrations (id, version)
    VALUES ('20230921071526_Initialize', '7.0.11');
    END IF;
END $EF$;
COMMIT;

