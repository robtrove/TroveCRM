/*
  # Update Customers Table

  1. New Columns
    - timezone: Store customer's timezone
    - tags: Array of tags for categorization
    - company: Company information
    - company_size: Size of the company
    - industry: Industry sector
    - website: Company website
    - notes: Additional notes
*/

-- Add new columns to customers table
ALTER TABLE customers ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'UTC';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS company text;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS company_size text;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS industry text;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS website text;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS notes text;

-- Update existing records with sample data
UPDATE customers 
SET 
  timezone = CASE 
    WHEN email = 'alice@example.com' THEN 'America/New_York'
    WHEN email = 'bob@example.com' THEN 'America/Los_Angeles'
    WHEN email = 'charlie@example.com' THEN 'Europe/London'
    WHEN email = 'david@example.com' THEN 'Asia/Tokyo'
    ELSE 'UTC'
  END,
  tags = CASE 
    WHEN email = 'alice@example.com' THEN ARRAY['enterprise', 'tech']
    WHEN email = 'bob@example.com' THEN ARRAY['startup', 'finance']
    WHEN email = 'charlie@example.com' THEN ARRAY['enterprise', 'healthcare']
    WHEN email = 'david@example.com' THEN ARRAY['mid-market', 'retail']
    ELSE '{}'
  END,
  company = CASE 
    WHEN email = 'alice@example.com' THEN 'TechCorp Inc'
    WHEN email = 'bob@example.com' THEN 'FinStart LLC'
    WHEN email = 'charlie@example.com' THEN 'HealthPlus'
    WHEN email = 'david@example.com' THEN 'RetailPro'
    ELSE NULL
  END,
  company_size = CASE 
    WHEN email = 'alice@example.com' THEN '1000+'
    WHEN email = 'bob@example.com' THEN '10-50'
    WHEN email = 'charlie@example.com' THEN '500-1000'
    WHEN email = 'david@example.com' THEN '100-500'
    ELSE NULL
  END,
  industry = CASE 
    WHEN email = 'alice@example.com' THEN 'Technology'
    WHEN email = 'bob@example.com' THEN 'Financial Services'
    WHEN email = 'charlie@example.com' THEN 'Healthcare'
    WHEN email = 'david@example.com' THEN 'Retail'
    ELSE NULL
  END,
  website = CASE 
    WHEN email = 'alice@example.com' THEN 'https://techcorp.com'
    WHEN email = 'bob@example.com' THEN 'https://finstart.io'
    WHEN email = 'charlie@example.com' THEN 'https://healthplus.com'
    WHEN email = 'david@example.com' THEN 'https://retailpro.com'
    ELSE NULL
  END;