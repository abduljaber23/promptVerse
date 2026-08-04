# 🗄️ Modèle Logique des Données (MLD - Merise Optimisé)

## 📐 Description des Tables du MLD

- **USER** (<u>id</u>, email, password, username, role, status, balance, is_email_verified, email_verified_at, verification_token, verification_token_expires_at, reset_password_token, reset_password_token_expires_at, stripe_customer_id, stripe_account_id, stripe_onboarding_complete, last_login_at, deleted_at, created_at, updated_at)
- **USER_PROFILE** (<u>id</u>, avatar, bio, updated_at, *#user_id*)
  - *FK* `user_id` référence `USER(id)` (Relation 1:1 UNIQUE)
- **SOCIAL_LINK** (<u>id</u>, platform, url, *#profile_id*)
  - *FK* `profile_id` référence `USER_PROFILE(id)` (Relation 1:N, ON DELETE CASCADE)
- **AI_TOOL** (<u>id</u>, name, slug, icon_url)
- **CATEGORY** (<u>id</u>, name, slug, icon_url)
- **PROMPT** (<u>id</u>, title, slug, description, prompt_content, preview_result, cover_image, price, sales_count, views_count, favorites_count, average_rating, is_featured, status, published_at, created_at, updated_at, *#user_id*, *#category_id*, *#ai_tool_id*)
  - *FK* `user_id` référence `USER(id)` (Vendeur)
  - *FK* `category_id` référence `CATEGORY(id)`
  - *FK* `ai_tool_id` référence `AI_TOOL(id)`
- **PREVIEW_IMAGE** (<u>id</u>, url, sort_order, *#prompt_id*)
  - *FK* `prompt_id` référence `PROMPT(id)` (ON DELETE CASCADE)
- **ORDER** (<u>id</u>, total_amount, status, stripe_session_id, stripe_payment_intent_id, paid_at, created_at, *#user_id*)
  - *FK* `user_id` référence `USER(id)` (Acheteur)
- **ORDER_ITEM** (<u>id</u>, prompt_title, seller_id, price_at_purchase, *#order_id*, *#prompt_id*)
  - *FK* `order_id` référence `ORDER(id)` (ON DELETE CASCADE)
  - *FK* `prompt_id` référence `PROMPT(id)`
- **CART_ITEM** (<u>id</u>, added_at, *#user_id*, *#prompt_id*)
  - *FK* `user_id` référence `USER(id)`
  - *FK* `prompt_id` référence `PROMPT(id)`
  - *Constraint* `UNIQUE(user_id, prompt_id)`
- **WISHLIST_ITEM** (<u>id</u>, added_at, *#user_id*, *#prompt_id*)
  - *FK* `user_id` référence `USER(id)`
  - *FK* `prompt_id` référence `PROMPT(id)`
  - *Constraint* `UNIQUE(user_id, prompt_id)`
- **REVIEW** (<u>id</u>, rating, comment, created_at, *#user_id*, *#prompt_id*)
  - *FK* `user_id` référence `USER(id)`
  - *FK* `prompt_id` référence `PROMPT(id)`
  - *Constraint* `UNIQUE(user_id, prompt_id)`
- **PAYOUT** (<u>id</u>, amount, status, stripe_transfer_id, requested_at, processed_at, *#user_id*)
  - *FK* `user_id` référence `USER(id)`
