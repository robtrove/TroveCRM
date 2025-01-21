/*
  # Create Support System Tables

  1. New Tables
    - `knowledge_base_articles`
      - Article content and metadata
      - Categories and tags support
      - View tracking and feedback
    
    - `support_tickets`
      - Ticket details and status tracking
      - Priority and category management
      - Assignment tracking
    
    - `ticket_comments`
      - Comments on tickets
      - Attachment support (URLs)
    
    - `conversations`
      - Chat conversations
      - Message history
      - Read/unread tracking

  2. Security
    - Enable RLS on all tables
    - Policies for reading and writing based on user roles
*/

-- Knowledge Base Articles
CREATE TABLE IF NOT EXISTS knowledge_base_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  views integer DEFAULT 0,
  helpful_votes integer DEFAULT 0,
  not_helpful_votes integer DEFAULT 0,
  author_id uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE knowledge_base_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published articles" ON knowledge_base_articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Only admins can manage articles" ON knowledge_base_articles
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  priority text NOT NULL DEFAULT 'medium',
  category text NOT NULL,
  customer_id uuid REFERENCES customers(id),
  assigned_to uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tickets" ON support_tickets
  FOR SELECT USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'role' = 'support' OR
    customer_id = auth.uid()
  );

CREATE POLICY "Support staff can manage tickets" ON support_tickets
  FOR ALL USING (
    auth.jwt() ->> 'role' IN ('admin', 'support')
  ) WITH CHECK (
    auth.jwt() ->> 'role' IN ('admin', 'support')
  );

-- Ticket Comments
CREATE TABLE IF NOT EXISTS ticket_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES support_tickets(id) ON DELETE CASCADE,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users,
  attachments jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ticket_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view comments on their tickets" ON ticket_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE id = ticket_comments.ticket_id
      AND (
        auth.jwt() ->> 'role' IN ('admin', 'support') OR
        customer_id = auth.uid()
      )
    )
  );

CREATE POLICY "Support staff can add comments" ON ticket_comments
  FOR INSERT WITH CHECK (
    auth.jwt() ->> 'role' IN ('admin', 'support')
  );

-- Conversations
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conversation_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  sender_type text NOT NULL CHECK (sender_type IN ('customer', 'agent')),
  sender_id uuid REFERENCES auth.users,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own conversations" ON conversations
  FOR SELECT USING (
    auth.jwt() ->> 'role' IN ('admin', 'support') OR
    customer_id = auth.uid()
  );

CREATE POLICY "Support staff can manage conversations" ON conversations
  FOR ALL USING (
    auth.jwt() ->> 'role' IN ('admin', 'support')
  ) WITH CHECK (
    auth.jwt() ->> 'role' IN ('admin', 'support')
  );

CREATE POLICY "Users can view messages in their conversations" ON conversation_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE id = conversation_messages.conversation_id
      AND (
        auth.jwt() ->> 'role' IN ('admin', 'support') OR
        customer_id = auth.uid()
      )
    )
  );

CREATE POLICY "Support staff can send messages" ON conversation_messages
  FOR INSERT WITH CHECK (
    auth.jwt() ->> 'role' IN ('admin', 'support')
  );

-- Insert sample knowledge base article
INSERT INTO knowledge_base_articles (title, content, category, tags, status, author_id) VALUES
(
  'Getting Started Guide',
  'Welcome to our platform! This guide will help you get started with the basic features...',
  'Getting Started',
  ARRAY['basics', 'tutorial'],
  'published',
  (SELECT id FROM auth.users WHERE email = 'admin@example.com' LIMIT 1)
);

-- Insert sample support ticket
INSERT INTO support_tickets (title, description, status, priority, category, customer_id) VALUES
(
  'Cannot access dashboard',
  'I am unable to access the dashboard after logging in.',
  'open',
  'high',
  'Technical',
  (SELECT id FROM customers WHERE email = 'alice@example.com' LIMIT 1)
);

-- Insert sample ticket comment
INSERT INTO ticket_comments (ticket_id, content, author_id) VALUES
(
  (SELECT id FROM support_tickets ORDER BY created_at DESC LIMIT 1),
  'Could you please clear your browser cache and try again?',
  (SELECT id FROM auth.users WHERE email = 'support@example.com' LIMIT 1)
);