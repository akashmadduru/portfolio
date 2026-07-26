# Trade Journal Entry Template

Used by Journal Coach after every closed trade, and aggregated by `/weekly-review` and
`/backtest`. Metric definitions live in `prompts/trading-council-protocol.md` §8 — do
not redefine them ad hoc here.

```
Trade ID: <sequential or timestamp-based>
Instrument: <e.g. ETH-USD>
Horizon: <Scalp | Intraday | Swing | Position | Macro>
Direction: <Long | Short>
Entry: <price, time>
Exit: <price, time>
Result: <+/- % and absolute PnL>
R-Multiple: <PnL expressed in units of initial risk, e.g. +1.8R>

## Plan Adherence
Followed plan as written: <Yes | No — deviated at X>
Entry within planned zone: <Yes | No>
Stop-loss respected: <Yes | No — moved from Y to Z, why>
Exit reason: <TP hit | SL hit | manual exit | invalidation triggered | other>

## Scoring (1-10 each)
Execution Score: <fills, timing, slippage vs. plan>
Risk Score: <sizing discipline, stop discipline, leverage discipline>
Strategy Score: <was the underlying thesis sound regardless of outcome>

## Behavioral Notes
Mistakes: <concrete, specific — "moved SL after entry" not "was undisciplined">
Bias Detected: <e.g. FOMO entry, revenge trade, confirmation bias, sunk cost>
Emotional State: <brief, factual>

## Improvement
<one specific, actionable change for the next similar setup — not a vague resolution>
```

## Aggregate Metrics Block (for `/weekly-review`, `/backtest`)

```
Trades logged: <n>
Win Rate: <%>
Expectancy: <value, in R or currency>
Profit Factor: <value>
Sharpe: <value>
Sortino: <value>
Max Drawdown: <%>
Kelly Fraction (reference only): <%>
Best Setup: <horizon/instrument/pattern with highest expectancy>
Worst Setup: <horizon/instrument/pattern with lowest/negative expectancy>
Most Emotional Trade: <trade ID + why>
Sample size caveat: <"low sample size, indicative only" if n < ~20>
```
