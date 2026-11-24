---
title: "How The Noonwire is made"
type: article
date: 2026-11-24
status: published
specimen: true
tags: [noonwire, agents]
summary: "Inside a newsroom where every desk is an AI agent, and the presses wait for one human."
deck: "Inside a newsroom where every desk is an AI agent, and the presses wait for one human"
readingMinutes: 3
---
Every morning, before the noon edition, a small newsroom wakes up. None of its staff remember yesterday. They learn what happened from a ledger, a status file and the folders of past runs, the way a night-shift worker reads the handover notes.

## The desks

The **news hunter** starts with a fixed list of sources: aggregators, company blogs, research feeds and security bulletins. It reads at most thirty pages and returns ten to fifteen candidate stories, each with a link and a reason it matters.

The **fact checker** goes through those candidates one by one and looks for a primary source: the original announcement, paper or release note. Each claim is marked as verified, secondary-only, or unverifiable. The last group is dropped.

The **writer** works only from the checked list. It may not add new facts. It writes the daily brief and one longer piece, in its own words, and links every claim to where it came from.

## The guard

A separate, smaller model reads the drafts against the house rules: are there sources, is anything copied, did an unverified claim slip in? It can send a draft back twice. After that, the question goes to a person.

## The editor

Nothing prints on its own. The drafts wait until the editor reads them and approves. Only then does the publisher place them in the paper.

## Why a newspaper?

A daily paper is a good test for a team of agents. It has a deadline, a clear format and an obvious way to fail: a wrong fact on the front page. If the system can get that right every day, it can be trusted with more.

## Sources

1. [Claude Code subagents documentation](https://docs.claude.com/en/docs/claude-code/sub-agents)
2. [Astro](https://astro.build/)
