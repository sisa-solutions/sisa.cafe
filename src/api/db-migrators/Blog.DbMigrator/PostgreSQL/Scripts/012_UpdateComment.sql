START TRANSACTION;


DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005030846_UpdateComment') THEN
    ALTER TABLE posts ADD comment_count integer NOT NULL DEFAULT 0;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005030846_UpdateComment') THEN
    ALTER TABLE posts ADD reaction_count integer NOT NULL DEFAULT 0;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005030846_UpdateComment') THEN
    ALTER TABLE posts ADD reaction_counts jsonb NOT NULL DEFAULT ('[]');
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005030846_UpdateComment') THEN
    ALTER TABLE posts ADD view_count integer NOT NULL DEFAULT 0;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005030846_UpdateComment') THEN
    ALTER TABLE comments ADD comment_count integer NOT NULL DEFAULT 0;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005030846_UpdateComment') THEN
    ALTER TABLE comments ADD level integer NOT NULL DEFAULT 0;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005030846_UpdateComment') THEN
    ALTER TABLE comments ADD reaction_count integer NOT NULL DEFAULT 0;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005030846_UpdateComment') THEN
    ALTER TABLE comments ADD reaction_counts jsonb NOT NULL DEFAULT ('[]');
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005030846_UpdateComment') THEN
    ALTER TABLE comments ADD view_count integer NOT NULL DEFAULT 0;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005030846_UpdateComment') THEN
    INSERT INTO migrations (id, version)
    VALUES ('20231005030846_UpdateComment', '8.0.0-rc.1.23419.6');
    END IF;
END $EF$;
COMMIT;

