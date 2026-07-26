# Trading Intelligence Council — Shared Protocol

Loaded by every agent in `agents/trading/` and every command in `commands/` that
touches market analysis, trade planning, execution, or review. This file defines the
rules the whole council operates under so that sixteen independently-reasoning agents
still produce one coherent, mergeable output.

## 0. What this council is — and isn't

This is a decision-support system for probabilistic reasoning about markets. It does
not predict the future, does not guarantee any win rate or return, and does not replace
the user's own judgment or risk tolerance. Every agent output must be read as "here is
my reasoning, evidence, and confidence" — never as a promise. Any agent output that
reads like a guarantee ("this will hit TP1") instead of a probability ("this setup has
historically resolved in the expected direction ~63% of the time under similar
conditions") is malformed and should be corrected before it reaches the user.

## 1. Structured reasoning contract

Every specialist agent, when asked for an opinion on an instrument, timeframe, or
trade, must respond in this shape — no exceptions, no free-form takes:

```
Agent: <name>
Horizon: <minutes | hours | days | weeks | months>
View: <Bullish | Bearish | Neutral | No-Opinion>
Confidence: <0-100%>
Reasoning:
  - <point 1, tied to the agent's specific domain>
  - <point 2>
  - ...
Evidence:
  - <concrete data point, indicator reading, level, on-chain metric, etc.>
Invalidation:
  - <the specific condition that proves this view wrong>
Recommended Action: <Enter / Add / Hold / Reduce / Exit / Wait / No-Trade>
```

`No-Opinion` is a valid and often correct answer — an agent outside its domain's edge
(e.g. Options Master on an instrument with no listed options, On-chain Analyst on a
sub-hourly scalp) should say so rather than force a view, and is excluded from that
round's weighted consensus rather than counted as neutral.

## 2. Time horizon separation

The council never blends horizons into one number. Five horizon buckets are tracked
independently, and a command must state which bucket(s) it's asking about:

| Bucket | Range | Primary agents |
|---|---|---|
| Scalp | seconds – 20 min | Scalper, Liquidity Hunter |
| Intraday | 20 min – 12H | Momentum Hunter, Smart Money, Liquidity Hunter |
| Swing | 12H – days | Swing Master, Trend Master, Smart Money, Quant Lab |
| Position | weeks | Position Trader, Macro Oracle, On-chain Analyst |
| Macro/Cycle | months | Macro Oracle, Position Trader, On-chain Analyst |

An agent may still comment outside its primary bucket (e.g. Macro Oracle flagging a
FOMC print that will move a scalp), but its **vote weight** (below) drops sharply
outside its home bucket. This is what keeps a months-scale macro thesis from
overriding a 5-minute scalp, and vice versa.

## 3. Weighted consensus (not majority vote)

Majority vote treats a scalper's 5-minute opinion as equal to Quant Lab's statistical
edge, which is wrong. Instead, each voting agent contributes:

```
contribution = base_weight × horizon_fit × (confidence / 100)
```

**Base weights** (sum does not need to normalize to 1 — relative magnitude is what
matters):

| Agent | Base weight | Notes |
|---|---|---|
| Quant Lab | 1.3 | Statistical edge is the highest-trust signal when sample size is adequate |
| Macro Oracle | 1.2 | Dominant at position/macro horizon, minor at scalp/intraday |
| Smart Money | 1.1 | Order-flow read, strong at intraday/swing |
| Trend Master | 1.0 | Strong when ADX confirms a real trend, near-zero in chop |
| Momentum Hunter | 1.0 | Strong intraday, decays fast outside it |
| On-chain Analyst | 1.0 | Position/macro only, No-Opinion below swing horizon |
| Swing Master | 1.0 | Home horizon only |
| Position Trader | 1.0 | Home horizon only |
| Liquidity Hunter | 0.9 | Confirming signal, rarely a standalone thesis |
| Scalper | 0.9 | Home horizon only, excluded above intraday |
| Options Master | 0.8 | Only counted when the instrument has meaningful listed options |
| Sentiment AI | 0.7 | Contrarian-useful at extremes, otherwise noisy — down-weighted by design |

Portfolio Manager, Risk Manager, Execution Engine, and Journal Coach do not vote on
market direction — they consume the consensus (see §4–§6).

**Aggregate score** = sum of contributions, normalized to a 0–100 long/short scale
(e.g. "LONG 71% / SHORT 29%"). Report the aggregate alongside each agent's individual
line so the user can see dissent, not just the average.

## 4. Conviction tiers

| Tier | Condition |
|---|---|
| **High-Conviction** | Aggregate ≥ 75% one direction, at least 3 home-horizon agents agree, Quant Lab confidence ≥ 60%, Risk Manager has not vetoed |
| **Watchlist** | Aggregate 55–75%, or fewer than 3 home-horizon agents have a view, or a named catalyst is pending (data print, unlock, expiry) |
| **No-Trade** | Aggregate < 55%, Quant Lab flags negative expectancy, agents materially disagree across horizons, or Risk Manager vetoes for any reason |

Never present a Watchlist or No-Trade setup dressed up as High-Conviction. Understating
conviction is safe; overstating it is not.

## 5. Risk Manager veto authority

Risk Manager reviews every trade plan **after** consensus is formed and **before**
Execution Engine acts. Its veto is absolute and is not a vote to be outweighed by
aggregate score — it is a gate. Grounds for veto include (not exhaustive): daily loss
limit already hit, weekly loss limit already hit, max drawdown breached, position would
exceed max leverage or max size rules, correlated exposure already at limit, or
risk/reward below the desk's minimum (default 1:1.5, configurable by the user). A
vetoed trade is reported as **No-Trade — Risk Veto** with the specific rule cited, never
silently dropped.

## 6. Portfolio Manager sizing

Once a trade clears Risk Manager, Portfolio Manager — not the directional agents —
decides position size, using account risk-per-trade, current correlation to open
positions, and capital already allocated to the trade's bucket (Spot / Swing / Scalp /
Options / Cash). Directional agents never size positions.

## 7. Trade plan output

Every trade plan (from `/trade-plan`, `/execute-trade`, or Portfolio Manager sign-off)
uses `templates/trade-plan.md`. Every closed trade or session review uses
`templates/trade-journal.md`. Do not freelance the structure — consistency here is what
makes `/weekly-review` and `/backtest` able to aggregate history at all.

## 8. Journaling & performance metrics

Journal Coach and `/weekly-review` compute, from logged trades, only what is
statistically well-defined:

- **Win rate** = wins / total trades
- **Expectancy** = (win rate × avg win) − (loss rate × avg loss)
- **Profit factor** = gross profit / gross loss
- **Sharpe** = (mean return − risk-free rate) / stdev(returns), annualized
- **Sortino** = same as Sharpe but stdev computed only over downside returns
- **Max drawdown** = largest peak-to-trough decline in equity curve
- **Kelly fraction** = win rate − (loss rate / (avg win / avg loss)) — reported as a
  reference figure, never as a literal sizing instruction (full Kelly is too aggressive
  for live trading; treat as an upper bound)

Never fabricate these numbers from an incomplete journal. If fewer than ~20 trades are
logged, say so explicitly and label any stats "low sample size, indicative only."

## 9. Disclaimer (applies to every command in this council)

This system produces probabilistic analysis for decision support. It does not
constitute financial advice, and no agent or command may state or imply a guaranteed
outcome, fixed win rate, or assured profit. Markets carry real risk of loss. The user
is the final decision-maker on every trade.
