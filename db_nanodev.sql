--Users ( ID, Name, Email, Password, CreatedAt, UserType['sme', 'influencer', 'admin'])
--Influencers ( ID, UserID, FollowersCount, EngagamentRate, Niche, Price per Post, Etc)
--Orders ( ID, InfluencerID, SMEID, OrderStatus['pending', 'completed', 'TotalPrice'], CreatedAt)
--Review ( ID, OrderID, Rating, Comment, CreatedAt)

-- Database: NanoDev - Influencer Marketing Platform
-- Type: PostgreSQL/Supabase
-- Created: 2026-02-06

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- Table: Users
-- Description: Main user table for SMEs, Influencers, and Admins
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('sme', 'influencer', 'admin')),
    phone VARCHAR(20),
    profile_picture_url TEXT,
    location VARCHAR(255),
    website_url TEXT,
    bio TEXT,
    company_name VARCHAR(255),
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    verification_token VARCHAR(255),
    last_login TIMESTAMP WITH TIME ZONE,
    total_reviews INTEGER DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_is_verified ON users(is_verified);

-- ============================================================
-- Table: Influencers
-- Description: Detailed profiles for influencer users
-- ============================================================
CREATE TABLE IF NOT EXISTS influencers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    followers_count INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5, 2) DEFAULT 0.00,
    niche VARCHAR(100) NOT NULL,
    price_per_post DECIMAL(10, 2) NOT NULL,
    primary_platform VARCHAR(50) NOT NULL,
    platform_username VARCHAR(255) NOT NULL,
    platforms_json JSONB DEFAULT '{"platforms": []}',
    is_verified BOOLEAN DEFAULT false,
    verification_date TIMESTAMP WITH TIME ZONE,
    total_collaborations INTEGER DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, primary_platform)
);

-- Create indexes
CREATE INDEX idx_influencers_user_id ON influencers(user_id);
CREATE INDEX idx_influencers_is_verified ON influencers(is_verified);
CREATE INDEX idx_influencers_niche ON influencers(niche);
CREATE INDEX idx_influencers_platform ON influencers(primary_platform);

-- ============================================================
-- Table: Orders
-- Description: Collaboration orders between SMEs and Influencers
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    influencer_id UUID NOT NULL REFERENCES influencers(id) ON DELETE CASCADE,
    sme_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
    total_price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    content_requirements TEXT,
    hashtags TEXT,
    post_date DATE,
    published_url TEXT,
    deliverables_json JSONB DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX idx_orders_influencer_id ON orders(influencer_id);
CREATE INDEX idx_orders_sme_id ON orders(sme_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_post_date ON orders(post_date);

-- ============================================================
-- Table: Reviews
-- Description: Reviews and ratings for completed orders
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewed_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating_quality INTEGER CHECK (rating_quality >= 1 AND rating_quality <= 5),
    rating_communication INTEGER CHECK (rating_communication >= 1 AND rating_communication <= 5),
    rating_delivery INTEGER CHECK (rating_delivery >= 1 AND rating_delivery <= 5),
    overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
    comment TEXT,
    is_verified_purchase BOOLEAN DEFAULT true,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(order_id, reviewer_id)
);

