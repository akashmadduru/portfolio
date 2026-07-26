---
description: Periodic open-position check (intended cadence ~every 15 minutes during active trading) — reassesses trend, funding, volume, news, OI, and liquidations against the original invalidation criteria.
argument-hint: "<instrument> [or 'all' for every open position]"
agent: portfolio-manager
pipeline: true
---

# /manage-position

Re-evaluates an open position against its original trade plan — this command does not
re-run the full council from scratch; it checks whether anything has changed enough to
matter. Intended to be invoked on a recurring cadence (e.g. via `/loop`) while a
position is open, roughly every 15 minutes for intraday/scalp positions, less
frequently for swing/position holds.

## Steps

1. Load the original `templates/trade-plan.md` for the position (thesis, invalidation
   criteria, stop, targets).
2. Quick-check, not full re-vote:
   - **Trend Master**: has market structure changed (BOS/CHoCH against the position)?
   - **Liquidity Hunter**: has funding or OI moved to an extreme that changes the
     risk profile?
   - **Momentum Hunter**: has volume/participation confirmed or contradicted the thesis
     since entry?
   - Any relevant news/catalyst since entry that the original plan didn't account for?
3. Compare current state explicitly against the plan's stated Invalidation Criteria —
   has that condition been met, partially met, or not met?
4. **Risk Manager** re-checks whether the position still fits current daily/weekly
   loss budget and drawdown state (a position opened before a loss limit was hit may
   need defensive management even if its own thesis is intact).

## Recommendation

Output exactly one of: **Hold** / **Reduce** / **Exit** / **Add** (add only if the
original plan explicitly allowed scaling in and Risk Manager clears the additional
size). State the specific reason in one sentence tied to the invalidation criteria or
risk check — not a restatement of the original thesis.

## Output

```
Position: <instrument, direction, entry, current price, unrealized PnL/R>
Invalidation Status: <intact | partially triggered | triggered>
Recommendation: <Hold | Reduce | Exit | Add>
Reason: <one sentence>
```
