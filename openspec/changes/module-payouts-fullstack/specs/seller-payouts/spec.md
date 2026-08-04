## ADDED Requirements

### Requirement: Payout Requests
The system SHALL allow sellers to request payouts for their available balance.

#### Scenario: Request Withdrawal
- **GIVEN** a seller with a connected Stripe account and positive balance
- **WHEN** calling `POST /payouts/request`
- **THEN** the system MUST record a `Payout` request and initiate a transfer via Stripe Connect API.
