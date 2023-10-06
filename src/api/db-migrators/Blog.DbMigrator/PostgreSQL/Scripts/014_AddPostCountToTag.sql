START TRANSACTION;


DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231006020157_AddPostCountToTag') THEN
    ALTER TABLE tags ADD post_count integer NOT NULL DEFAULT 0;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM migrations WHERE "id" = '20231006020157_AddPostCountToTag') THEN
    INSERT INTO migrations (id, version)
    VALUES ('20231006020157_AddPostCountToTag', '8.0.0-rc.1.23419.6');
    END IF;
END $EF$;
COMMIT;

