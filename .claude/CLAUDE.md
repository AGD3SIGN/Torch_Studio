# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a **Multi-Agent Project Management System** - a reusable template for coordinating specialized AI agents to produce comprehensive project plans AND generate working codebases. It is designed to be cloned and used as a seed for new projects across an organization.

## Repository Structure

```
.                                 # Project Root
└── .claude/
    ├── README.md                 # GitHub repository documentation
    ├── CLAUDE.md                 # This file (Claude Code guidance)
    ├── project-spec.md           # Project specification template (user fills this)
    ├── agent-config.md           # Agent registry and workflow configuration
    ├── agents/                   # Agent definitions (14 specialists)
    │   ├── development-liaison.md  # NEW: First contact for project discovery
    │   ├── project-orchestrator.md
    │   ├── project-planner.md
    │   ├── frontend-specialist.md
    │   ├── backend-specialist.md
    │   ├── database-designer.md
    │   ├── api-designer.md
    │   ├── security-specialist.md
    │   ├── code-reviewer.md
    │   ├── testing-specialist.md
    │   ├── performance-optimizer.md
    │   ├── accessibility-specialist.md
    │   ├── devops-engineer.md
    │   └── documentation-writer.md
    └── outputs/              # Generated specialist reports
```

## System Modes

The system operates in three distinct modes:

| Mode | Commands | Output |
|------|----------|--------|
| **Discovery Mode** | `new project`, `start project`, `project interview`, `help me define my project` | Completed `.claude/project-spec.md` |
| **Plan Mode** | `analyze project`, `start multi-agent workflow` | Planning documents in `.claude/outputs/` |
| **Build Mode** | `build project`, `implement plan` | Working source code in project root |

## Commands

| Command | Description |
|---------|-------------|
| `new project` | **Discovery Mode**: Launches Development Liaison for project interview and spec completion |
| `start project` | **Discovery Mode**: Same as above - begins the discovery interview |
| `project interview` | **Discovery Mode**: Same as above - guided requirements gathering |
| `help me define my project` | **Discovery Mode**: Same as above - assisted spec completion |
| `analyze project` | **Plan Mode**: Reads `.claude/project-spec.md` and coordinates specialists to produce planning documents |
| `start multi-agent workflow` | **Plan Mode**: Same as above - begins the full planning workflow |
| `build project` | **Build Mode**: Generates actual source code based on approved plans |
| `implement plan` | **Build Mode**: Same as above - creates working codebase |
| `Initialize the multi-agent project management system` | Recreates directory structure and templates |

## Workflow

### Discovery Mode (Phase 0)
1. Clone repository to new project
2. Run `new project` to launch the Development Liaison
3. Participate in guided interview about project vision, features, and constraints
4. Development Liaison assesses feasibility and identifies contradictions
5. Review the completed `.claude/project-spec.md`

### Plan Mode (Phases 1-5)
6. Run `analyze project` to trigger the orchestrator
7. Specialists execute in dependency order across 5 phases
8. Review outputs in `.claude/outputs/[specialist]/`
9. Final deliverables: `.claude/project-plan.md` and `.claude/implementation-roadmap.md`

### Build Mode (Phases 6-10)
10. Review and approve the generated plan
11. Run `build project` to generate the codebase
12. Specialists generate actual code in dependency order
13. Code is placed in project root directories (backend, frontend, database, etc.)
14. Tests, Docker configs, and documentation are also generated

## Specialists

The system coordinates 13 specialists plus 1 orchestrator:

| Specialist | Discovery Mode | Plan Mode | Build Mode |
|------------|----------------|-----------|------------|
| **Development Liaison** | Project interview, feasibility, spec completion | N/A | N/A |
| **Orchestrator** | N/A | Coordinates workflow | Coordinates code generation |
| **Planner** | N/A | Roadmap, task breakdown | N/A (planning only) |
| **Database Designer** | N/A | Schema design | Migrations, ORM models, seeds |
| **API Designer** | N/A | Endpoint design | OpenAPI spec, route definitions |
| **Backend Specialist** | N/A | Architecture planning | Server code, controllers, services |
| **Frontend Specialist** | N/A | Component planning | React components, hooks, pages |
| **Security Specialist** | N/A | Threat assessment | Auth middleware, security utils |
| **Testing Specialist** | N/A | Test strategy | Test files, fixtures, configs |
| **Performance Optimizer** | N/A | Bottleneck analysis | Advisory (implemented by others) |
| **Accessibility Specialist** | N/A | WCAG requirements | Advisory (implemented by frontend) |
| **DevOps Engineer** | N/A | Infrastructure planning | Dockerfile, CI/CD, configs |
| **Code Reviewer** | N/A | Standards review | Code improvements, refactoring |
| **Documentation Writer** | N/A | Doc planning | README, API docs, guides |

## Generated Code Structure

After running Build Mode, the following structure is created:

```
.
├── backend/              # Server code (Backend Specialist)
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   └── middleware/
├── frontend/             # React app (Frontend Specialist)
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── services/
├── database/             # DB files (Database Designer)
│   ├── migrations/
│   ├── models/
│   └── seeds/
└── api/                  # API specs (API Designer)
    ├── openapi.yaml
    └── types/

tests/                    # Test files (Testing Specialist)
docs/                     # Documentation (Documentation Writer)
Dockerfile                # Container config (DevOps Engineer)
docker-compose.yml
.github/workflows/        # CI/CD (DevOps Engineer)
```

## Extending the System

To add a new specialist:
1. Create `.claude/agents/[new-specialist].md` following existing format
2. Add entry to `.claude/agent-config.md` specialist registry
3. Update workflow dependencies in agent-config.md
4. Create output directory `.claude/outputs/[new-specialist]/`
5. Specify whether the specialist produces code (for Build Mode)
