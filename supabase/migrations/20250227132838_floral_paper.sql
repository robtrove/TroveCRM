/*
  # Create campaigns table

  1. New Tables
    - `campaigns`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `status` (text)
      - `type` (text)
      - `audience` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `budget` (numeric)
      - `spent` (numeric)
      - `metrics` (jsonb)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
  
  2. Security
    - Enable RLS on `campaigns` table
    - Add policies for authenticated users to read and manage campaigns
*/

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

-- Enable Row Level Security
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read campaigns" 
  ON campaigns
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert campaigns"
  ON campaigns
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update campaigns"
  ON campaigns
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete campaigns"
  ON campaigns
  FOR DELETE
  TO authenticated
  USING (true);