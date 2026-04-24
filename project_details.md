# 🧘 ZenTab 1.0 — Complete Project Documentation

> **A controlled digital workspace designed for deep focus, structured learning, intentional browsing, and uncompromising user privacy.**

---

## 📋 Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Technology Stack](#3-technology-stack)
4. [Core Features — Desktop](#4-core-features--desktop)
5. [Security Architecture](#5-security-architecture)
6. [Mobile Companion App](#6-mobile-companion-app--zentab-mobile)
7. [Folder Structure — Desktop](#7-folder-structure--desktop)
8. [Folder Structure — Mobile](#8-folder-structure--mobile)
9. [GitHub Repository Setup](#9-github-repository-setup)
10. [Data Storage Architecture](#10-data-storage-architecture)
11. [UI/UX Design System](#11-uiux-design-system)
12. [Development Roadmap](#12-development-roadmap)
13. [Performance Targets](#13-performance-targets)
14. [Monetisation & Licensing](#14-monetisation--licensing)
15. [Future Scope](#15-future-scope)
16. [Contributing](#16-contributing)
17. [Appendix A — Environment Setup](#appendix-a--environment-setup)
18. [Appendix B — Keyboard Shortcuts](#appendix-b--keyboard-shortcuts)

---

## 1. Executive Summary

ZenTab 1.0 is a next-generation productivity browser engineered for students, researchers, and deep workers who demand both peak focus and enterprise-grade security. Built on **Electron** for desktop and **React Native** for mobile, ZenTab combines an intelligent browsing environment with AI-assisted study tools, a multi-layered security shield, and a fully synchronized mobile companion app.

Unlike consumer browsers optimised for engagement and advertising revenue, ZenTab is architected around **intentional, distraction-free computing**. Every feature — from the Pomodoro engine to the ML-powered phishing shield — is designed to reclaim users' time and protect their digital identity.

**What makes ZenTab different:**

- 🔒 8-layer security model built into the browser itself — no extensions needed
- 🧠 AI assistant (ZenAI) powered by Claude API with offline fallback via Ollama
- 📱 Full-featured mobile companion with real-time two-way sync
- ⏱️ Deep focus system: Pomodoro + ambient sound + strict mode
- 📊 Honest analytics: tracks your time, not your data
- 🚫 Intelligent website blocker with time-based rules and schedule integration

---

## 2. Project Overview

| Attribute | Details |
|---|---|
| **Project Name** | ZenTab 1.0 |
| **Type** | Desktop Browser (Electron) + Mobile Companion (React Native) |
| **Primary Platform** | Windows 10/11 · macOS 13+ · Linux (Ubuntu 22+) |
| **Mobile Platform** | iOS 16+ / Android 12+ |
| **Target Users** | Students, researchers, developers, deep-work professionals |
| **License** | MIT (open source core) + optional ZenTab Pro tier |
| **Desktop Repo** | `github.com/zentab-browser/zentab` |
| **Mobile Repo** | `github.com/zentab-browser/zentab-mobile` |
| **Current Version** | 1.0.0-beta |
| **Last Updated** | 2025 |

---

## 3. Technology Stack

### 3.1 Desktop Application

| Layer | Technology | Purpose |
|---|---|---|
| App Shell | Electron 32+ | Desktop runtime, native OS integration |
| Renderer | React 18 + Vite | UI component system, fast HMR dev experience |
| Styling | Tailwind CSS 3 + CSS Modules | Design system + component-scoped styles |
| Language | TypeScript 5 | Type safety across entire codebase |
| Browser Engine | Chromium (via Electron) | Web rendering, DevTools, extension support |
| State Management | Zustand + Immer | Lightweight, immutable global state |
| IPC | Electron IPC (allowlist-only) | Secure main ↔ renderer communication |
| Database | SQLite 3 (better-sqlite3) | Local persistent storage, WAL mode |
| Encryption | AES-256-GCM (node:crypto) | Vault, database, settings encryption |
| AI Integration | Anthropic Claude API + local Ollama | Page summariser, quiz generator, nudges |
| Build Tool | electron-builder + electron-forge | Packaging, auto-updates, code signing |
| Testing | Vitest + Playwright | Unit tests + E2E browser automation |

### 3.2 Mobile Companion App

| Layer | Technology | Purpose |
|---|---|---|
| Framework | React Native 0.74 + Expo SDK 51 | Cross-platform mobile (iOS + Android) |
| Navigation | React Navigation 6 | Stack, tab, and drawer navigation |
| State | Zustand + React Query | Global state + server state caching |
| Styling | NativeWind (Tailwind for RN) | Consistent design language with desktop |
| Local DB | WatermelonDB | Offline-first reactive database |
| Sync | WebSocket + REST (Fastify server) | Real-time desktop ↔ mobile sync |
| Auth | expo-local-authentication | Face ID / fingerprint for vault access |
| Push Alerts | Expo Notifications + FCM/APNs | Focus alerts, break reminders, badges |
| Animations | React Native Reanimated 3 | Fluid 60fps gestures and transitions |
| Build/Deploy | EAS Build + EAS Submit | Cloud builds, App Store / Play Store |

---

## 4. Core Features — Desktop

### 4.1 Browser Engine

- Multi-tab Chromium rendering via Electron `WebContentsView`
- Tab hibernation after 10 minutes idle — reduces RAM by up to 60%
- Custom user-agent rotation to reduce passive fingerprinting
- Session isolation: each tab optionally runs in a separate renderer process
- DevTools integration (togglable; disabled in Focus Lock mode)
- Extension support: selective whitelist-only (no Chrome Web Store bulk installs)

### 4.2 Smart Address Bar & Navigation

- Unified URL / search bar with real-time protocol detection (`http` / `https` / `ftp` / `file`)
- Fallback search engine selection: Google, DuckDuckGo, Brave Search, Kagi
- History-based smart suggestions with fuzzy matching (Fuse.js)
- Inline security badge: HTTPS grade, tracker count blocked, DoH status
- Keyboard-first navigation with optional Vim-style shortcuts (`H` back, `L` forward, `R` reload)
- Tab bar with drag-and-drop reordering and middle-click-to-close

### 4.3 Focus Mode 1.0

- Full-screen immersive overlay with session block counter (e.g., "Block 3 of 4")
- Customisable Pomodoro intervals: work / short break / long break (defaults: 25 / 5 / 15 min)
- Auto-start next session with configurable grace period (0–60 seconds)
- Ambient soundscapes: rain, brown noise, lo-fi beats (bundled offline, no internet needed)
- Focus Score calculated in real-time: penalises tab switches, blocked site attempts, early exits
- **Strict Mode**: requires desktop password OR mobile biometric to exit session early

### 4.4 Website Blocker (Enhanced)

- Domain and URL-pattern blocking with wildcard support (e.g., `*.reddit.com/r/*`)
- Time-based rules: "block social media Monday–Friday 09:00–18:00"
- **Soft Mode**: 15-second delay prompt — user must type reason to override (logged)
- **Strict Mode**: absolute block — no bypass until current Pomodoro session ends
- Schedule integration: auto-block distracting sites during timetable study blocks
- Fully customisable block page with motivational quote, streak counter, and timer

### 4.5 Smart Dashboard (Home Screen)

- Daily goals with priority tags: Study, Health, Work, Personal
- Week-view study timetable with per-subject colour coding
- Motivational prompt engine: rotates quotes, personal stats, current streak
- Quick-access shortcuts: pinned sites, recent notes, upcoming timetable events
- Live focus score, session count, and daily time-on-task summary

### 4.6 Notes Panel

- Slide-out right panel with Markdown + rich text editing (TipTap editor)
- Subject/category tagging with colour labels
- Auto-save every 30 seconds; SQLite-backed with full revision history
- Full-text search across all notes (FTS5 SQLite extension)
- Export to PDF, Markdown `.md`, or plain text `.txt`
- Real-time sync to mobile companion app via WebSocket

### 4.7 Activity Tracker & Analytics

- Per-site time tracking with automatic Productive / Neutral / Distracting classification
- User-configurable site categories with ML-suggested defaults
- Daily, weekly, and monthly reports with trend sparklines (Chart.js)
- **Focus Score**: weighted composite of focus time, blocked diversions, Pomodoros completed
- CSV / JSON export for personal data portability
- Streak tracking: consecutive focused days with milestone badges

### 4.8 AI Assistant (ZenAI)

- One-click page summarisation via Claude API (or local Ollama for offline privacy mode)
- Quiz generation from active tab content or personal notes
- Smart study nudges: surfaces under-reviewed topics based on timetable and note history
- Context-aware chat: aware of current session, today's goals, and upcoming timetable
- Citation extraction from research papers (arXiv, PubMed, Google Scholar)
- **Privacy Mode**: all AI inference runs fully locally via Ollama — zero cloud calls

### 4.9 Utility Panel

- Scientific calculator with history and formula editor
- Dictionary / thesaurus via Free Dictionary API (with offline fallback word list)
- Unit and currency converter (offline base rates + optional live update)
- Quick colour picker and contrast checker
- World clock, countdown timer, and Pomodoro mini-widget

---

## 5. Security Architecture

ZenTab 1.0 implements an **8-layer defence-in-depth security model**. Each layer operates independently so that failure of any single layer does not compromise the overall security posture.

### 5.1 Security Layers Overview

| Layer | Component | Mechanism | Default |
|---|---|---|---|
| L1 | DNS over HTTPS (DoH) | All DNS queries via Cloudflare / NextDNS encrypted tunnel (port 443) | ON |
| L2 | Tracker & Ad Blocker | EasyList + EasyPrivacy filter engine compiled locally (no network needed) | ON |
| L3 | Browser Fingerprint Guard | Canvas, WebGL, audio context, font enumeration — all randomised per session | ON |
| L4 | Cookie Isolation | Per-tab cookie partitioning — no cross-site tracking even on same browser | ON |
| L5 | AES-256 Password Vault | Local encrypted vault; master key derived via Argon2id (100k iterations) | Opt-in |
| L6 | Phishing Shield (ML) | Local ONNX model scores URLs + page content for phishing signals (< 5ms) | ON |
| L7 | Clipboard Guard | Blocks JS `clipboard.read()` without explicit user gesture; sanitises pasted text | ON |
| L8 | VPN Integration | WireGuard tunnel via OS-level network extension | Opt-in |

### 5.2 Electron Security Hardening

```
nodeIntegration:    false   — renderer cannot access Node.js APIs directly
contextIsolation:   true    — typed preload bridge is the only IPC surface
sandbox:            true    — all WebContents run in OS-level sandboxed process
webSecurity:        true    — always enforced, never disabled (not even in dev)
IPC allowlist:      named channels only — wildcard ipcRenderer.on is blocked
CSP injection:      no unsafe-eval, no unsafe-inline on all internal pages
openExternal:       gated behind user confirmation dialog
Auto-updater:       Ed25519 signature verification on every update package
```

### 5.3 Data Encryption at Rest

| Data | Storage | Encryption |
|---|---|---|
| Notes, goals, timetable | SQLite (SQLCipher) | AES-256-CBC |
| Password Vault entries | SQLite (SQLCipher) | AES-256-GCM + Argon2id key derivation |
| Settings & sync tokens | OS Keychain (keytar) | OS-managed (Keychain / Credential Store) |
| Activity logs | SQLite | None (not sensitive; PII-stripped) |
| AI conversation history | SQLite (SQLCipher) | AES-256-CBC |

- Vault master password is **never stored** — only a salted Argon2id-derived key hash
- Log files are stripped of all URLs, usernames, and PII before writing to disk
- All inter-process data uses structured clone serialisation — no `eval()` paths

### 5.4 Phishing Shield — ML Pipeline

```
Request arrives
      │
      ▼
Stage 1 — URL Feature Extraction
  • URL length, entropy, TLD reputation, homograph character detection
  • Looks for: typosquatting, punycode tricks, excessive subdomains
      │
      ▼
Stage 2 — ONNX Classifier  (< 5ms, runs in worker thread off main thread)
  • Gradient-boosted tree model trained on PhishTank + OpenPhish datasets
  • Outputs: SAFE / SUSPICIOUS / PHISHING with confidence score
      │
      ▼
Stage 3 — Page Content Analysis  (runs after page load)
  • Checks: login form presence, SSL mismatch, brand logo vs domain mismatch
  • Flags: hidden iframes, credential harvesting patterns
      │
      ▼
Verdict:
  SAFE       → green badge in address bar
  WARN       → yellow badge + non-blocking notification
  BLOCK      → full-page red overlay with escape hatch (logged if bypassed)

Model updates: weekly delta sync from ZenTab CDN (Ed25519 signature verified)
```

---

## 6. Mobile Companion App — ZenTab Mobile

ZenTab Mobile is a fully-featured React Native companion app that extends the desktop experience to iOS and Android. It is not a stripped-down remote control — it is a complete productivity tool with offline capability and real-time two-way sync.

### 6.1 Core Mobile Features

#### 6.1.1 Remote Focus Control
- Start, pause, and skip Pomodoro sessions from your phone while desktop is running
- Receive push notifications for break reminders and session completions
- **Lock / unlock desktop Focus Mode using biometric auth on mobile** (Face ID / fingerprint)
- Home screen widget showing live desktop focus score and session progress (iOS 16 / Android 12)

#### 6.1.2 Synced Notes
- Full Markdown editor — all notes created on desktop appear instantly on mobile
- Offline-first: WatermelonDB caches all notes locally; syncs automatically when reconnected
- Voice-to-note: dictate notes using on-device Whisper.cpp (fully offline, no cloud STT)
- Attach photos from camera roll directly to notes

#### 6.1.3 Study Planner & Goals
- Week-view timetable with subject colour coding (mirrors desktop dashboard exactly)
- Goal creation and completion check-off from mobile
- Smart reminders: 5-minute push alert before each study block
- Streak tracking visible in lock screen widgets and notification summaries

#### 6.1.4 Activity Dashboard
- View desktop browsing analytics, daily focus scores, and full streak history
- Weekly summary push notification delivered every Sunday evening
- Gamified productivity: milestone badges (7-day streak, 50 Pomodoros, 100 blocks avoided, etc.)

#### 6.1.5 Security Companion
- View and copy passwords from Vault via biometric authentication
- Approve or deny desktop VPN connection toggle from mobile (2FA-style)
- Instant push alert if Phishing Shield blocks a site on the desktop
- Optional: two-factor desktop session login via mobile push approval

### 6.2 Sync Architecture

```
Transport:    WebSocket (TLS 1.3) for real-time events
              REST API (Fastify) for bulk data sync and initial load

Discovery:    mDNS / Bonjour for automatic LAN discovery — no cloud needed
              Falls back to ZenTab Relay Server (self-hostable, MIT licensed)

Encryption:   All payloads encrypted with X25519 ECDH session key
              Perfect forward secrecy — new key per session

Conflict:     Notes use per-field vector clocks (last-write-wins per field)
              Goals and timetable use server timestamp (desktop = source of truth)

Offline:      WatermelonDB queues all changes locally
              Retries on reconnect with exponential backoff — zero data loss
```

### 6.3 Mobile Screens

| Screen | Description |
|---|---|
| Home / Dashboard | Focus score, today's goals, current Pomodoro status, quick actions |
| Notes | Note list + full TipTap-style Markdown editor, voice-to-note button |
| Focus | Pomodoro ring, start/pause/skip controls, ambient sound picker |
| Planner | Week-view timetable, add/edit study blocks, subject management |
| Analytics | Time-on-task charts, streak calendar, milestone badges |
| Vault | Biometric-gated password list, copy-to-clipboard, add entry |
| Security | Live security status from desktop, phishing alerts, VPN toggle |
| Settings | Sync config, notification preferences, theme, account, Pro upgrade |

---

## 7. Folder Structure — Desktop

```
zentab/
│
├── main/                          # Electron main process
│   ├── index.ts                   # App entry point, window creation
│   ├── ipc/                       # IPC channel handlers (allowlist-enforced)
│   ├── security/
│   │   ├── doh-resolver.ts        # DNS over HTTPS (Cloudflare / NextDNS)
│   │   ├── tracker-blocker.ts     # Filter engine (EasyList + EasyPrivacy)
│   │   ├── fingerprint-guard.ts   # Canvas / WebGL / audio spoofing injector
│   │   ├── phishing-shield.ts     # ONNX model loader + pipeline orchestrator
│   │   ├── csp-injector.ts        # CSP header injection on all pages
│   │   └── clipboard-guard.ts     # Clipboard access interceptor
│   ├── updater/                   # electron-updater, signature verification
│   └── preload/                   # Typed preload bridge (contextBridge)
│
├── renderer/                      # React 18 app (all UI)
│   ├── main.tsx                   # React root, router, providers
│   ├── components/                # Shared UI components
│   │   ├── Tabs/                  # Tab bar, tab pill, drag-and-drop
│   │   ├── AddressBar/            # URL input, security badge, suggestions
│   │   ├── Toolbar/               # Nav buttons, action icons
│   │   ├── Sidebar/               # Icon nav sidebar
│   │   └── StatusBar/             # Bottom status strip
│   │
│   ├── features/
│   │   ├── focus/                 # Focus overlay, Pomodoro engine, ambient audio
│   │   ├── notes/                 # TipTap editor, note list, FTS search, export
│   │   ├── blocker/               # Block rule manager, schedule editor, block page
│   │   ├── analytics/             # Activity tracker, Chart.js reports, streaks
│   │   ├── ai/                    # ZenAI panel, Claude API client, Ollama bridge
│   │   ├── vault/                 # Password vault UI, AES-256-GCM, Argon2id KDF
│   │   ├── dashboard/             # Smart dashboard, goals, timetable, shortcuts
│   │   └── utility/               # Calculator, dictionary, converter, clock
│   │
│   └── store/                     # Zustand global state slices
│
├── styles/                        # Tailwind config, CSS tokens, themes
├── data/                          # SQLCipher DB, filter lists, ONNX model
├── assets/                        # App icons, ambient audio, fonts
├── config/                        # App config, default settings schema
├── utils/                         # URL parser, crypto helpers, logger (PII-stripped)
│
├── tests/
│   ├── unit/                      # Vitest unit tests (all feature modules)
│   └── e2e/                       # Playwright E2E (tabs, focus, vault, blocker)
│
├── .github/
│   ├── workflows/                 # CI/CD GitHub Actions
│   ├── ISSUE_TEMPLATE/            # Bug report, feature request, security disclosure
│   └── PULL_REQUEST_TEMPLATE.md
│
├── electron-builder.config.js
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── package.json
├── CONTRIBUTING.md
├── SECURITY.md
└── README.md
```

---

## 8. Folder Structure — Mobile

```
zentab-mobile/
│
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── NotesScreen.tsx
│   │   ├── FocusScreen.tsx
│   │   ├── PlannerScreen.tsx
│   │   ├── AnalyticsScreen.tsx
│   │   ├── VaultScreen.tsx
│   │   ├── SecurityScreen.tsx
│   │   └── SettingsScreen.tsx
│   │
│   ├── components/               # Reusable UI
│   │   ├── PomodoroRing.tsx
│   │   ├── GoalCard.tsx
│   │   ├── NoteEditor.tsx
│   │   ├── SecurityBadge.tsx
│   │   ├── StreakCalendar.tsx
│   │   └── BiometricGate.tsx
│   │
│   ├── store/                    # Zustand slices
│   │   ├── focusStore.ts
│   │   ├── notesStore.ts
│   │   ├── goalsStore.ts
│   │   ├── syncStore.ts
│   │   └── authStore.ts
│   │
│   ├── sync/
│   │   ├── websocket-client.ts   # Real-time sync client
│   │   ├── rest-client.ts        # Bulk sync REST client
│   │   ├── conflict-resolver.ts  # Vector clock conflict resolution
│   │   └── offline-queue.ts      # Queue + retry on reconnect
│   │
│   ├── db/
│   │   ├── schema.ts             # WatermelonDB schema
│   │   ├── migrations/           # DB migration files
│   │   └── models/               # Note, Goal, Session, SyncLog models
│   │
│   ├── notifications/
│   │   ├── handler.ts            # Expo push notification handler
│   │   ├── scheduler.ts          # Break reminder + goal alert scheduler
│   │   └── fcm-apns.ts           # FCM (Android) + APNs (iOS) config
│   │
│   ├── ai/
│   │   ├── whisper-bridge.ts     # On-device voice-to-note (Whisper.cpp)
│   │   └── summariser.ts         # Mobile page summariser (Ollama bridge)
│   │
│   └── security/
│       ├── vault-crypto.ts       # AES-256-GCM vault encryption
│       ├── biometric-auth.ts     # expo-local-authentication wrapper
│       └── keychain-helpers.ts   # Secure storage (expo-secure-store)
│
├── assets/                       # Icons, splash, fonts, audio
├── __tests__/                    # Jest unit tests
├── e2e/                          # Detox E2E test suites
├── app.config.ts                 # Expo app config
├── eas.json                      # EAS Build profiles
└── package.json
```

---

## 9. GitHub Repository Setup

### 9.1 Repository Ecosystem

| Repository | URL | Description |
|---|---|---|
| zentab | `github.com/zentab-browser/zentab` | Main desktop Electron app |
| zentab-mobile | `github.com/zentab-browser/zentab-mobile` | React Native iOS + Android app |
| zentab-relay | `github.com/zentab-browser/zentab-relay` | Self-hostable WebSocket sync relay server |
| zentab-filters | `github.com/zentab-browser/zentab-filters` | Tracker/ad filter lists (auto-updated daily) |
| zentab-phishing-model | `github.com/zentab-browser/zentab-phishing-model` | ONNX phishing model training pipeline |
| zentab-site | `github.com/zentab-browser/zentab-site` | Landing page + documentation website |

### 9.2 Branch Strategy

| Branch | Purpose | Protection Rules |
|---|---|---|
| `main` | Stable release — tagged versions only | 2 reviews + all CI green + signed commits |
| `develop` | Integration branch for features | 1 review + CI green |
| `feature/*` | Individual feature branches | CI green |
| `fix/*` | Bug fix branches | CI green |
| `release/*` | Release preparation (version bump, changelog) | 2 reviews + maintainer approval |
| `hotfix/*` | Emergency patches directly to main | 1 review + maintainer approval |

### 9.3 GitHub Actions CI/CD Workflows

```
.github/workflows/

├── ci.yml
│   Trigger:  Push to feature/*, PR to develop
│   Steps:    ESLint + Prettier → tsc type-check → Vitest unit tests → Playwright E2E
│
├── release.yml
│   Trigger:  Tag push to main (e.g. v2.1.0)
│   Steps:    Build installers (Win/macOS/Linux) → Code sign → Upload → Publish GitHub Release
│
├── mobile-ci.yml
│   Trigger:  PR to develop (zentab-mobile repo)
│   Steps:    ESLint → Jest tests → Detox E2E (iOS simulator + Android emulator)
│
├── mobile-release.yml
│   Trigger:  Tag push (zentab-mobile repo)
│   Steps:    EAS Build (iOS + Android) → EAS Submit → App Store / Play Store
│
├── security-scan.yml
│   Trigger:  Weekly cron (Monday 00:00 UTC) + every PR to develop
│   Steps:    npm audit → Snyk SAST → CodeQL analysis → ONNX model integrity check
│
└── filter-update.yml
    Trigger:  Daily cron (03:00 UTC)
    Steps:    Fetch latest EasyList/EasyPrivacy → validate → commit to zentab-filters
```

### 9.4 Issue & PR Templates

**Bug Report** — includes: OS + version, steps to reproduce, expected vs actual, log snippet, severity

**Feature Request** — includes: problem statement, proposed solution, alternatives considered, user impact

**Security Vulnerability** — private disclosure via GitHub Security Advisories only (never public issues)

**Pull Request** — includes: linked issue, change type (feat/fix/perf/security), testing checklist, screenshots/video

> `CODEOWNERS`: `main/security/` and `renderer/features/vault/` require maintainer review on all PRs

### 9.5 Versioning & Releases

- **Semantic Versioning**: `MAJOR.MINOR.PATCH` (e.g., `2.1.0`)
- Changelogs auto-generated from **Conventional Commits** using `release-please`
- GitHub Releases include: signed installers, SHA-256 checksums file, and full release notes
- **Beta channel**: pre-release tags (e.g., `2.1.0-beta.3`) for opt-in testers
- Auto-updater uses GitHub Releases API — no custom update server required for the free tier

### 9.6 Recommended README Badges

```markdown
![CI](https://github.com/zentab-browser/zentab/actions/workflows/ci.yml/badge.svg)
![Release](https://img.shields.io/github/v/release/zentab-browser/zentab)
![License](https://img.shields.io/github/license/zentab-browser/zentab)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)
![Mobile](https://img.shields.io/badge/mobile-iOS%20%7C%20Android-green)
![Security](https://img.shields.io/badge/security-8--layer-purple)
```

---

## 10. Data Storage Architecture

| Data Type | Storage | Encryption | Syncs to Mobile |
|---|---|---|---|
| Notes | SQLite (SQLCipher) | AES-256-CBC | ✅ Real-time WebSocket |
| Goals & timetable | SQLite (SQLCipher) | AES-256-CBC | ✅ Real-time WebSocket |
| Blocked site rules | SQLite | None (not sensitive) | ✅ On connect |
| Activity / usage stats | SQLite | None | ✅ Daily batch |
| Password Vault | SQLite (SQLCipher) | AES-256-GCM + Argon2id | ❌ Never synced |
| Settings & preferences | SQLite + OS Keychain | Keychain-managed | ⚠️ Non-sensitive only |
| AI conversation history | SQLite (SQLCipher) | AES-256-CBC | ❌ Desktop only |
| Streaks & badge data | SQLite | None | ✅ On connect |
| Cached filter lists | File system (.dat) | SHA-256 integrity | ❌ Not needed |
| ONNX phishing model | File system (.onnx) | SHA-256 integrity check | ❌ Not needed |

---

## 11. UI/UX Design System

### 11.1 Design Principles

- **Minimalism with purpose** — no decorative elements; every pixel earns its place
- **Focus-first layout** — content area maximised, chrome minimised
- **Adaptive density** — compact mode for small screens, comfortable mode default
- **Accessibility** — WCAG 2.1 AA: full keyboard nav, screen reader labels, focus rings
- **Consistent motion** — easing curves in CSS tokens; durations: 150ms (micro) / 300ms (transition)

### 11.2 Colour Tokens

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--color-accent` | `#6C63FF` | `#8B85FF` | Primary actions, active states, links |
| `--color-accent-green` | `#00C896` | `#00E5AD` | Success, productive sites, secure badge |
| `--color-accent-red` | `#FF6B6B` | `#FF8585` | Danger, blocked sites, phishing alert |
| `--color-accent-yellow` | `#FFD93D` | `#FFE566` | Warnings, soft blocks, VPN disconnected |
| `--color-bg-primary` | `#FFFFFF` | `#0A0B0F` | Main window background |
| `--color-bg-surface` | `#F8F8FC` | `#111318` | Panels, sidebars, tab bar |
| `--color-bg-raised` | `#FFFFFF` | `#181B22` | Cards, dropdowns, modals |
| `--color-text-primary` | `#1A1A2E` | `#E8EAF0` | Body text, headings |
| `--color-text-secondary` | `#555A6B` | `#8B90A0` | Labels, metadata, placeholders |

### 11.3 Layout Zones

| Zone | Height / Width | Contents |
|---|---|---|
| Title Bar | 40px | Window controls, app name, global status badge |
| Tab Bar | 40px | Tab pills, add tab, drag-to-reorder |
| Toolbar | 48px | Nav buttons, address bar + security badge, action icons |
| Sidebar (Left) | 52px collapsed / 200px expanded | Dashboard, Focus, Blocker, Analytics, Planner, Utility, AI, Vault |
| Content Area | Remaining height | Web renderer OR Dashboard view |
| Notes Panel (Right) | 0px collapsed / 240px expanded | TipTap editor, note list, search |
| Status Bar | 24px | Security status, RAM, tab count, session time, sync status |

### 11.4 Themes

- **Dark Mode** (default) — deep navy/charcoal backgrounds, purple accent
- **Light Mode** — clean white surfaces, same purple accent
- **Custom accent colours** — user-selectable from 8 preset accent ramps
- Theme stored in settings; applied instantly with CSS variable swap (no reload)

---

## 12. Development Roadmap

| Phase | Duration | Milestone | Key Deliverables |
|---|---|---|---|
| Phase 1 | Week 1–2 | Core Browser | Electron shell, multi-tab WebContentsView, address bar, navigation, preload bridge |
| Phase 2 | Week 3–4 | Security Foundation | DoH resolver, tracker blocker, context isolation, CSP injection, HTTPS badge |
| Phase 3 | Week 5–6 | Dashboard & Focus | Smart dashboard, Pomodoro engine, website blocker with time-rules, ambient audio |
| Phase 4 | Week 7–8 | Notes & Analytics | TipTap notes panel, SQLCipher DB, activity tracker, Chart.js analytics |
| Phase 5 | Week 9–10 | AI & Vault | ZenAI panel (Claude API + Ollama), password vault (Argon2id + AES-256-GCM) |
| Phase 6 | Week 11–12 | Mobile Companion | React Native scaffold, WebSocket sync, remote Pomodoro, push notifications |
| Phase 7 | Week 13–14 | Polish & Testing | Playwright E2E suite, Detox mobile tests, accessibility audit, dark mode |
| Phase 8 | Week 15–16 | Release | Code signing, EAS Build/Submit, GitHub Release pipeline, documentation site |

---

## 13. Performance Targets

| Metric | Target | How Measured |
|---|---|---|
| App cold start to interactive | < 2.5 seconds | Playwright: time-to-first-paint on Dashboard |
| Hibernated tab RAM | < 80 MB per tab | Electron process memory snapshot |
| Active tab RAM | < 250 MB per renderer | Electron process memory snapshot |
| Phishing ML inference | < 5 ms per URL | `perf.now()` in worker thread benchmark |
| Tracker block latency | < 1 ms per request | WebRequest timing in main process |
| Note auto-save (SQLite WAL) | < 30 ms | better-sqlite3 timing wrapper |
| WebSocket sync (LAN) | < 100 ms desktop → mobile | Ping/pong RTT measurement |
| Renderer bundle size | < 4 MB gzipped | Vite bundle analyser |
| Mobile app download size | < 60 MB | EAS build output / App Store Connect |
| Lighthouse accessibility | ≥ 90 | Playwright + Lighthouse CI in GitHub Actions |

---

## 14. Monetisation & Licensing

| Tier | Price | Features |
|---|---|---|
| **ZenTab Free** | Free forever | Core browser, basic focus mode, notes, website blocker, tracker blocker, GitHub download |
| **ZenTab Pro** | $5/mo or $40/yr | AI Assistant (Claude API quota), Password Vault, Mobile Companion app, advanced analytics, VPN, priority support |
| **ZenTab Student** | $2/mo (with `.edu` email) | All Pro features at student discount |
| **ZenTab Team** | $8/user/mo | All Pro + shared workspaces, admin dashboard, team analytics, SSO, self-hosted relay |

The core desktop browser is **MIT-licensed and free forever**. Pro features use a server-side JWT licence check. The relay server and phishing model training pipeline are also MIT-licensed for full self-hosting.

---

## 15. Future Scope

### 15.1 Advanced AI
- On-device LLM for full offline AI (llama.cpp via Node addon — no Ollama install needed)
- AI-powered tab grouping: automatically clusters related research tabs by topic
- Reading difficulty estimator: highlights complex passages and suggests re-reading
- Automated citation manager: BibTeX / APA export from detected academic paper sources

### 15.2 Collaboration
- Shared study sessions: real-time collaborative browsing with cursor/pointer sharing
- Study group Pomodoro: synchronised timers across multiple ZenTab users
- Shared note spaces: team notebooks with role-based access control

### 15.3 Platform Expansion
- Chrome Extension: ZenTab Companion for users not on the Electron app
- macOS native menus, Touch Bar, and Spotlight integration
- Linux: Flatpak, AppImage, and Snap distribution
- iPadOS: split-view optimised layout for tablet-first study sessions

### 15.4 Integrations
- Google Calendar / iCal: auto-import study schedule for blocker and Pomodoro
- Notion / Obsidian: two-way note sync via their respective APIs
- Anki: export notes as flashcard decks (Anki-connect API)
- GitHub Student Developer Pack: free Pro tier for verified students

---

## 16. Contributing

ZenTab is open source and welcomes contributions. Please read `CONTRIBUTING.md` in the repository before submitting a PR.

- Fork the repository and create a branch from `develop`
- Follow **Conventional Commits** specification for all commit messages (`feat:`, `fix:`, `perf:`, `security:`)
- Ensure all unit and E2E tests pass locally before opening a PR
- Security vulnerabilities must be reported via **GitHub Security Advisories** — never in public issues
- UI changes require screenshots or a screen recording in the PR description
- New features require corresponding Vitest unit tests and a Playwright E2E scenario

> ⚠️ **Security Disclosure**: If you find a vulnerability, use GitHub's private Security Advisory:
> `github.com/zentab-browser/zentab/security/advisories/new`
> We triage all reports within **48 hours** and patch within **14 days**.

---

## Appendix A — Environment Setup

### Desktop

```bash
# Prerequisites: Node.js 20 LTS, Git, Python 3.11

# 1. Clone the repo
git clone https://github.com/zentab-browser/zentab.git
cd zentab

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Add your ANTHROPIC_API_KEY for ZenAI features (optional — Ollama works offline)

# 4. Run in development (Electron + Vite HMR)
npm run dev

# 5. Run unit tests
npm run test

# 6. Run E2E tests (requires built app)
npm run test:e2e

# 7. Build installer for your platform
npm run build
# Output: dist/ZenTab-Setup-1.0.0.exe (Win) | dist/ZenTab-1.0.0.dmg (macOS) | dist/ZenTab-1.0.0.AppImage (Linux)
```

### Mobile

```bash
# Prerequisites: Node.js 20 LTS, Expo CLI

# 1. Clone the mobile repo
git clone https://github.com/zentab-browser/zentab-mobile.git
cd zentab-mobile

# 2. Install dependencies
npm install
npx expo install

# 3. Run on iOS (requires macOS + Xcode)
npx expo run:ios

# 4. Run on Android (requires Android Studio)
npx expo run:android

# 5. Run Jest unit tests
npm run test

# 6. Run Detox E2E tests
npx detox test --configuration ios.sim.debug

# 7. Build for stores (EAS)
npx eas build --platform all
npx eas submit --platform all
```

---

## Appendix B — Keyboard Shortcuts

| Action | Windows / Linux | macOS |
|---|---|---|
| New Tab | `Ctrl+T` | `Cmd+T` |
| Close Tab | `Ctrl+W` | `Cmd+W` |
| Reopen Closed Tab | `Ctrl+Shift+T` | `Cmd+Shift+T` |
| Switch to Tab N | `Ctrl+1–9` | `Cmd+1–9` |
| Toggle Focus Mode | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| Toggle Notes Panel | `Ctrl+Shift+N` | `Cmd+Shift+N` |
| Open AI Assistant | `Ctrl+Shift+A` | `Cmd+Shift+A` |
| Address Bar Focus | `Ctrl+L` / `Alt+D` | `Cmd+L` |
| Block Current Site | `Ctrl+Shift+B` | `Cmd+Shift+B` |
| Toggle Sidebar | `Ctrl+\` | `Cmd+\` |
| Open Vault | `Ctrl+Shift+V` | `Cmd+Shift+V` |
| Summarise Page (AI) | `Ctrl+Shift+S` | `Cmd+Shift+S` |
| Open Settings | `Ctrl+,` | `Cmd+,` |
| Developer Tools | `F12` (not in Focus Lock) | `Cmd+Option+I` |
| Zoom In / Out | `Ctrl++` / `Ctrl+-` | `Cmd++` / `Cmd+-` |
| Full Screen | `F11` | `Ctrl+Cmd+F` |

---

*End of ZenTab 1.0 Project Documentation*
*github.com/zentab-browser/zentab · 2025 · MIT License*