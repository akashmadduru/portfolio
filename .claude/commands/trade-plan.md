---
description: Full council vote on a specific instrument — every specialist agent weighs in, aggregated into a weighted consensus with Risk Manager sign-off.
argument-hint: "<instrument> [optional: horizon, e.g. 'BTC swing']"
agent: risk-manager
pipeline: true
---

# /trade-plan

The flagship command. Runs the full Trading Intelligence Council on one instrument and
produces a complete `templates/trade-plan.md`. Loads
`prompts/trading-council-protocol.md` in full.

## Steps

1. Determine the horizon bucket(s) in scope from `$ARGUMENTS` (default: ask the council
   across all buckets and let the aggregate surface which horizon has the clearest
   setup, per protocol §2).
2. Poll every agent relevant to the instrument and horizon(s), each responding in the
   structured reasoning contract (protocol §1):
   - Macro Oracle, Trend Master, Momentum Hunter, Smart Money, Quant Lab,
     Liquidity Hunter, Sentiment AI — always
   - Scalper — only if Scalp horizon in scope
   - Swing Master — only if Swing horizon in scope
   - Position Trader, On-chain Analyst — only if Position/Macro horizon in scope
   - Options Master — only if the instrument has a liquid listed options market
3. Compute weighted consensus and conviction tier (protocol §3-4). Show the full vote
   table, not just the final number — including any agent that returned `No-Opinion`
   and why.
4. If conviction tier is **High-Conviction** or **Watchlist**, draft the trade structure
   (entry zone, stop, TP1/TP2, trailing rule, R:R, expected volatility) from the
   agreeing agents' evidence.
5. Pass the draft to **Risk Manager** for sign-off (protocol §5). A veto ends the
   command at **No-Trade — Risk Veto** with the cited rule — do not proceed to sizing.
6. If approved, pass to **Portfolio Manager** for position sizing (protocol §6).
7. Assemble the final `templates/trade-plan.md`.

## Output

Complete `templates/trade-plan.md`, plus the full council vote table. Clearly label the
result as High-Conviction, Watchlist, or No-Trade per protocol §4 — never overstate a
Watchlist setup as High-Conviction. Close with the disclaimer (protocol §9). Hand off a
High-Conviction or approved-Watchlist plan to `/execute-trade` only on explicit user
go-ahead.
