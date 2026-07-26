---
description: End-of-day report — trades taken, PnL, mistakes, missed opportunities, macro summary, and tomorrow's plan.
argument-hint: "[optional: date, default today]"
agent: journal-coach
pipeline: true
---

# /market-close

Daily wrap-up. Combines Journal Coach's per-trade review with a look-back at what the
council flagged during the day but the user didn't act on.

## Steps

1. **Journal Coach** pulls every trade closed today and fills
   `templates/trade-journal.md` for each (plan adherence, scores, bias, improvement).
2. Compute today's aggregate: total trades, win rate, PnL (currency and R), and flag
   if daily loss limit (Risk Manager, default 3%) was approached or hit.
3. **Missed opportunities**: review today's `/scan-market` and `/trade-plan` outputs
   (if run) for High-Conviction or Watchlist setups the user didn't act on, and note
   how they played out where determinable.
4. **Macro Oracle** gives a short end-of-day macro summary — anything that changed the
   regime read from this morning's `/market-open`.
5. **Tomorrow's plan**: 2-3 sentences — what to watch, any pending catalyst, any
   position currently open that needs `/manage-position` attention overnight.

## Output

```
## Trades Today
<journal entries, summarized>

## PnL Summary
Trades: n | Win Rate: % | PnL: currency (R) | Daily Loss Limit Status: ...

## Mistakes
<specific, from Journal Coach>

## Opportunities Missed
<setups flagged but not taken, and outcome if known>

## Macro Summary
<short update vs. this morning>

## Tomorrow's Plan
<what to watch>
```
