---
description: Recommend concrete adjustments to a strategy's parameters (entry filter, stop distance, sizing) based on its /backtest performance, without curve-fitting to noise.
argument-hint: "<strategy description> [optional: specific parameter to focus on]"
agent: quant-lab
pipeline: false
---

# /optimize-strategy

Run `/backtest` first if a current metrics block for this strategy doesn't already
exist in the conversation. **Quant Lab** leads; Risk Manager reviews any change that
affects position sizing or leverage before it's presented as a recommendation.

## Steps

1. Take the strategy's current metrics (win rate, expectancy, profit factor, Sharpe,
   max drawdown) from `/backtest`.
2. Identify the specific lever(s) most likely responsible for underperformance — e.g.
   stop distance too tight relative to ATR (death by a thousand small stops), entry
   filter too loose (low win rate dragging expectancy), or sizing too aggressive
   relative to realized volatility (drawdown disproportionate to return).
3. Propose a small number of concrete, testable parameter changes (not a wholesale
   redesign) — e.g. "widen stop from 1.0×ATR to 1.5×ATR" or "add ADX > 20 as an entry
   filter."
4. Re-estimate expected impact on the metrics using the same reference-class data,
   explicitly flagging this as an estimate, not a new confirmed result — a genuinely
   validated improvement requires forward testing, not just re-slicing the same
   history.
5. Guard against overfitting: flag if a proposed change only helps because it fits a
   small number of specific past trades (a change that improves results by excluding
   3 of 15 trades is a red flag, not an edge).
6. **Risk Manager** reviews any sizing/leverage change against the desk's limits before
   it's included in the final recommendation.

## Output

```
Current Metrics: <from /backtest>
Proposed Change(s): <specific, testable>
Estimated Impact: <directional, caveated as in-sample re-estimate>
Overfitting Check: <pass/flag, with reasoning>
Next Step: <forward-test recommendation — track N more trades before adopting fully>
```
