---
description: Morning institutional-style briefing — global macro, crypto conditions, news, key levels, and today's bias.
argument-hint: "[optional: instrument focus, default BTC+ETH+top movers]"
agent: macro-oracle
pipeline: true
---

# /market-open

Read-only morning briefing. Sets the day's context before any `/scan-market` or
`/trade-plan` call. Loads `prompts/trading-council-protocol.md`.

## Steps

1. **Macro Oracle** reports the current regime: rates/liquidity backdrop, DXY/Treasury
   read, and any scheduled macro catalysts today (data prints, FOMC, etc.).
2. **On-chain Analyst** reports overnight exchange flow and any notable whale activity
   since the last session.
3. **Sentiment AI** reports current Fear & Greed reading and overnight news/social tone,
   flagging any extreme.
4. **Liquidity Hunter** reports current funding rates, OI levels, and the nearest
   liquidation clusters above/below spot for the focus instrument(s).
5. Synthesize into a single briefing (do not just concatenate agent outputs):
   - **Global Macro** — regime + today's catalysts
   - **Crypto Conditions** — BTC dominance, ETH/BTC, funding/OI snapshot
   - **News** — anything materially relevant since last close
   - **Important Levels** — nearest key support/resistance and liquidation clusters
   - **Today's Bias** — Bullish / Bearish / Neutral, with the confidence and the single
     biggest risk to that bias

## Output

Structured briefing per above, each section 2-4 sentences. Close with the standard
disclaimer from `prompts/trading-council-protocol.md` §9.
