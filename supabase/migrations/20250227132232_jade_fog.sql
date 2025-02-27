/*
  # Create deals table for pipeline

  1. New Tables
    - `deals`
      - `id` (uuid, primary key)
      - `title` (text)
      - `company` (text)
      - `value` (numeric)
      - `stage` (text)
      - `progress` (integer)
      - `due_date` (date)
      - `assigned_to` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `deals` table
    - Add policies for authenticated users to perform CRUD operations
*/

-- Create deals table
CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text,
  value numeric DEFAULT 0,
  stage text DEFAULT 'qualified',
  progress integer DEFAULT 0,
  due_date date,
  assigned_to jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view deals"
  ON deals
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert deals"
  ON deals
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update deals"
  ON deals
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can delete deals"
  ON deals
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS deals_stage_idx ON deals (stage);
CREATE INDEX IF NOT EXISTS deals_title_idx ON deals (title);