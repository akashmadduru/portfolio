---
description: Scan BTC, ETH, top-100 alts, and perpetuals for funding/OI/whale-driven setups; return the top 10 ranked by council-weighted opportunity.
argument-hint: "[optional: universe filter, e.g. 'top 20 only' or a specific sector]"
agent: momentum-hunter
pipeline: true
---

# /scan-market

Read-only market scan. Casts a wide net, then narrows using the council's weighted
consensus (`prompts/trading-council-protocol.md` §3) rather than any single agent's
opinion.

## Steps

1. Define the scan universe: BTC, ETH, and top-100 alts by market cap (or the narrower
   universe in `$ARGUMENTS`), including their perpetual futures where liquid.
2. **Momentum Hunter** and **Liquidity Hunter** screen for volume expansion, breakout
   structure, funding extremes, and OI spikes across the universe.
3. **Trend Master** filters out anything currently in a low-ADX/no-structure chop state
   — these are dropped regardless of how their volume/OI profile looks.
4. **Smart Money** flags any candidate sitting at an unmitigated liquidity pool/order
   block worth watching.
5. For the remaining candidates, run a quick weighted-consensus pass (protocol §3) using
   only the agents above (full council vote is reserved for `/trade-plan` on a specific
   instrument) and rank by aggregate score.
6. Return the top 10, each with: instrument, one-line setup thesis, horizon, and
   aggregate score.

## Output

```
Rank | Instrument | Setup Thesis | Horizon | Aggregate Score
```
Note explicitly that this is a screening pass, not a trade plan — direct any setup the
user wants to act on to `/trade-plan <instrument>` for full council review and Risk
Manager sign-off.
