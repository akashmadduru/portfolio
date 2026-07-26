---
description: Log and score a single trade (or review one already logged) using Journal Coach's process-first scoring — Execution, Risk, and Strategy scores independent of outcome.
argument-hint: "<trade details, or trade ID to review>"
agent: journal-coach
pipeline: false
---

# /journal

Single-trade journaling, run by **Journal Coach**. This is the per-trade counterpart to
`/market-close` (daily rollup) and `/weekly-review` (period rollup).

## Steps

1. Gather the trade's plan (entry, stop, targets, invalidation — from the original
   `templates/trade-plan.md` if it exists) and its actual outcome (entry/exit price and
   time, result).
2. Fill `templates/trade-journal.md` in full:
   - Plan adherence (entry zone, stop discipline, exit reason)
   - Execution / Risk / Strategy scores (1-10 each), scored independently of whether the
     trade won or lost
   - Bias detected, named specifically (not "undisciplined" — the exact pattern:
     FOMO entry, revenge trade, confirmation bias, sunk-cost hold, etc.)
   - One specific, actionable improvement
3. If this trade reveals a pattern already seen in prior journal entries (e.g. this is
   the third stop-loss moved this month), say so explicitly rather than treating each
   entry in isolation.

## Output

Completed `templates/trade-journal.md` entry for the trade.
