-- Prince Plaza / Shahad Group multi-property hotel platform
-- Run once when Supabase is provisioned. Schema is multi-tenant from day one.

create extension if not exists "uuid-ossp";

-- ─── HOTELS ─────────────────────────────────────────────────────────────
create table if not exists hotels (
  id              text primary key,             -- e.g. "prince-plaza-kassala"
  name_en         text not null,
  name_ar         text not null,
  city_en         text not null,
  city_ar         text not null,
  country_en      text not null default 'Sudan',
  country_ar      text not null default 'السودان',
  timezone        text not null default 'Africa/Khartoum',
  currency        text not null default 'USD',
  whatsapp        text not null,
  phone           text not null,
  email           text not null,
  brand_colour    text,
  logo_url        text,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);

-- ─── ROOM TYPES ─────────────────────────────────────────────────────────
create table if not exists room_types (
  id              text primary key,             -- e.g. "royal"
  hotel_id        text not null references hotels(id) on delete cascade,
  name_en         text not null,
  name_ar         text not null,
  short_name_en   text not null,
  short_name_ar   text not null,
  view_en         text not null,
  view_ar         text not null,
  description_en  text not null,
  description_ar  text not null,
  capacity        int  not null default 2,
  sqm             int  not null default 0,
  base_price      numeric(10,2) not null default 0,
  currency        text not null default 'USD',
  total_units     int  not null default 1,
  image_url       text,
  created_at      timestamptz not null default now()
);
create index if not exists idx_room_types_hotel on room_types(hotel_id);

-- ─── PHYSICAL ROOMS ─────────────────────────────────────────────────────
create table if not exists rooms (
  id              uuid primary key default uuid_generate_v4(),
  hotel_id        text not null references hotels(id) on delete cascade,
  room_type_id    text not null references room_types(id) on delete cascade,
  number          text not null,                 -- "201", "Villa-3"
  floor           text,
  current_status  text not null default 'clean'
                    check (current_status in ('clean','dirty','occupied','maintenance','blocked')),
  notes           text,
  created_at      timestamptz not null default now(),
  unique (hotel_id, number)
);
create index if not exists idx_rooms_hotel on rooms(hotel_id);

-- ─── RATE OVERRIDES (per-day pricing) ───────────────────────────────────
create table if not exists rate_overrides (
  id              uuid primary key default uuid_generate_v4(),
  room_type_id    text not null references room_types(id) on delete cascade,
  date            date not null,
  rate            numeric(10,2) not null,
  reason          text,
  created_at      timestamptz not null default now(),
  unique (room_type_id, date)
);

-- ─── AVAILABILITY BLOCKS (maintenance / blackouts) ──────────────────────
create table if not exists availability_blocks (
  id              uuid primary key default uuid_generate_v4(),
  room_id         uuid not null references rooms(id) on delete cascade,
  start_date      date not null,
  end_date        date not null,
  reason          text,
  created_at      timestamptz not null default now()
);

-- ─── ADD-ONS ────────────────────────────────────────────────────────────
create table if not exists addons (
  id              text primary key,
  hotel_id        text not null references hotels(id) on delete cascade,
  name_en         text not null,
  name_ar         text not null,
  description_en  text,
  description_ar  text,
  category        text not null
                    check (category in ('transport','experience','dining','wellness','catering','av','events')),
  price           numeric(10,2) not null default 0,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);
create index if not exists idx_addons_hotel on addons(hotel_id);

-- ─── GUESTS (cross-property profile) ────────────────────────────────────
create table if not exists guests (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  email           text not null,
  phone           text not null,
  language        text not null default 'en',
  notes           text,
  total_stays     int  not null default 0,
  last_stay_at    timestamptz,
  created_at      timestamptz not null default now()
);
create index if not exists idx_guests_email on guests(email);

