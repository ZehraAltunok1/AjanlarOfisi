# Verified — 2026-11-24

> Checked by dogrulayici. Labels: ✅ primary source · 🟡 secondary only · ⛔ not verified / contradicted.
> Where an item is ✅ but one sub-claim is only secondary, that sub-claim is marked 🟡 inline. The writer must keep 🟡 sub-claims in "reportedly" language or drop them.
> No ⚠️ şüpheli talimat seen on any page read.

## Deep Dive candidate
Nvidia, Huang's return and the Megaspeed Entity List: one export-control story — Both halves are confirmed by primary documents (Nvidia's board release and the BIS final rule, Federal Register doc 2026-23999), and they happened within hours of each other. Together they show the US government shaping both Nvidia's leadership and its chip-diversion channels, with congressional hearings Dec 1–3 as a natural "what's next".

## Verified items (by importance)

### 1. Nvidia board reinstates Jensen Huang as CEO ✅
- Claim: On Nov 23, 2026 the board voted unanimously to reinstate Huang as president, CEO and board member, effective immediately. It formed a National Security and Export Control Committee made up only of independent directors. A separate independent-director committee, with independent counsel, is still investigating reports that Huang was the target of a foreign intelligence effort. The board says it received input from senior levels of the US government and considers the reinstatement no national security risk.
- Checked against: [NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-board-reinstates-jensen-huang-as-president-ceo-and-board-director)
- Numbers: Resigned Nov 13 → reinstated Nov 23 = 10 days — CNBC (resignation date) + Nvidia release (reinstatement date). Shares closed up 31% on Nov 23 — [CNBC](https://www.cnbc.com/2026/11/23/nvidia-jensen-huang-ceo.html) 🟡. Hearings: Dec 1 closed-door interview of Huang with House Foreign Affairs and two other committees; Dec 2 Nvidia general counsel Tim Teter; Dec 3 Huang testifies publicly at a Senate Banking Committee hearing — CNBC 🟡.
- Notes: The affair reports and the alleged Chinese-intelligence link are **reported** (CNBC), not stated by Nvidia — use "reportedly". Nvidia's own page names the committee two slightly different ways ("…Export Control Committee" / "…Export Control Oversight Committee"); use the first. Colette Kress (interim CEO) returns to CFO; Harvey C. Jones remains chair. The Nvidia release does not mention the hearings.

### 2. CrowdStrike to acquire Zscaler in a ~$43.9B all-stock deal ✅
- Claim: All-stock deal, 1.135 CrowdStrike shares per Zscaler share. Expected to close in the second half of CrowdStrike's fiscal 2028, subject to Zscaler shareholder approval, regulatory approvals and customary conditions. Both boards approved unanimously.
- Checked against: [CrowdStrike press release](https://www.crowdstrike.com/en-us/press-releases/crowdstrike-to-acquire-zscaler-bringing-network-security-and-zero-trust-to-the-falcon-platform/) (Nov 23, 2026)
- Numbers: ~$43.9B (equity value and enterprise value); ~$260.41 implied per Zscaler share; ~34% premium to the Nov 20, 2026 close; pro forma ownership ~84.1% CrowdStrike / ~15.9% Zscaler holders; Jay Chaudhry and affiliates (~34% of Zscaler shares) signed voting agreements — all CrowdStrike press release.
- Notes: TechCrunch rounds to "$44 billion"; prefer $43.9B. "One of the largest cybersecurity mergers ever" is framing, not a sourced fact — keep it out or soften.

### 3. US adds Megaspeed-linked firms and an Alibaba unit to the Entity List ✅
- Claim: BIS added 7 entities in Malaysia, Singapore and Thailand to the Entity List, citing significant risk of diverting advanced computing commodities to unauthorized end uses or users. They include Megaspeed International Pte. Ltd. (Singapore), PT Megaspeed International (Malaysia), Megaspeed (Thailand) Co., Ltd., and Apex Enterprise Solutions (Singapore) Private Limited. Licenses are required for all items subject to the EAR, reviewed under a presumption of denial.
- Checked against: [Federal Register public inspection, doc 2026-23999 (BIS final rule, RIN 0694-AK59)](https://public-inspection.federalregister.gov/2026-23999.pdf) — scheduled for publication 2026-11-25; [Federal Register page](https://www.federalregister.gov/d/2026-23999)
- Numbers: 7 entities — BIS rule. Full list: MSFusion Sdn. Bhd., PT Megaspeed International, Speedmatrix Sdn Bhd (Malaysia); Apex Enterprise Solutions (Singapore) Private Limited, Megaspeed International Pte. Ltd., Swiftdata Pte. Ltd. (Singapore); Megaspeed (Thailand) Co., Ltd. (Thailand).
- Notes: The rule itself does **not** mention Alibaba or Nvidia. "Apex is Alibaba-owned" and "Megaspeed is at the center of the Nvidia chip-diversion scandal" come only from press (Bloomberg/Reuters via Techmeme and aggregators) 🟡 → "reportedly". Reuters reportedly carries an Apex spokesperson calling the listing erroneous 🟡 (not read directly). Rule is dated by docket 261123 (Nov 23); publication date is Nov 25 — say "announced Nov 23, published Nov 25". The rule text contains company addresses; do not copy them into the post.

### 4. Anthropic launches Claude Ship for review, fixes and approval of code changes ✅
- Claim: Claude Ship bundles Code Review (generally available), PR Steward (beta; works on failing CI, merge conflicts and review feedback, designed not to approve or merge) and Claude Approvals (beta; applies a team-written approval policy file in the repo). Available on Claude Team and Enterprise plans for GitHub repositories, billed on token usage. A `/ship` command rolls out in Claude Code and the desktop app.
- Checked against: [Claude announcement](https://claude.com/resources/articles/introducing-claude-ship) (Nov 23, 2026)
- Numbers: Promotional credit of at least $10,000 for eligible Enterprise orgs, use within 30 days of claiming, claim deadline Jan 15, 2027 — Claude announcement.
- Notes: Not available to orgs with Zero Data Retention, the HIPAA configuration, or customer-managed encryption keys. Admins can set spend limits. Approvals has no base charge (classifiers are billed on tokens).

### 5. Cisco and OpenAI open-source Shirudo, an eBPF "shield" for unpatched exploits ✅
- Claim: Shirudo is an open-source BPF-based Linux security platform that deploys small, signed mitigations ("upatches") to running systems while full patches roll out. Isovalent (a Cisco company) says it is rooted in Tetragon and rewritten for AI agents.
- Checked against: [Isovalent (Cisco) blog](https://isovalent.com/blog/post/cisco-openai-shirudo/), [GitHub repo](https://github.com/shirudo-dev/shirudo)
- Numbers: none.
- Notes: **License: BSD-2-Clause** (BPF programs dual BSD/GPL) — GitHub repo. The repo says it is **pre-release** and production targets need a patched Linux kernel and TPM 2.0 — mention this. The name "Secure Infrastructure Project" and "Shirudo is its first project" appear only in [SiliconANGLE](https://siliconangle.com/2026/11/23/cisco-and-openai-launch-shirudo-an-open-source-infrastructure-shield-to-protect-against-ai-driven-cyberattacks/) 🟡 (Cisco newsroom 404, not on Isovalent page or repo). "OpenAI uses Shirudo in its Codex-powered agentic control plane" is SiliconANGLE 🟡; the Isovalent post only shows Codex as the control plane in one worked example (Java4Shell).

### 6. UK NCSC warns agentic attack tools are exploiting old weaknesses faster ✅
- Claim: NCSC has seen a marked rise in AI-assisted attacks since September 2026, using "agentic offensive frameworks" (red-team software repurposed for attacks). They mostly exploit long-standing gaps: credentials committed to code repos, infrastructure-as-code misconfigurations, default credentials or missing authentication, API weaknesses, then over-privileged credentials and flat networks.
- Checked against: [NCSC blog](https://www.ncsc.gov.uk/blogs/familiar-weaknesses-exploited-faster-defending-against-agentic-cyber-attacks) (Nov 24, 2026)
- Numbers: **Correction:** the post has **8 numbered defensive questions**, plus 3 closing bullets (zero trust, Cyber Assessment Framework, Cyber Essentials). It is not "nine recommendations" — say "eight questions" or avoid a number.
- Notes: none.

### 7. GreyNoise details an intrusion campaign against Check Point management servers ✅
- Claim: GreyNoise tracks campaign "GT13" (GreyNoise Threat 13), not attributed to any known group. The actor compromised 24 Check Point Security Management Servers across at least 22 organizations (finance, energy, government, transport, mining, engineering, manufacturing). GreyNoise believes, from observed behaviour, that the actor used LLMs and agentic systems.
- Checked against: [GreyNoise blog](https://www.greynoise.io/blog/check-point-security-management-servers-intrusion-campaign) (Nov 23, 2026)
- Numbers: 24 servers, ≥22 organizations — GreyNoise.
- Notes: **Corrections to the candidate:** (a) The Rejetto HFS server was the *observed* entry point (via CVE-2026-61500, session-cookie forgery) and used as a relay; GreyNoise says it could not determine how the attacker got into the Check Point assets — do not write "initial foothold via HFS" as fact. (b) "Ongoing" is GreyNoise's expectation; its visibility ended around Nov 2, 2026. (c) LLM/agentic use is an inference, use "GreyNoise believes". **CVE check (CVE.org records, all PUBLISHED):** [CVE-2026-61500](https://www.cve.org/CVERecord?id=CVE-2026-61500) Rejetto HFS session forgery (VulnCheck); [CVE-2026-16232](https://www.cve.org/CVERecord?id=CVE-2026-16232) Check Point Quantum Security Management (Check Point CNA); [CVE-2026-41089](https://www.cve.org/CVERecord?id=CVE-2026-41089) Windows Netlogon RCE (Microsoft); [CVE-2026-98432](https://www.cve.org/CVERecord?id=CVE-2026-98432) Linux kernel ipv4 fix (Linux CNA) — the odd-looking number is real. If only one CVE is quoted, use CVE-2026-16232 (the Check Point one). No Check Point statement found.

### 8. Amazon buys Decart's AI-optimization tech and team to boost Trainium ✅
- Claim: Amazon agreed to buy the technology behind the Decart Optimization Stack (DOS) and bring Decart's co-founders and researchers to Amazon, to strengthen its custom silicon (Trainium) and inference optimization. It is a technology-and-talent deal, not a purchase of the company; completion depends on customary conditions including regulatory clearance.
- Checked against: [Amazon announcement](https://www.aboutamazon.com/news/company-news/amazon-decart-ai-optimization) (Nov 23, 2026)
- Numbers: $7.5B — Bloomberg, cited by [TechCrunch](https://techcrunch.com/2026/11/24/amazons-decart-acquisition-is-a-bet-on-using-software-to-narrow-the-gap-with-nvidia-in-the-ai-chip-race/) 🟡; Amazon does not state a price → "reportedly".
- Notes: Write "agreed to acquire" (not closed). Decart's team has worked with Amazon on Trainium since 2025 (Amazon).

### 9. OpenAI brings GPT-6.2 Sol to ChatGPT's Chat tab ✅ (retirements 🟡)
- Claim: From Nov 23, 2026 the Chat tab for Plus, Pro, Business and Enterprise is powered by a version of GPT-6.2 Sol, rolling out globally (Enterprise subject to admin settings). Models powering Work and Codex are unchanged.
- Checked against: [OpenAI ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) (Nov 23 entry)
- Numbers: none.
- Notes: The GPT-5.6 Sol / GPT-5.6 Terra retirement on Dec 23 is **not** in the release notes; it comes from a ChatGPT X post (could not be read) as reported by [9to5Mac](https://9to5mac.com/2026/11/23/chatgpt-expands-gpt-6-2-sol-as-openai-sets-retirement-date-for-two-models/) 🟡. Per 9to5Mac: GPT-5.6 Sol leaves Chat, Work and Codex; GPT-5.6 Terra leaves Work and Codex. Keep as "OpenAI said on X, according to 9to5Mac" or drop.

### 10. Uber, Nuro and Lucid begin driverless testing in the Bay Area ✅ (details 🟡)
- Claim: Nuro, Lucid and Uber have begun driverless testing (no safety operators) on public roads in the San Francisco Bay Area, after months of supervised testing.
- Checked against: [Nuro blog](https://www.nuro.ai/blog/nuro-lucid-uber-begin-driverless-testing-on-public-roads) (Nov 24, 2026)
- Numbers: Q1 2027 commercial launch — [TechCrunch](https://techcrunch.com/2026/11/24/uber-and-nuro-begin-driverless-testing-of-lucid-robotaxis-ahead-of-2027-launch/) 🟡 (Nuro post gives no date).
- Notes: The Lucid **Gravity** model name, rides for employees "soon", and Houston testing still using safety operators are TechCrunch only 🟡. A June 2026 Nuro post says Houston service is planned for 2027.

### 11. Quad9 shuts off its public DNS service in France over piracy-blocking orders ✅
- Claim: Since Nov 24, 2026, 09:00 Paris time, Quad9 refuses every query to any of its service addresses from users it geolocates to France. French courts upheld beIN's demands to block piracy-streaming domains, and Quad9 faced fines for not complying; Quad9 opposes using recursive DNS for content blocking.
- Checked against: [Quad9 blog](https://quad9.net/news/blog/quad9-service-deactivation-in-france/)
- Numbers: none.
- Notes: Geolocation is imprecise (Quad9 says so), so some non-French users may be affected. Quad9 pre-announced this about a month earlier.

### 12. PrismML releases Ternary Bonsai 2.5 27B, an open-weights model in ~5.9 GB ✅
- Claim: Apache-2.0 ternary model built on Qwen3.8 27B, ~5.9 GB, runs via llama.cpp (NVIDIA and Intel GPUs) and MLX (Apple devices); weights on Hugging Face.
- Checked against: [PrismML](https://prismml.com/news/bonsai-2-5-27b) (Nov 24, 2026)
- Numbers: SWE-bench Verified 75.6 vs 80.6 for the base model — PrismML (vendor-reported, no independent check).
- Notes: Write "PrismML reports".

### 13. Anthropic study: most workplace AI value comes from more output, not cost cuts ✅
- Claim: 66 interviews at 58 US companies (all Anthropic enterprise customers). Most AI uses were described as raising output rather than cutting costs. AI-driven layoffs were rare. People at about two-thirds of the companies reported reduced hiring due to AI.
- Checked against: [Anthropic Research](https://www.anthropic.com/research/working-with-ai) (Nov 23, 2026)
- Numbers: 66 interviews, 58 companies; 2 companies reported a position fully eliminated with a job loss; 5 pushed out employees who would not adopt AI; 10 hired more due to AI; "two-thirds" of companies reduced hiring (no exact count given — do not convert to "39") — Anthropic.
- Notes: Qualitative, self-reported, not a representative sample; vendor studying its own customers — say so.

### 14. Anthropic shares fall below their $83 IPO price 🟡
- Claim: Anthropic stock traded as low as $76 midday on Nov 24, below the $83 IPO price, down nearly 12% from Monday's close, after debuting at $111.50.
- Checked against: [TechCrunch](https://techcrunch.com/2026/11/24/anthropic-shares-fall-below-ipo-price-a-worrying-sign-for-ai-startups/) (trading prices, secondary); IPO price confirmed by [Anthropic](https://www.anthropic.com/news/anthropic-prices-initial-public-offering)
- Numbers: IPO price $83.00, priced Nov 18, trading from Nov 19 on Nasdaq Global Select (ticker ANT) — Anthropic ✅. Intraday low $76, nearly −12% vs Monday close, $111.50 debut — TechCrunch 🟡.
- Notes: Intraday prices change; say "as of midday Nov 24, per TechCrunch". Note Monday close itself is not given. Conflict of interest: the blog's agents run on Claude — the writer may want to note this neutrally.

### 15. Tidal will remove fully AI-generated music from Dec 9 🟡
- Claim: Tidal will remove 100% AI-generated tracks from Dec 9 and reject fully AI-made submissions; AI-assisted tracks stay allowed.
- Checked against: [TechCrunch](https://techcrunch.com/2026/11/24/tidal-to-ban-and-remove-millions-of-ai-generated-tracks-as-ai-slop-inundates-music-streaming/) only. The primary source is a [TIDAL post on X](https://x.com/TIDAL/status/2125233598714487170), which could not be read (HTTP 402); tidal.com newsroom returned 403.
- Numbers: >29M tracks removed by year-end; >43% of uploads in the past 90 days were AI-generated — TechCrunch citing Tidal 🟡.
- Notes: This reverses Tidal's June 29, 2026 policy (demonetize and label, not remove) — useful context. "Strictest stance among major streaming services" is framing, not a sourced fact.

## Dropped
- No candidate from 01-haberler.md was dropped.
- Microsoft "Code Red" after historic outage ⛔ — (from "seen but not included") the "Code Red" label could not be confirmed anywhere; only the Nov 12–14 Microsoft 365 outage itself is widely reported, and that is older than the window. Not added.
- CIA/ODNI breach, ex-OpenAI engineer charge, Huawei verdict, Ariane 6 / Amazon Leo — not re-checked (not candidates); no new information.
