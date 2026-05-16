# Design Handoff Package

Everything claude.ai/design needs to mock up the Cuchulainn Tech landing page.

## What's here

```
design/
├── DESIGN_BRIEF.md          ← the full brief — drag this in first
├── assets/
│   ├── eist/                ← logo, app icon, 3 screenshots
│   ├── headlock/            ← wordmark, character logo, 512px icon
│   ├── theory-test-free/    ← app icon, favicon
│   └── _brand/              ← empty (no Cuchulainn Tech logo or founder photo yet)
└── README.md                ← this file
```

## How to hand off to claude.ai/design

1. Open **claude.ai/design** in a browser (Pro/Max required; Team/Enterprise must enable Anthropic Labs in org settings).
2. Start a new chat.
3. Drag the `design/` folder contents in — `DESIGN_BRIEF.md` plus all images at once. Claude Design reads the markdown and the images together.
4. Send: *"Design this landing page from the attached brief and assets. Generate desktop and mobile mockups."*
5. Iterate:
   - **Chat messages** for structural shifts ("rearrange the products grid", "darker hero").
   - **Inline comments** on elements for component-level edits ("more padding on this card", "tighten this heading").
6. When you're happy, use **Send to Claude Code** → *local agent* to hand the design off to this repo for implementation. (Or export to standalone HTML / PDF / Canva if you want to stop at the design step.)

## Tips that matter

- **Start simple, layer complexity.** Don't ask for hover states and accessibility audits in the first prompt — those come on subsequent turns.
- **Reference design system components by name** (shadcn Button, Magic UI Bento Grid, etc.) — Claude Design respects this.
- **Save versions before pivoting.** Claude Design supports version snapshots; use them before any big direction change so you can roll back.
- **Token consumption is steep.** Long iteration sessions burn through Pro/Max limits fast. Get the structure right in 2–3 prompts, then refine narrow.
- **Ask for 2–3 variations** on the hero headline and the products grid layout in the first round — cheaper than iterating one at a time.

## Outstanding gaps (call out in the mockup)

- No Cuchulainn Tech wordmark yet → ask Claude Design to propose 2 options
- No founder photo yet → use a tasteful circle placeholder
- 6 Coming Soon products have no imagery → design teaser/placeholder treatments

## Claude Design vs. Figma — quick comparison

| | claude.ai/design | Figma (via MCP) |
|---|---|---|
| **Setup** | Open URL, drag files | Need Figma account + file |
| **Speed to first mockup** | Minutes | Slower — MCP writes nodes one at a time |
| **Iteration quality** | Prompt + inline comments | Full design tool — pixel-precise |
| **Handoff to code** | One-click → Claude Code | Via figma-implement-design skill |
| **Cost** | Eats your Claude usage limit | Free if you have Figma |
| **Best for** | Rapid first-pass landing pages | Long-lived design systems, polished refinement |

**For this project**: claude.ai/design is the right call. It's a one-page marketing site, not a long-lived product surface, and the direct handoff to Claude Code makes the implementation step seamless. Save Figma for if/when you want a durable design system across multiple product surfaces later.
