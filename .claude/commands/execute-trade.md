---
description: Turn an approved trade plan into concrete entry/SL/TP/leverage instructions, gated by a final Execution Engine liquidity/slippage/funding check.
argument-hint: "<instrument> [assumes an approved /trade-plan already exists, or runs one first]"
agent: execution-engine
pipeline: true
---

# /execute-trade

Requires a Risk-Manager-approved, Portfolio-Manager-sized plan. If none exists yet for
`$ARGUMENTS`, run `/trade-plan` first and stop at the Risk Manager gate before
continuing here.

## Steps

1. Confirm the plan's approval status. If Risk Manager status is anything other than
   **Approved** or **Approved with conditions**, stop and report **No-Trade — Risk
   Veto** — do not execute.
2. **Execution Engine** runs its pre-execution checklist
   (`agents/trading/execution-engine.md`): risk/reward recheck at current price,
   slippage estimate for the sized position, spread check, liquidity/depth check,
   funding check for perpetuals.
3. If any check fails materially (blown-out spread, thin liquidity for size, funding
   about to flip hard against the position), hold the trade and report why — do not
   force a fill.
4. If all checks pass, produce the final instruction set: Entry (limit/market + price/
   zone), Stop-Loss, Take-Profit 1, Take-Profit 2, Trailing Stop rule, confirmed
   leverage within Risk Manager's limit.

## Output

```
Entry: ...
Stop-Loss: ...
Take-Profit 1: ...
Take-Profit 2: ...
Trailing: ...
Leverage: ...
Risk: <% of account, in currency and in R>
Invalidation: ...
Confidence: <carried from the trade plan's conviction tier>
```
Note this command produces instructions for the user to place — it does not connect to
a live exchange or broker account. Close with the disclaimer (protocol §9).
