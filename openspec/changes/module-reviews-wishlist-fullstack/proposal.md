## Why

Implement community features: allowing buyers to leave reviews on purchased prompts, and allowing any authenticated user to save prompts to a favorites wishlist.

## What Changes

- **Backend**: Create `Review` and `WishlistItem` entities.
- **Backend**: Implement `ReviewsModule` and `WishlistModule`.
- **Backend**: Add database trigger or service logic to update `averageRating` and `favoritesCount` on the `Prompt` entity.
- **Frontend**: Add rating stars UI to the prompt details and catalog cards.
- **Frontend**: Add a "Heart" icon to toggle wishlist status.
- **Frontend**: Build a "My Favorites" page in the user dashboard.

## Capabilities

### New Capabilities
- `user-reviews`: Leaving a 1-5 star rating and comment on a purchased prompt.
- `wishlist-management`: Saving and removing prompts from a personal favorites list.

### Modified Capabilities
None.

## Impact

- **Backend**: Adds `reviews` and `wishlist_items` tables with specific unique constraints.
- **Frontend**: Adds interactive UI elements to the catalog and prompt details.
