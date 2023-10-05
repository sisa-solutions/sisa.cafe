START TRANSACTION;


DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005035830_SimplizeComment') THEN
    ALTER TABLE comments DROP COLUMN comment_count;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005035830_SimplizeComment') THEN
    ALTER TABLE comments DROP COLUMN view_count;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231005035830_SimplizeComment') THEN
    INSERT INTO migrations (id, version)
    VALUES ('20231005035830_SimplizeComment', '8.0.0-rc.1.23419.6');
    END IF;
END $EF$;
COMMIT;

