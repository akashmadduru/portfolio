# Trade Plan Template

Used by `/trade-plan`, `/execute-trade`, and any agent producing a tradeable idea.
Fill every field — write "N/A" explicitly rather than omitting a section. See
`prompts/trading-council-protocol.md` for the reasoning contract and consensus rules
this template packages.

```
Instrument: <e.g. BTC-USD Perp>
Horizon: <Scalp | Intraday | Swing | Position | Macro>
Direction: <Long | Short>
Conviction Tier: <High-Conviction | Watchlist | No-Trade>
Date/Time (UTC): <timestamp>

## Thesis
<2-4 sentences: why this trade, in plain language, synthesized from the council's
reasoning — not a restatement of every agent's line>

## Council Vote
| Agent | View | Confidence | Weight Contribution |
|---|---|---|---|
| ... | ... | ... | ... |

Aggregate: <LONG X% / SHORT Y%>
Dissent: <which agent(s) disagreed and why, if any>

## Trade Structure
Entry Zone: <price range, not a single tick>
Stop-Loss: <price + % risk from entry>
Take-Profit 1: <price, % of position closed>
Take-Profit 2: <price, % of position closed>
Trailing Stop Rule: <condition that activates it, if any>
Risk/Reward Ratio: <e.g. 1:2.4, computed from entry/SL/TP1>
Expected Volatility: <ATR-based range or IV if options>
Position Size: <set by Portfolio Manager, post Risk Manager approval — not by
directional agents>
Leverage: <if applicable, per Risk Manager limits>

## Invalidation Criteria
<the specific price action, on-chain event, macro print, or time-based condition that
proves this thesis wrong — must be checkable objectively, not vibes-based>

## Risk Manager Sign-off
Status: <Approved | Approved with conditions | Vetoed>
Rule(s) checked: <max daily loss, max position size, correlation, R:R minimum, etc.>
Notes: <if vetoed, cite the exact rule; if conditional, state the condition>

## Execution Notes
<slippage/spread/liquidity check from Execution Engine, fill instructions>
```
