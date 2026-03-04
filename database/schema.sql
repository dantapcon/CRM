-- =====================================================
-- NexusCRM — SQLite Database Schema
-- =====================================================

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- ─── 1. USERS & ROLES ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS roles (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL UNIQUE,  -- 'admin','sales','support','marketing','readonly'
    permissions TEXT    NOT NULL,          -- JSON array of permission keys
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT    NOT NULL,
    email         TEXT    NOT NULL UNIQUE,
    password_hash TEXT    NOT NULL,
    role_id       INTEGER REFERENCES roles(id),
    department    TEXT,
    phone         TEXT,
    avatar_url    TEXT,
    is_active     BOOLEAN DEFAULT 1,
    last_login    DATETIME,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── 2. ACCOUNTS (Companies) ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS accounts (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT    NOT NULL,
    industry      TEXT,
    type          TEXT    DEFAULT 'prospect', -- prospect, customer, partner, ex-customer
    status        TEXT    DEFAULT 'active',   -- active, inactive
    website       TEXT,
    phone         TEXT,
    email         TEXT,
    address       TEXT,
    city          TEXT,
    country       TEXT    DEFAULT 'Colombia',
    employees     INTEGER,
    annual_revenue REAL,
    owner_id      INTEGER REFERENCES users(id),
    description   TEXT,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── 3. CONTACTS ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS contacts (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name      TEXT    NOT NULL,
    last_name       TEXT    NOT NULL,
    email           TEXT,
    phone           TEXT,
    mobile          TEXT,
    job_title       TEXT,
    department      TEXT,
    account_id      INTEGER REFERENCES accounts(id) ON DELETE SET NULL,
    owner_id        INTEGER REFERENCES users(id),
    status          TEXT    DEFAULT 'active',  -- active, inactive
    lead_score      INTEGER DEFAULT 0,          -- 0-100
    linkedin_url    TEXT,
    twitter_handle  TEXT,
    address         TEXT,
    city            TEXT,
    country         TEXT,
    birthdate       DATE,
    do_not_call     BOOLEAN DEFAULT 0,
    do_not_email    BOOLEAN DEFAULT 0,
    notes           TEXT,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── 4. LEADS ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS leads (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name      TEXT    NOT NULL,
    last_name       TEXT    NOT NULL,
    email           TEXT,
    phone           TEXT,
    company         TEXT,
    job_title       TEXT,
    source          TEXT,   -- website, linkedin, referral, cold-call, event, email
    status          TEXT    DEFAULT 'new',  -- new, contacted, qualified, converted, disqualified
    score           INTEGER DEFAULT 0,
    owner_id        INTEGER REFERENCES users(id),
    campaign_id     INTEGER REFERENCES campaigns(id) ON DELETE SET NULL,
    notes           TEXT,
    converted_at    DATETIME,
    contact_id      INTEGER REFERENCES contacts(id),  -- after conversion
    account_id      INTEGER REFERENCES accounts(id),
    opportunity_id  INTEGER REFERENCES opportunities(id),
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── 5. OPPORTUNITIES ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS opportunities (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT    NOT NULL,
    account_id      INTEGER REFERENCES accounts(id),
    contact_id      INTEGER REFERENCES contacts(id),
    owner_id        INTEGER REFERENCES users(id),
    stage           TEXT    NOT NULL DEFAULT 'prospecting',
                    -- prospecting, qualification, proposal, negotiation, closed_won, closed_lost
    amount          REAL    DEFAULT 0,
    probability     INTEGER DEFAULT 0,  -- 0-100
    expected_close  DATE,
    closed_at       DATE,
    lost_reason     TEXT,
    description     TEXT,
    lead_source     TEXT,
    next_step       TEXT,
    forecast_cat    TEXT    DEFAULT 'pipeline',  -- pipeline, best_case, commit, closed
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── 6. ACTIVITIES ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS activities (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    type            TEXT    NOT NULL,  -- call, email, meeting, task, note
    title           TEXT    NOT NULL,
    description     TEXT,
    status          TEXT    DEFAULT 'pending',  -- pending, completed, cancelled
    priority        TEXT    DEFAULT 'medium',   -- low, medium, high, urgent
    due_date        DATETIME,
    completed_at    DATETIME,
    duration_min    INTEGER,
    owner_id        INTEGER REFERENCES users(id),
    contact_id      INTEGER REFERENCES contacts(id),
    account_id      INTEGER REFERENCES accounts(id),
    opportunity_id  INTEGER REFERENCES opportunities(id),
    lead_id         INTEGER REFERENCES leads(id),
    ticket_id       INTEGER REFERENCES support_tickets(id),
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── 7. PRODUCTS ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS products (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    code            TEXT    UNIQUE,
    name            TEXT    NOT NULL,
    description     TEXT,
    category        TEXT,
    unit_price      REAL    NOT NULL DEFAULT 0,
    cost            REAL    DEFAULT 0,
    currency        TEXT    DEFAULT 'COP',
    tax_rate        REAL    DEFAULT 0.19,  -- 19% IVA
    is_active       BOOLEAN DEFAULT 1,
    stock_type      TEXT    DEFAULT 'unlimited',  -- unlimited, tracked
    stock_quantity  INTEGER,
    sku             TEXT,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── 8. QUOTES ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS quotes (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    number          TEXT    UNIQUE NOT NULL,   -- COT-2026-001
    account_id      INTEGER REFERENCES accounts(id),
    contact_id      INTEGER REFERENCES contacts(id),
    opportunity_id  INTEGER REFERENCES opportunities(id),
    owner_id        INTEGER REFERENCES users(id),
    status          TEXT    DEFAULT 'draft',  -- draft, sent, reviewing, negotiating, accepted, rejected
    issue_date      DATE    NOT NULL DEFAULT CURRENT_DATE,
    expiry_date     DATE,
    subtotal        REAL    DEFAULT 0,
    discount_pct    REAL    DEFAULT 0,
    discount_amount REAL    DEFAULT 0,
    tax_amount      REAL    DEFAULT 0,
    total           REAL    DEFAULT 0,
    currency        TEXT    DEFAULT 'COP',
    notes           TEXT,
    terms           TEXT,
    probability     INTEGER DEFAULT 50,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quote_items (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    quote_id        INTEGER NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    product_id      INTEGER REFERENCES products(id),
    description     TEXT,
    quantity        REAL    NOT NULL DEFAULT 1,
    unit_price      REAL    NOT NULL DEFAULT 0,
    discount_pct    REAL    DEFAULT 0,
    tax_rate        REAL    DEFAULT 0.19,
    total           REAL    NOT NULL DEFAULT 0,
    sort_order      INTEGER DEFAULT 0
);

-- ─── 9. INVOICES ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS invoices (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    number          TEXT    UNIQUE NOT NULL,   -- FAC-2026-001
    quote_id        INTEGER REFERENCES quotes(id),
    account_id      INTEGER REFERENCES accounts(id),
    contact_id      INTEGER REFERENCES contacts(id),
    owner_id        INTEGER REFERENCES users(id),
    status          TEXT    DEFAULT 'pending',  -- pending, partial, paid, overdue, cancelled
    issue_date      DATE    NOT NULL DEFAULT CURRENT_DATE,
    due_date        DATE,
    paid_date       DATE,
    subtotal        REAL    DEFAULT 0,
    discount_amount REAL    DEFAULT 0,
    tax_amount      REAL    DEFAULT 0,
    total           REAL    DEFAULT 0,
    amount_paid     REAL    DEFAULT 0,
    currency        TEXT    DEFAULT 'COP',
    payment_method  TEXT,
    notes           TEXT,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoice_items (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_id      INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    product_id      INTEGER REFERENCES products(id),
    description     TEXT,
    quantity        REAL    NOT NULL DEFAULT 1,
    unit_price      REAL    NOT NULL DEFAULT 0,
    discount_pct    REAL    DEFAULT 0,
    tax_rate        REAL    DEFAULT 0.19,
    total           REAL    NOT NULL DEFAULT 0,
    sort_order      INTEGER DEFAULT 0
);

-- ─── 10. CAMPAIGNS ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS campaigns (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT    NOT NULL,
    type            TEXT    NOT NULL,  -- email, social, ppc, event, webinar, sms, direct_mail
    status          TEXT    DEFAULT 'draft',  -- draft, active, paused, completed, cancelled
    owner_id        INTEGER REFERENCES users(id),
    start_date      DATE,
    end_date        DATE,
    budget          REAL    DEFAULT 0,
    actual_cost     REAL    DEFAULT 0,
    description     TEXT,
    goal            TEXT,
    target_leads    INTEGER DEFAULT 0,
    -- Metrics (updated by sync/analytics)
    sent_count      INTEGER DEFAULT 0,
    open_count      INTEGER DEFAULT 0,
    click_count     INTEGER DEFAULT 0,
    conversion_count INTEGER DEFAULT 0,
    revenue_generated REAL  DEFAULT 0,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS campaign_contacts (
    campaign_id     INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
    contact_id      INTEGER REFERENCES contacts(id) ON DELETE CASCADE,
    status          TEXT    DEFAULT 'subscribed',  -- subscribed, sent, opened, clicked, converted, unsubscribed
    added_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (campaign_id, contact_id)
);

-- ─── 11. SUPPORT TICKETS ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS support_tickets (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    number          TEXT    UNIQUE NOT NULL,  -- TKT-0001
    subject         TEXT    NOT NULL,
    description     TEXT,
    account_id      INTEGER REFERENCES accounts(id),
    contact_id      INTEGER REFERENCES contacts(id),
    agent_id        INTEGER REFERENCES users(id),
    status          TEXT    DEFAULT 'open',     -- open, in_progress, waiting, resolved, closed
    priority        TEXT    DEFAULT 'medium',   -- low, medium, high, critical
    type            TEXT    DEFAULT 'inquiry',  -- bug, incident, request, inquiry, improvement
    category        TEXT,
    source          TEXT    DEFAULT 'email',    -- email, phone, web, chat
    first_response_at DATETIME,
    resolved_at     DATETIME,
    closed_at       DATETIME,
    satisfaction    INTEGER,  -- 1-5 CSAT score
    sla_breach      BOOLEAN DEFAULT 0,
    tags            TEXT,     -- JSON array
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ticket_comments (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id       INTEGER NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    user_id         INTEGER REFERENCES users(id),
    body            TEXT    NOT NULL,
    is_internal     BOOLEAN DEFAULT 0,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── 12. DOCUMENTS ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS documents (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT    NOT NULL,
    file_path       TEXT    NOT NULL,
    file_size       INTEGER,
    mime_type       TEXT,
    type            TEXT,  -- contract, proposal, presentation, template, manual, report
    access          TEXT    DEFAULT 'team',  -- private, team, public
    owner_id        INTEGER REFERENCES users(id),
    account_id      INTEGER REFERENCES accounts(id),
    contact_id      INTEGER REFERENCES contacts(id),
    opportunity_id  INTEGER REFERENCES opportunities(id),
    description     TEXT,
    tags            TEXT,            -- JSON array
    expiry_date     DATE,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── 13. NOTES ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notes (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    body            TEXT    NOT NULL,
    owner_id        INTEGER REFERENCES users(id),
    contact_id      INTEGER REFERENCES contacts(id),
    account_id      INTEGER REFERENCES accounts(id),
    opportunity_id  INTEGER REFERENCES opportunities(id),
    lead_id         INTEGER REFERENCES leads(id),
    ticket_id       INTEGER REFERENCES support_tickets(id),
    is_pinned       BOOLEAN DEFAULT 0,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── 14. TAGS ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS tags (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL UNIQUE,
    color TEXT DEFAULT '#1a3d6b'
);

CREATE TABLE IF NOT EXISTS contact_tags (
    contact_id INTEGER REFERENCES contacts(id) ON DELETE CASCADE,
    tag_id     INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (contact_id, tag_id)
);

-- ─── 15. EMAIL LOG ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS email_log (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    direction       TEXT    NOT NULL,  -- inbound, outbound
    subject         TEXT,
    body            TEXT,
    from_email      TEXT,
    to_email        TEXT,
    status          TEXT    DEFAULT 'sent',  -- draft, sent, delivered, opened, bounced, failed
    owner_id        INTEGER REFERENCES users(id),
    contact_id      INTEGER REFERENCES contacts(id),
    account_id      INTEGER REFERENCES accounts(id),
    campaign_id     INTEGER REFERENCES campaigns(id),
    sent_at         DATETIME,
    opened_at       DATETIME,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── 16. SYSTEM SETTINGS ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS settings (
    key         TEXT PRIMARY KEY,
    value       TEXT,
    description TEXT,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── 17. AUDIT LOG ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS audit_log (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER REFERENCES users(id),
    action      TEXT    NOT NULL,   -- create, update, delete, login, export
    entity      TEXT    NOT NULL,   -- contacts, opportunities, etc.
    entity_id   INTEGER,
    ip_address  TEXT,
    user_agent  TEXT,
    old_values  TEXT,               -- JSON
    new_values  TEXT,               -- JSON
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── INDEXES ─────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_contacts_account        ON contacts(account_id);
CREATE INDEX IF NOT EXISTS idx_contacts_owner          ON contacts(owner_id);
CREATE INDEX IF NOT EXISTS idx_contacts_email          ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_leads_owner             ON leads(owner_id);
CREATE INDEX IF NOT EXISTS idx_leads_status            ON leads(status);
CREATE INDEX IF NOT EXISTS idx_opportunities_account   ON opportunities(account_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_owner     ON opportunities(owner_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_stage     ON opportunities(stage);
CREATE INDEX IF NOT EXISTS idx_activities_owner        ON activities(owner_id);
CREATE INDEX IF NOT EXISTS idx_activities_due_date     ON activities(due_date);
CREATE INDEX IF NOT EXISTS idx_activities_contact      ON activities(contact_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_agent   ON support_tickets(agent_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status  ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_invoices_account        ON invoices(account_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status         ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity        ON audit_log(entity, entity_id);
CREATE INDEX IF NOT EXISTS idx_email_log_contact       ON email_log(contact_id);

-- ─── DEFAULT DATA ─────────────────────────────────────────────────────────────

INSERT OR IGNORE INTO roles (name, permissions) VALUES
  ('admin',     '["all"]'),
  ('manager',   '["read_all","write_all","delete_own","reports","team_view"]'),
  ('sales',     '["read_own","write_own","leads","opportunities","contacts","accounts","activities","quotes","invoices"]'),
  ('support',   '["tickets","contacts","accounts","read_own"]'),
  ('marketing', '["campaigns","leads","contacts","read_all"]'),
  ('readonly',  '["read_all"]');

INSERT OR IGNORE INTO settings (key, value, description) VALUES
  ('company_name',    'Mi Empresa S.A.',    'Nombre de la empresa'),
  ('company_nit',     '900.123.456-7',      'NIT o RUT'),
  ('country',         'Colombia',           'País de operación'),
  ('currency',        'COP',                'Moneda predeterminada'),
  ('timezone',        'America/Bogota',     'Zona horaria'),
  ('tax_rate',        '0.19',               'IVA por defecto (19%)'),
  ('lead_scoring',    '1',                  'Habilitar puntuación de leads'),
  ('sla_response_h',  '4',                  'SLA primera respuesta (horas)'),
  ('sla_resolve_h',   '24',                 'SLA resolución (horas)'),
  ('pipeline_stages', '["Prospección","Calificación","Propuesta","Negociación","Ganado"]', 'Etapas del pipeline');
