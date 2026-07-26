---
description: Deep-dive macro report — rates, dollar, liquidity, inflation, global markets, BTC dominance, ETH/BTC, and stablecoin flows — for the weeks/months horizon.
argument-hint: "[optional: specific macro question or theme to focus on]"
agent: macro-oracle
pipeline: false
---

# /macro-report

Deeper and less time-boxed than the macro section of `/market-open` — this is the
weeks/months-horizon deep dive, led by **Macro Oracle** with **Position Trader** and
**On-chain Analyst** contributing the position-horizon translation.

## Steps

1. **Macro Oracle** reports in full: current rate/policy regime, real yields, DXY
   trend, Treasury curve/credit signals, inflation trend, and global central bank
   liquidity trajectory (net balance sheet change, reverse repo, stablecoin market cap
   and net issuance as a crypto-specific liquidity proxy).
2. Cross-asset read: how other risk assets (equities, if relevant context is available)
   are behaving under the same regime, as a sanity check on the crypto-specific read.
3. Crypto-specific translation: Bitcoin dominance trend, ETH/BTC ratio, spot ETF net
   flow trend.
4. **On-chain Analyst** and **Position Trader** translate the macro regime into a
   cycle-stage read and a core-position stance (Accumulate / Hold / Trim / Distribute).
5. State explicitly what would change this regime read (the invalidation trigger from
   Macro Oracle's persona spec) and the review cadence.

## Output

```
## Regime
...
## Cross-Asset Context
...
## Crypto Translation (Dominance, ETH/BTC, ETF Flows)
...
## Cycle Stage & Core Position Stance
...
## What Would Change This View
...
```
Horizon is always weeks/months — do not let this report drive scalp/intraday decisions
directly (protocol §2). Close with the disclaimer (protocol §9).
