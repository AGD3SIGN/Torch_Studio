# Multi-Agent Project Management System

A reusable template for coordinating specialized AI agents to produce comprehensive project plans AND generate working codebases using [Claude Code](https://claude.ai/code).

## Overview

This system uses a project orchestrator to coordinate 13 specialist agents that analyze project requirements and produce detailed implementation plans. After approval, the same specialists can generate actual source code, tests, and documentation.

**Three Modes of Operation:**
- **Discovery Mode**: Interview process to gather requirements and fill out the project specification
- **Plan Mode**: Analyze requirements and produce planning documents
- **Build Mode**: Generate working source code based on approved plans

## Prerequisites

- Your secure dev environment
- [Claude Code CLI](https://claude.ai/code) installed and configured with at least the Pro subscription
- [GitHub for Desktop](https://desktop.github.com/download/)

## Installation

### Option 1: GitHub Desktop

1. Clone a repository: Select "project-seed" from OrthoArkansas' repositories.
2. Open the shell of your choice and navigate to the cloned repository:
    ```bash
    cd path/to/project
    claude
    ```

### Option 2: Add to Existing Project

Copy the `.claude/` directory to an existing project:

```bash
# From the root of your existing project
cp -r /path/to/multi-agent-project-system/.claude .
```

## Quick Start

### Step 1: Define Your Project (Discovery Mode)

**Option A**: Use the Development Liaison for guided discovery:
```
new project
```
or
```
project interview
```

The Development Liaison will:
- Interview you about your project idea
- Assess feasibility
- Identify key features
- Fill out `.claude/project-spec.md` automatically
- Check for contradictions in requirements

**Option B**: Manually edit `.claude/project-spec.md`:
```bash
code .claude/project-spec.md
```

### Step 2: Plan Your Project

In Claude Code, run:
```
analyze project
```
or
```
start multi-agent workflow
```

This produces:
- Specialist reports in `.claude/outputs/[specialist-name]/`
- Consolidated plan in `.claude/project-plan.md`
- Implementation roadmap in `.claude/implementation-roadmap.md`

### Step 3: Build Your Project

After reviewing and approving the plan, run:
```
build project
```
or
```
implement plan
```

This generates:
- Source code in project root.
- Test files in `tests/`
- Docker and CI/CD configurations
- Documentation in `docs/`

## Workflow Phases

### Discovery Mode (Phase 0)

```
Phase 0: Discovery
└── Development Liaison
    ├── Project interview
    ├── Feasibility assessment
    ├── Feature identification
    └── Contradiction analysis

       Output: Completed project-spec.md

═══════════════════════════════
     SPEC APPROVAL CHECKPOINT
═══════════════════════════════
```

### Plan Mode (Phases 1-5)

```
Phase 1: Foundation
└── Project Planner

Phase 2: Design (parallel)
├── Database Designer
└── API Designer

Phase 3: Implementation Planning (parallel)
├── Backend Specialist
├── Frontend Specialist
└── Security Specialist

Phase 4: Quality & Operations (parallel)
├── Testing Specialist
├── Performance Optimizer
├── Accessibility Specialist
└── DevOps Engineer

Phase 5: Finalization (sequential)
├── Code Reviewer
└── Documentation Writer

═══════════════════════════════
    USER APPROVAL CHECKPOINT
═══════════════════════════════
```

### Build Mode (Phases 6-10)

```
Phase 6: Project Scaffolding
├── DevOps Engineer (Docker, configs)
└── Database Designer (migrations, schemas)

Phase 7: Core Backend
├── API Designer (OpenAPI, routes)
├── Backend Specialist (server, services)
└── Security Specialist (auth, middleware)

Phase 8: Frontend Implementation
└── Frontend Specialist (components, pages)

Phase 9: Testing & Quality
├── Testing Specialist (test files)
├── Code Reviewer (improvements)
└── DevOps Engineer (CI/CD)

Phase 10: Documentation
└── Documentation Writer (README, docs)
```

## Available Specialists

| Specialist | Plan Mode Output | Build Mode Output |
|------------|------------------|-------------------|
| Development Liaison | Completed project-spec.md | N/A (Discovery Mode only) |
| Project Planner | Roadmap, tasks, dependencies | N/A |
| Database Designer | Schema design, ER diagrams | Migrations, ORM models, seeds |
| API Designer | Endpoint specs, response schemas | OpenAPI spec, route types |
| Backend Specialist | Architecture, service design | Controllers, services, repositories |
| Frontend Specialist | Component architecture | React components, hooks, pages |
| Security Specialist | Threat model, auth design | Auth middleware, security utils |
| Testing Specialist | Test strategy, coverage plan | Unit, integration, E2E tests |
| Performance Optimizer | Bottleneck analysis, caching | Advisory (others implement) |
| Accessibility Specialist | WCAG requirements | Advisory (frontend implements) |
| DevOps Engineer | Infrastructure plan | Dockerfile, docker-compose, CI/CD |
| Code Reviewer | Quality assessment | Code improvements |
| Documentation Writer | Documentation plan | README, API docs, guides |

## Directory Structure

```
.
├── CLAUDE.md                 # Claude Code guidance
├── README.md                 # This file
├── .gitignore                # Git ignore rules
├── .claude/
│   ├── project-spec.md       # Project specification (EDIT THIS)
│   ├── README.md             # Detailed system documentation
│   ├── agent-config.md       # Agent registry and workflows
│   ├── agents/               # Agent definitions
│   ├── outputs/              # Planning reports (generated)
│   ├── project-plan.md       # Consolidated plan (generated)
│   └── implementation-roadmap.md  # Roadmap (generated)
├── backend/                  # Server code
├── frontend/                 # React app
├── database/                 # Migrations, models
├── api/                      # OpenAPI, types
├── tests/                    # Test files (BUILD MODE)
├── docs/                     # Documentation (BUILD MODE)
├── Dockerfile                # Container config (BUILD MODE)
├── docker-compose.yml        # Docker compose (BUILD MODE)
└── .github/workflows/        # CI/CD pipelines (BUILD MODE)
```

## Customization

### Adding a New Specialist

1. Create agent definition:
   ```bash
   touch .claude/agents/my-specialist.md
   ```

2. Follow the agent template format:
   ```markdown
   ---
   name: my-specialist
   description: "Description of when to use this agent"
   tools: Glob, Grep, Read, WebFetch, WebSearch, Bash, TaskCreate, TaskGet, TaskUpdate, TaskList, Edit, Write
   model: sonnet
   ---

   ## Operating Modes

   | Mode | Trigger | Output |
   |------|---------|--------|
   | **Plan Mode** | `analyze project` | Planning doc in `.claude/outputs/my-specialist/` |
   | **Build Mode** | `build project` | Code in project root |

   ## PLAN MODE
   [Planning responsibilities]

   ## BUILD MODE
   [Code generation responsibilities]
   ```

3. Add to `.claude/agent-config.md` specialist registry

4. Create output directory:
   ```bash
   mkdir .claude/outputs/my-specialist
   ```

### Modifying Workflow Order

Edit the workflow dependencies in `.claude/agent-config.md` and update the orchestrator instructions in `.claude/agents/project-orchestrator.md`.

## Outputs

### After Plan Mode

| Output | Location | Description |
|--------|----------|-------------|
| Specialist Reports | `.claude/outputs/[specialist]/report.md` | Detailed analysis |
| Project Plan | `.claude/project-plan.md` | Consolidated findings |
| Implementation Roadmap | `.claude/implementation-roadmap.md` | Phased task list |

### After Build Mode

| Output | Location | Description |
|--------|----------|-------------|
| Backend Code | `backend/` | Server, controllers, services |
| Frontend Code | `frontend/` | React components, pages |
| Database | `database/` | Migrations, models, seeds |
| API Specs | `api/` | OpenAPI, type definitions |
| Tests | `tests/` | Unit, integration, E2E |
| Infrastructure | Root directory | Dockerfile, docker-compose |
| CI/CD | `.github/workflows/` | GitHub Actions pipelines |
| Documentation | `docs/`, `README.md` | User and developer docs |

## Troubleshooting

### Agents not loading
Ensure you're running Claude Code from the repository root directory where `.claude/` exists.

### Missing output directories
Run `Initialize the multi-agent project management system` in Claude Code to recreate the directory structure.

### Partial workflow completion
Check `.claude/outputs/` for completed specialist reports. You can resume by asking the orchestrator to continue from a specific phase.

### Build Mode prerequisites missing
Build Mode requires Plan Mode to complete first. Run `analyze project` before `build project`.

## Contributing

1. Fork this repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[Your License Here]
