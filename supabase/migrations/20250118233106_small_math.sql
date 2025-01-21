/*
  # Administration Settings Tables

  1. New Tables
    - api_settings
      - id (uuid, primary key) 
      - provider (text) - e.g. 'chargebee', 'openai'
      - settings (jsonb) - Stores provider-specific settings
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - general_settings
      - id (uuid, primary key)
      - company_name (text)
      - language (text)
      - timezone (text) 
      - date_format (text)
      - currency (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - security_settings
      - id (uuid, primary key)
      - two_factor_enabled (boolean)
      - session_timeout (integer) - minutes
      - password_expiry (integer) - days
      - max_login_attempts (integer)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - chat_settings
      - id (uuid, primary key)
      - enabled (boolean)
      - initial_message (text)
      - theme (jsonb)
      - workflow (jsonb)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - email_settings
      - id (uuid, primary key)
      - smtp_host (text)
      - smtp_port (text)
      - username (text)
      - password (text)
      - from_name (text)
      - from_email (text)
      - enable_tls (boolean)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin-only access
*/

-- API Settings
CREATE TABLE IF NOT EXISTS api_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  settings jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE api_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage API settings" ON api_settings
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- General Settings
CREATE TABLE IF NOT EXISTS general_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  timezone text NOT NULL DEFAULT 'UTC',
  date_format text NOT NULL DEFAULT 'MM/DD/YYYY',
  currency text NOT NULL DEFAULT 'USD',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE general_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage general settings" ON general_settings
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Security Settings
CREATE TABLE IF NOT EXISTS security_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  two_factor_enabled boolean DEFAULT false,
  session_timeout integer DEFAULT 30,
  password_expiry integer DEFAULT 90,
  max_login_attempts integer DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE security_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage security settings" ON security_settings
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Chat Settings
CREATE TABLE IF NOT EXISTS chat_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enabled boolean DEFAULT true,
  initial_message text DEFAULT 'Hi! How can I help you today?',
  theme jsonb DEFAULT '{"primaryColor": "#0A0A0A", "textColor": "#FFFFFF", "backgroundColor": "#FFFFFF"}',
  workflow jsonb DEFAULT '{"useKnowledgeBase": true, "maxResponseTime": 30, "fallbackMessage": "I will connect you with a support agent who can help."}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE chat_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage chat settings" ON chat_settings
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Email Settings
CREATE TABLE IF NOT EXISTS email_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  smtp_host text,
  smtp_port text,
  username text,
  password text,
  from_name text,
  from_email text,
  enable_tls boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE email_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage email settings" ON email_settings
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Insert default settings
INSERT INTO api_settings (provider, settings) VALUES
('chargebee', '{"site": "", "apiKey": "", "publishableKey": ""}'),
('openai', '{"apiKey": "", "model": "gpt-4", "temperature": 0.7, "maxTokens": 2000}');

INSERT INTO general_settings (company_name) VALUES ('Acme Inc.');
INSERT INTO security_settings DEFAULT VALUES;
INSERT INTO chat_settings DEFAULT VALUES;
INSERT INTO email_settings (smtp_host, smtp_port) VALUES ('smtp.smtptogo.com', '587');