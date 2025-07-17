-- 1. Check existing GiyaPay providers
SELECT * FROM payment_provider WHERE id LIKE '%giyapay%';

-- 2. Delete duplicate providers (keep only pp_giyapay)
DELETE FROM region_payment_provider WHERE payment_provider_id = 'pp_pp_giyapay_pp_giyapay';
DELETE FROM payment_provider WHERE id = 'pp_pp_giyapay_pp_giyapay';

DELETE FROM region_payment_provider WHERE payment_provider_id = 'pp_giyapay_giyapay';  
DELETE FROM payment_provider WHERE id = 'pp_giyapay_giyapay';

-- 3. Clean up old region associations (region that no longer exists)
DELETE FROM region_payment_provider 
WHERE region_id = 'reg_01JZZ7FACPR9JNXZ78YZFS5HCX';

-- 4. Add payment providers to Philippines region (if not exists)
INSERT INTO region_payment_provider (region_id, payment_provider_id, id, created_at, updated_at)
SELECT 'reg_01K07Y2TSZ1T0TEC9NKVR6WVET', 'pp_giyapay', gen_random_uuid(), NOW(), NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM region_payment_provider 
    WHERE region_id = 'reg_01K07Y2TSZ1T0TEC9NKVR6WVET' 
    AND payment_provider_id = 'pp_giyapay'
);

INSERT INTO region_payment_provider (region_id, payment_provider_id, id, created_at, updated_at)
SELECT 'reg_01K07Y2TSZ1T0TEC9NKVR6WVET', 'pp_system_default', gen_random_uuid(), NOW(), NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM region_payment_provider 
    WHERE region_id = 'reg_01K07Y2TSZ1T0TEC9NKVR6WVET' 
    AND payment_provider_id = 'pp_system_default'
);

-- 5. Verify final state
SELECT * FROM payment_provider WHERE id LIKE '%giyapay%' OR id = 'pp_system_default';

-- 6. Check all region associations
SELECT r.id, r.name, rpp.payment_provider_id 
FROM region r
LEFT JOIN region_payment_provider rpp ON r.id = rpp.region_id
ORDER BY r.name, rpp.payment_provider_id; 