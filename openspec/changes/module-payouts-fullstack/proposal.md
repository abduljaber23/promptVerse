## Why

Enable sellers to withdraw their accumulated earnings using Stripe Connect. This is the final step of the marketplace economic loop.

## What Changes

- **Backend**: Create `Payout` entity.
- **Backend**: Implement `PayoutsModule` and Stripe Connect API integration.
- **Frontend**: Build a "My Earnings" dashboard view for sellers.

## Capabilities

### New Capabilities
- `seller-payouts`: Onboarding sellers via Stripe Connect and processing withdrawal requests.

### Modified Capabilities
None.

## Impact

- **Backend**: Adds Stripe Connect API calls.
- **Frontend**: Adds financial tracking UI to the dashboard.