-- ─── BOOKINGS ───────────────────────────────────────────────────────────
create table if not exists bookings (
  id                  uuid primary key default uuid_generate_v4(),
  reference           text not null unique,        -- "PP-2026-00142"
  hotel_id            text not null references hotels(id) on delete restrict,
  room_type_id        text not null references room_types(id) on delete restrict,
  assigned_room_id    uuid references rooms(id) on delete set null,
  guest_id            uuid references guests(id) on delete set null,
  guest_name          text not null,
  guest_email         text not null,
  guest_phone         text not null,
  guest_language      text not null default 'en',
  check_in            date not null,
  check_out           date not null,
  nights              int  not null,
  num_guests          int  not null default 1,
  base_total          numeric(10,2) not null default 0,
  addons_total        numeric(10,2) not null default 0,
  grand_total         numeric(10,2) not null default 0,
  currency            text not null default 'USD',
  status              text not null default 'pending'
                        check (status in ('pending','confirmed','checked_in','checked_out','cancelled','no_show')),
  special_requests    text,
  internal_notes      text,
  whatsapp_opened_at  timestamptz,
  confirmed_at        timestamptz,
  confirmed_by_staff  uuid,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index if not exists idx_bookings_hotel        on bookings(hotel_id);
create index if not exists idx_bookings_dates        on bookings(check_in, check_out);
create index if not exists idx_bookings_status       on bookings(status);
create index if not exists idx_bookings_email        on bookings(guest_email);

create table if not exists booking_addons (
  booking_id      uuid not null references bookings(id) on delete cascade,
  addon_id        text not null references addons(id) on delete restrict,
  quantity        int  not null default 1,
  unit_price      numeric(10,2) not null,
  primary key (booking_id, addon_id)
);

-- ─── STAFF ──────────────────────────────────────────────────────────────
create table if not exists staff (
  id              uuid primary key default uuid_generate_v4(),
  auth_user_id    uuid unique,                  -- Supabase Auth user id
  name            text not null,
  email           text not null unique,
  role            text not null default 'front_desk'
                    check (role in ('admin','manager','front_desk')),
  hotel_ids       text[] not null default '{}',
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);

-- ─── RLS — multi-tenant isolation ───────────────────────────────────────
alter table hotels              enable row level security;
alter table room_types          enable row level security;
alter table rooms               enable row level security;
alter table rate_overrides      enable row level security;
alter table availability_blocks enable row level security;
alter table addons              enable row level security;
alter table guests              enable row level security;
alter table bookings            enable row level security;
alter table booking_addons      enable row level security;
alter table staff               enable row level security;

-- Public can read active hotels + their room types + active add-ons (for the booking widget).
create policy "public reads hotels"     on hotels      for select using (active = true);
create policy "public reads room_types" on room_types  for select using (true);
create policy "public reads addons"     on addons      for select using (active = true);

-- Anyone can create a pending booking (the public widget).
create policy "public creates bookings" on bookings    for insert with check (status = 'pending');
create policy "public creates booking_addons" on booking_addons for insert with check (true);

-- Staff can do everything within their hotel scope.
-- (Replace `auth.uid()` resolution below with your own helper if you have one.)
create or replace function staff_hotel_ids() returns text[] language sql security definer as $$
  select coalesce(hotel_ids, '{}') from staff where auth_user_id = auth.uid() and active = true limit 1;
$$;

create or replace function staff_role() returns text language sql security definer as $$
  select role from staff where auth_user_id = auth.uid() and active = true limit 1;
$$;

-- Admin sees everything; managers and front desk see only their hotels.
create policy "staff manage bookings"    on bookings
  for all using (
    staff_role() = 'admin'
    or hotel_id = any(staff_hotel_ids())
  );
create policy "staff manage rooms"       on rooms
  for all using (
    staff_role() = 'admin'
    or hotel_id = any(staff_hotel_ids())
  );
create policy "staff manage room_types"  on room_types
  for all using (
    staff_role() = 'admin'
    or hotel_id = any(staff_hotel_ids())
  );
create policy "staff manage addons"      on addons
  for all using (
    staff_role() = 'admin'
    or hotel_id = any(staff_hotel_ids())
  );
create policy "staff manage rate_overrides" on rate_overrides
  for all using (true);
create policy "staff manage availability_blocks" on availability_blocks
  for all using (true);
create policy "staff manage hotels" on hotels
  for all using (staff_role() = 'admin');
create policy "staff manage staff"  on staff
  for all using (staff_role() = 'admin');
create policy "staff manage guests" on guests
  for all using (
    staff_role() in ('admin','manager','front_desk')
  );

-- ─── SEED — Prince Plaza Kassala starter data ───────────────────────────
insert into hotels (id, name_en, name_ar, city_en, city_ar, whatsapp, phone, email)
  values
  ('prince-plaza-kassala','Prince Plaza Kassala','برنس بلازا كسلا','Kassala','كسلا',
   '+249000000000','+249000000000','reservations@princeplaza.sd')
  on conflict (id) do nothing;

insert into room_types (id, hotel_id, name_en, name_ar, short_name_en, short_name_ar,
  view_en, view_ar, description_en, description_ar, capacity, sqm, base_price, total_units, image_url)
values
  ('royal','prince-plaza-kassala','Royal Suite','الجناح الملكي','Royal','ملكي',
   'Mountain or garden view','إطلالة على الجبال أو الحديقة',
   'King bed, private balcony, 24-hour butler service, marble bath, handwoven Sudanese textiles.',
   'سرير كينغ، شرفة خاصة، خدمة باتلر على مدار الساعة، حمام رخامي، أقمشة سودانية منسوجة يدويًا.',
   2, 65, 380, 12, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304'),
  ('presidential','prince-plaza-kassala','Presidential Suite','الجناح الرئاسي','Presidential','رئاسي',
   'Panoramic Taka view','إطلالة بانورامية على التاكا',
   'Two bedrooms, formal dining for eight, private terrace, dedicated butler. The flagship.',
   'غرفتا نوم، صالة طعام تتسع لثمانية، شرفة خاصة، باتلر مخصص. الجناح الرائد.',
   4, 140, 720, 4, 'https://images.unsplash.com/photo-1582719508461-905c673771fd'),
  ('garden-villa','prince-plaza-kassala','Garden Villa','فيلا الحديقة','Villa','فيلا',
   'Walled private garden','حديقة خاصة بسور',
   'Two to four bedrooms, fully furnished, walled private garden, optional private chef.',
   'غرفتان إلى أربع غرف نوم، مؤثثة بالكامل، حديقة خاصة بسور، طاهٍ خاص عند الطلب.',
   6, 220, 920, 6, 'https://images.unsplash.com/photo-1613553474179-e1eda3ea5734')
on conflict (id) do nothing;

insert into addons (id, hotel_id, name_en, name_ar, category, price) values
  ('airport-transfer',    'prince-plaza-kassala','Airport Transfer · Kassala','نقل من المطار · كسلا','transport',80),
  ('khartoum-transfer',   'prince-plaza-kassala','Airport Transfer · Khartoum','نقل من المطار · الخرطوم','transport',240),
  ('mountain-sunrise',    'prince-plaza-kassala','Sunrise Tour · Taka Mountains','جولة الشروق · جبال التاكا','experience',120),
  ('private-chef',        'prince-plaza-kassala','Private Chef''s Table','طاولة الشيف الخاصة','dining',240),
  ('catering-package',    'prince-plaza-kassala','Event Catering Package','باقة تموين المناسبات','catering',320),
  ('wellness-day',        'prince-plaza-kassala','Wellness & Spa Day','يوم العافية والسبا','wellness',180),
  ('oud-evening',         'prince-plaza-kassala','Live Oud at Dinner','عزف العود في العشاء','experience',95)
on conflict (id) do nothing;
