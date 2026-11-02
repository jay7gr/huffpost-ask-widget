# HuffPost UK — Ask widget brief

Handoff for Claude. Recreate or continue this widget. Do not restyle it. The product is an on-site AI answer engine in HuffPost's own visual system, closer to Taboola DeeperDive in behaviour, not a story directory.

Open `index.html` in a browser. That is the working ask pill and anchor. CSS and JS are inline.

## What this is

A widget pinned to the bottom-right of a HuffPost UK page. Readers ask a question. They get a short answer grounded only in HuffPost, then more questions. They do not browse a list of headlines.

Two variants, toggled in a studio bar:

1. Ask pill — compact. Questions are text only. Width 18.25rem, height 40px.
2. Anchor — slightly larger pinned panel, width 19.5rem. Each question has a 40x40 story photo beside it, including follow-ups.

Both say **Ask HuffPost Anything**. That exact string is the placeholder.

## Locked decisions

- Stick to HuffPost's design. Do not import DeeperDive's purple/blue UI.
- Do not grow the pill. Do not widen the anchor.
- Suggested content is questions, never article titles.
- Images sit next to questions on the anchor only. The pill has no thumbnails.
- Answers are short prose. Follow-ups are more questions, labelled Ask next.
- If nothing matches, say HuffPost has not published a direct answer, then offer real questions.
- The homepage around the widget stays a normal HuffPost article page. Headlines belong there, not in the widget.

## Behaviour

1. Idle widget shows a few spark questions.
2. Reader asks, or taps a question.
3. A concise answer, written as if it came only from HuffPost.
4. Two follow-up questions.
5. More questions returns to the spark list.

Typing filters spark questions. It does not search titles. Escape closes the pill panel or minimises the anchor. Clicking outside the pill closes its panel.

Pill sparks: up to 4. Anchor sparks: 3.

## Visual system

| Token | Value | Use |
| --- | --- | --- |
| Deep green | #164b49 | Header, discs |
| Mid green | #2e7061 | Secondary labels |
| Mint | #61ae96 | Hard offset shadow only: 4px 4px 0 #61ae96 |
| Mint soft | #b3dace | Hover |
| Wash | #e9f8ed | Question rows, footer |
| Bright | #0dbe98 | H mark on green |
| Pink | #cb2559 | ASK NEXT kicker only |
| Ink | #222222 | Body |
| Muted | #757575 | Placeholder |
| Line | #e5e5e5 | Borders |
| Paper | #ffffff | Surfaces |
| Fog | #f6f6f6 | Anchor input |

- Logo and kickers: Barlow Condensed. Wordmark is extra-bold italic. Kickers are 11px, weight 700, tracking 0.16em, uppercase.
- UI and answers: Montserrat.
- Radii: 2px on rows and the collapsed launcher, 4px on panels, full pill on the ask bar.
- The H is two skewed bars. Bright green on deep green.

## Spark questions

1. Why is Trump so unpopular in the UK?
2. What did Trump threaten to do to Europe?
3. What happened in the Farage donations sting?
4. Is Reform UK falling apart?
5. Why are people calling for Starmer to resign?
6. What did Macklemore pledge, and why?
7. Which shoes will fashion people want this autumn?
8. Will a super El Nino change the UK winter?

Example answer: A HuffPost UK poll finds Donald Trump deeply unpopular with British voters, days after he threatened to cut US trade with Europe. The reaction in Westminster has been blunt — one response summed it up as "what a buffoon".

Fallback: HuffPost hasn't published a direct answer to that. What readers are asking instead is about Trump's standing in Britain, the Farage donations sting, and whether a super El Nino changes this winter.

## Source

- index.html — working widget, CSS and JS inline
- src/search-pill.tsx
- src/anchor-widget.tsx
- src/ask-panel.tsx
- src/huff-brand.tsx
- src/answers.ts
- src/styles.css
