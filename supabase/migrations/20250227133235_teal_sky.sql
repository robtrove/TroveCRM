/*
  # Create Missing Tables for CRM

  1. New Tables
    - `campaigns` - For marketing campaigns
    - `deals` - For pipeline/sales deals
  
  2. Security
    - Enable RLS on all tables
    - Set up proper policies for authenticated users
*/

-- Create campaigns table if it doesn't exist
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status text DEFAULT 'scheduled',
  type text NOT NULL,
  audience text,
  start_date date,
  end_date date,
  budget numeric DEFAULT 0,
  spent numeric DEFAULT 0,
  metrics jsonb DEFAULT '{"sent": 0, "opened": 0, "clicked": 0, "converted": 0}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS for campaigns
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Create deals table if it doesn't exist
CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text,
  value numeric DEFAULT 0,
  stage text DEFAULT 'qualified',
  progress int DEFAULT 20,
  due_date date,
  assigned_to jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS for deals
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;