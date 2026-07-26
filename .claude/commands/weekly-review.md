---
description: Weekly performance rollup — win rate, expectancy, drawdown, best/worst setup, most emotional trade, and AI recommendations for the coming week.
argument-hint: "[optional: week/date range, default trailing 7 days]"
agent: journal-coach
pipeline: true
---

# /weekly-review

Period rollup across every `templates/trade-journal.md` entry logged in the window.
Leans on **Journal Coach** for aggregation and **Quant Lab** for statistical
interpretation, per `prompts/trading-council-protocol.md` §8.

## Steps

1. Pull every journaled trade in the window.
2. Compute the full metrics block: win rate, expectancy, profit factor, Sharpe,
   Sortino, max drawdown, Kelly fraction (reference only) — per protocol §8. Flag
   explicitly if the week's sample size is too small to be meaningful on its own (in
   which case, widen context using a rolling multi-week sample and say so).
3. Identify:
   - **Best Setup** — the horizon/instrument/pattern combination with the highest
     expectancy this period
   - **Worst Setup** — the lowest/negative-expectancy combination
   - **Most Emotional Trade** — the entry with the clearest bias/emotion flag from
     Journal Coach, and why it stood out
4. **Quant Lab** checks whether this week's live results are consistent with any
   existing `/backtest` reference class, or diverging (possible edge decay).
5. **Risk Manager** notes whether any loss/drawdown limit was approached or breached
   during the week, and whether current sizing remains appropriate for next week.
6. Produce 2-4 concrete, specific recommendations for next week — tied to the actual
   patterns found, not generic trading advice.

## Output

```
## Metrics
Win Rate | Expectancy | Profit Factor | Sharpe | Sortino | Max Drawdown | Kelly (ref)

## Best Setup
...
## Worst Setup
...
## Most Emotional Trade
...
## Edge Check (vs. backtest reference, if available)
...
## Risk Notes
...
## Recommendations For Next Week
1. ...
2. ...
```
Close with the disclaimer (protocol §9) — this is a historical performance review, not
a guarantee of future results.
