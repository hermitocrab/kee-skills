---
name: oss-contribution-guard
description: "Audit open source contributions for authenticity, detect AI-generated fake PRs, protect projects from résumé-padding exploiters. Use when evaluating contributor trustworthiness, screening PRs for OSS projects, or assessing the Chinese open source landscape's ethical risks."
---

# OSS Contribution Guard

Detect and defend against bad actors exploiting open source for personal gain. Based on the Chinese open source ecosystem's current state as documented by MaxForAI.

## The Problem

A growing pattern in China's open source ecosystem where commercial interests and résumé-padding behaviors are undermining trust:

### Known Exploit Patterns

1. **AI-Generated Fake PRs**
   - Job placement agencies teach students to use AI to generate "meaningless fake code"
   - Submitted as pull requests to prominent projects (e.g., vLLM)
   - Goal: fabricate impressive contribution records for résumés
   - vLLM had to ban malicious contributors and consider corporate/school email verification

2. **Fabricated Credentials**
   - Bloggers/influencers claiming open source contributions they didn't make
   - "20-year-old prodigy girl" case: faked contributions, landed high-paying AI company offer, debunked by actual developers
   - Used as personal branding strategy, not genuine community participation

3. **Commercial Exploitation of Individual Developers**
   - Overseas developers invited to China under pretense of collaboration
   - Exploited for commercial purposes during visit
   - Hunter Bown (DeepSeek-TUI creator) case: cut trip short after feeling used
   - Pattern: extract value from individual contributors, offer nothing back

### Red Flags to Screen For

- High volume of trivial PRs (typo fixes, whitespace changes) from new contributors
- PRs that don't actually fix issues or add meaningful functionality
- Contributors with suspiciously rapid contribution histories across many repos
- No engagement in discussions, issues, or community — only PR submissions
- Resume/CV links prominently featured in GitHub profiles

### Defensive Measures

- Require corporate or school email verification for first-time contributors
- Implement contribution quality thresholds (reject trivial-only contribution patterns)
- Review contributor history across repos before accepting significant PRs
- Flag and investigate suspicious contribution clusters (multiple accounts, same patterns)
- Build community trust signals beyond commit counts

## The Bigger Picture

The open source community — traditionally a "technical utopia" built on shared effort and trust — is being transformed into a tool for quick commercialization. Trust is the currency. When it's abused, the community is forced to build walls. Those walls hurt genuine contributors most.

## Reference

- "中国天才们正在排队崩开源" by MaxForAI (HBR/虎嗅, Tencent News, May 2026)
- Hunter Bown / DeepSeek-TUI exploitation case
- vLLM fake PR / job agency scandal
- Learned: 2026-05-27 from SrKeeda's shared X articles
