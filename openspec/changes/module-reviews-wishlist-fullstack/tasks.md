## 1. Backend Implementation

- [ ] 1.1 Create `Review` and `WishlistItem` TypeORM entities with `UNIQUE(user_id, prompt_id)` constraints.
- [ ] 1.2 Implement `WishlistModule` (`GET /wishlist`, `POST /wishlist/toggle`).
- [ ] 1.3 Implement `ReviewsModule` (`POST /reviews`).
- [ ] 1.4 Add validation logic in `ReviewsService` to check if the user has a `PAID` order for the prompt.
- [ ] 1.5 Implement logic to recalculate `Prompt.averageRating` when a review is added.

## 2. Frontend Implementation

- [ ] 2.1 Add an interactive "Heart" toggle button on Prompt cards and details page.
- [ ] 2.2 Create a "My Favorites" view in the React dashboard.
- [ ] 2.3 Add a "Leave a Review" modal/form on the Prompt details page (conditionally rendered if the user owns the prompt).
- [ ] 2.4 Display the average rating stars on Prompt cards.