-- Create indexes
CREATE INDEX idx_reviews_order_id ON reviews(order_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_reviews_reviewed_user_id ON reviews(reviewed_user_id);
CREATE INDEX idx_reviews_overall_rating ON reviews(overall_rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);

-- ============================================================
-- SAMPLE DATA
-- ============================================================

-- Sample Users (1 admin + 2 SME + 2 influencer)
INSERT INTO users (id, name, email, password, user_type, phone, profile_picture_url, location, website_url, bio, company_name, is_verified, is_active, last_login) VALUES
('550e8400-e29b-41d4-a716-446655440001'::uuid, 'Admin NanoDev', 'admin@nanodev.com', '$2b$10$xyzHashedPassword123', 'admin', '+62812345678', 'https://cdn.example.com/avatar/admin.jpg', 'Jakarta, Indonesia', 'https://nanodev.com', 'Platform Administrator', 'NanoDev Inc', true, true, '2026-02-06 14:30:00+07'),
('550e8400-e29b-41d4-a716-446655440002'::uuid, 'PT TechStartup Indonesia', 'owner@techstartup.com', '$2b$10$xyzHashedPassword456', 'sme', '+62812345679', 'https://cdn.example.com/avatar/techstartup.jpg', 'Bandung, Indonesia', 'https://techstartup.co.id', 'Leading tech product company focused on innovative solutions', 'PT TechStartup Indonesia', true, true, '2026-02-05 10:15:00+07'),
('550e8400-e29b-41d4-a716-446655440003'::uuid, 'Budi Santoso', 'budi@example.com', '$2b$10$xyzHashedPassword789', 'influencer', '+62812345680', 'https://cdn.example.com/avatar/budi.jpg', 'Jakarta, Indonesia', 'https://buditechblog.com', 'Tech enthusiast, gadget reviewer, and digital content creator. Passionate about technology trends and product innovation.', NULL, true, true, '2026-02-06 09:45:00+07'),
('550e8400-e29b-41d4-a716-446655440004'::uuid, 'Siti Nurhaliza Fashion', 'siti@example.com', '$2b$10$xyzHashedPassword101', 'influencer', '+62812345681', 'https://cdn.example.com/avatar/siti.jpg', 'Surabaya, Indonesia', 'https://sitiashion.id', 'Fashion & lifestyle enthusiast sharing style tips, trends, and shopping guides with a focus on sustainable fashion.', NULL, false, true, '2026-02-04 16:20:00+07'),
('550e8400-e29b-41d4-a716-446655440005'::uuid, 'Ahmad Digital Marketing', 'ahmad@example.com', '$2b$10$xyzHashedPassword202', 'sme', '+62812345682', 'https://cdn.example.com/avatar/ahmad.jpg', 'Surabaya, Indonesia', 'https://ahmadmarketingagency.com', 'Full-service digital marketing strategy and execution', 'Ahmad Marketing Agency', true, true, '2026-02-03 13:50:00+07');

-- Sample Influencers (5 records with unique user_id + platform combinations)
INSERT INTO influencers (id, user_id, followers_count, engagement_rate, niche, price_per_post, primary_platform, platform_username, is_verified, verification_date, total_collaborations, average_rating) VALUES
('650e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 125000, 8.50, 'Technology', 2500000.00, 'Instagram', '@budi_tech_id', true, '2025-06-15 10:00:00+07', 12, 4.75),
('650e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, 89000, 7.25, 'Fashion', 1800000.00, 'Instagram', '@siti_fashion_id', false, NULL, 8, 4.50),
('650e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 75000, 7.80, 'Technology', 1800000.00, 'TikTok', '@budi_gadget_reviews', true, '2025-09-20 14:30:00+07', 5, 4.60),
('650e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, 156000, 8.90, 'Fashion', 2200000.00, 'TikTok', '@siti_style_tips', true, '2025-07-10 08:45:00+07', 15, 4.82),
('650e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 45000, 6.75, 'Digital Marketing', 1500000.00, 'LinkedIn', 'ahmad-digital-marketing', false, NULL, 3, 4.33);

-- Sample Orders (5 records with different statuses)
INSERT INTO orders (id, influencer_id, sme_id, order_status, total_price, description, content_requirements, hashtags, post_date, published_url, notes) VALUES
('750e8400-e29b-41d4-a716-446655440001'::uuid, '650e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 'completed', 2500000.00, 'Product review - Tech gadget promotion', '2-3 Instagram posts with carousel format showcasing product features and user experience', '#tech #gadget #innovation #indonesia', '2026-01-15', 'https://instagram.com/p/example123', 'Client very satisfied with engagement metrics'),
('750e8400-e29b-41d4-a716-446655440002'::uuid, '650e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'accepted', 1800000.00, 'Fashion collection showcase', 'Reels and feed posts featuring fashion items, styling tips', '#fashion #style #ootd #blogger', '2026-02-20', NULL, 'Content guidelines approved, awaiting publication'),
('750e8400-e29b-41d4-a716-446655440003'::uuid, '650e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 'pending', 1800000.00, 'TikTok viral campaign - Tech product hands-on review', 'Short-form video content (15-30 seconds) with product unboxing and first impressions', '#fyp #viral #techreview #gadget', '2026-03-01', NULL, 'Waiting for influencer confirmation and content planning'),
('750e8400-e29b-41d4-a716-446655440004'::uuid, '650e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'cancelled', 2200000.00, 'Fashion trend collaboration series', 'Multi-part content series', '#trend #fashion #collaboration', '2026-02-25', NULL, 'Cancelled due to schedule conflict - both parties agreed'),
('750e8400-e29b-41d4-a716-446655440005'::uuid, '650e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 'in_progress', 2500000.00, 'Instagram Stories & Feed campaign', 'Daily stories for 1 week + 2 feed posts with product integration', '#tech #instastory #dailycontent', '2026-02-18', NULL, 'Posting schedule to start next week');

-- Sample Reviews (5 records with detailed ratings)
INSERT INTO reviews (id, order_id, reviewer_id, reviewed_user_id, rating_quality, rating_communication, rating_delivery, overall_rating, comment, is_verified_purchase, helpful_count) VALUES
('850e8400-e29b-41d4-a716-446655440001'::uuid, '750e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 5, 5, 5, 5, 'Excellent work! Budi created outstanding content that perfectly captured our product features. Very professional, great engagement metrics, and highly responsive communication throughout. Highly recommended!', true, 24),
('850e8400-e29b-41d4-a716-446655440002'::uuid, '750e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 4, 5, 4, 4, 'Very satisfied with Budi collaboration! Content quality was exceptional and engagement exceeded expectations. Minor suggestion: could have posted one day earlier as agreed, but overall fantastic work.', true, 18),
('850e8400-e29b-41d4-a716-446655440003'::uuid, '750e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 5, 5, 5, 5, 'Outstanding collaboration experience! Perfect engagement rate, professional response to all feedback, and excellent content delivery. Siti is truly a top-tier content creator. Will definitely work with again!', true, 32),
('850e8400-e29b-41d4-a716-446655440004'::uuid, '750e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, 3, 4, 3, 3, 'Had to cancel collaboration due to scheduling conflict. Both parties handled it professionally. No fault on either side - timing just did not work out. Would consider working together in future when schedules align.', true, 8),
('850e8400-e29b-41d4-a716-446655440005'::uuid, '750e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 5, 5, 4, 5, 'Outstanding campaign results! Exceeded our expectations in terms of engagement and audience interaction. Budi maintained excellent communication throughout and delivered high-quality content. Very impressed with the TikTok strategy!', true, 41);

-- ============================================================
-- COMMIT
-- ============================================================
COMMIT;
