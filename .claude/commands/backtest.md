---
description: Statistically evaluate a strategy or setup pattern against logged/historical trades — win rate, expectancy, profit factor, Sharpe/Sortino, max drawdown, and Monte Carlo drawdown distribution.
argument-hint: "<strategy or setup description> [optional: instrument/timeframe filter]"
agent: quant-lab
pipeline: false
---

# /backtest

Read-only quantitative evaluation, run by **Quant Lab** per
`prompts/trading-council-protocol.md` §8. This command evaluates a *pattern* (a
described setup/strategy) against available history — it does not connect to a live
backtesting engine or external price database; where historical detail isn't available
in the conversation or logged journal, Quant Lab must say so rather than fabricate
results.

## Steps

1. Define the reference class: the specific setup/strategy pattern in `$ARGUMENTS`,
   instrument scope, and timeframe.
2. Pull matching entries from the logged trade journal (`templates/trade-journal.md`
   entries maintained by Journal Coach), if any exist.
3. Compute, per protocol §8: win rate, expectancy, profit factor, Sharpe, Sortino, max
   drawdown, Kelly fraction (reference only).
4. Run a Monte Carlo resample of the logged trade sequence (order-scrambled
   resampling) to show a *distribution* of plausible drawdown/return outcomes, not a
   single expected path — report the median and a reasonable worst-case percentile
   (e.g. 5th percentile), not just the mean.
5. Explicitly flag sample size. Below ~20 trades, label every output "low sample size,
   indicative only" per protocol §8 — do not present it with false confidence.

## Output

Full metrics block (`templates/trade-journal.md` "Aggregate Metrics Block") plus the
Monte Carlo drawdown range and an explicit statement of what data the evaluation is and
isn't based on. Close with the disclaimer (protocol §9) — this is historical/statistical
analysis, not a forward guarantee.
