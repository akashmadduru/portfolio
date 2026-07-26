---
description: Current portfolio state — bucket allocation (Spot/Swing/Scalp/Options/Cash), open exposure, correlation risk, and any recommended rebalance.
argument-hint: "[optional: specific bucket or instrument to drill into]"
agent: portfolio-manager
pipeline: false
---

# /portfolio

Read-only portfolio report, led by **Portfolio Manager** with **Risk Manager**
confirming current limit status.

## Steps

1. **Portfolio Manager** reports current allocation across Spot, Swing, Scalp,
   Options, and Cash buckets — actual vs. target allocation for each.
2. Report open exposure by instrument, grouped by correlation cluster (e.g. "BTC +
   correlated alt longs: X% of book") — the point is to surface concentration that
   isn't obvious from position count alone.
3. **Risk Manager** confirms current status against daily loss, weekly loss, and
   drawdown limits (`agents/trading/risk-manager.md` default rule set, or the user's
   configured limits), and current leverage/size headroom.
4. Flag any bucket that has drifted meaningfully from target allocation, and any
   correlation cluster that's concentrated beyond a sensible limit.
5. If drift or concentration is flagged, propose a specific rebalance (what to trim,
   what to add to, and why) — not just "consider rebalancing."

## Output

```
## Bucket Allocation
Spot: actual% / target%
Swing: actual% / target%
Scalp: actual% / target%
Options: actual% / target%
Cash: actual% / target%

## Open Exposure by Correlation Cluster
...

## Risk Limit Status
Daily Loss: used% / limit% | Weekly Loss: used% / limit% | Drawdown: current% / limit%

## Rebalance Recommendation
<specific, or "none needed">
```
