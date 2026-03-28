# Agent Configuration

## System Modes

This system operates in two distinct modes:

| Mode | Trigger Commands | Output |
|------|------------------|--------|
| **Plan Mode** | `analyze project`, `start multi-agent workflow` | Planning documents in `.claude/outputs/` |
| **Build Mode** | `build project`, `implement plan` | Actual source code in project directories |

## Specialist Registry

| Specialist | Identifier | Expertise Area | Produces Code |
|------------|------------|----------------|---------------|
| Development Liaison | `development-liaison` | Project discovery, feasibility assessment, requirements gathering | No (spec only) |
| Planner | `project-planner` | Roadmap creation, task breakdown, dependency mapping | No |
| Frontend Specialist | `frontend-specialist` | UI/UX implementation, component architecture, state management | Yes |
| Backend Specialist | `backend-specialist` | Server-side logic, API implementation, business logic | Yes |
| Database Designer | `database-designer` | Schema design, data models, migrations, query optimization | Yes |
| API Designer | `api-designer` | REST/GraphQL design, endpoint structure, versioning | Yes |
| Security Specialist | `security-specialist` | Vulnerability assessment, security implementation, compliance | Yes |
| Code Reviewer | `code-reviewer` | Code quality, standards adherence, bug identification | No (review only) |
| Testing Specialist | `testing-specialist` | Test strategy, unit/integration/E2E tests, coverage | Yes |
| Performance Optimizer | `performance-optimizer` | Bottleneck identification, query/rendering optimization | No (advisory) |
| Accessibility Specialist | `accessibility-specialist` | WCAG compliance, screen reader support, inclusive design | No (advisory) |
| DevOps Engineer | `devops-engineer` | Deployment, CI/CD pipelines, containerization, infrastructure | Yes |
| Documentation Writer | `documentation-writer` | README files, API docs, user guides, inline comments | Yes |

## Workflow Phases

### Discovery Phase (Phase 0)

This phase gathers requirements and produces the project specification.

```
┌─────────────────────────────────────────────────────────────────┐
│                     Phase 0: Discovery                          │
│                                                                 │
│                 ┌─────────────────────┐                         │
│                 │ Development Liaison │                         │
│                 │  (User Interview)   │                         │
│                 └──────────┬──────────┘                         │
│                            │                                    │
│                            ▼                                    │
│                 ┌─────────────────────┐                         │
│                 │   project-spec.md   │                         │
│                 │    (completed)      │                         │
│                 └─────────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘

                    ════════════════════════
                    ║  SPEC APPROVAL GATE  ║
                    ════════════════════════
```

### Planning Phases (1-5)

These phases analyze requirements and produce planning documents.

```
┌─────────────────────────────────────────────────────────────────┐
│                     Phase 1: Foundation                         │
│                                                                 │
│                      ┌──────────────┐                           │
│                      │   Planner    │                           │
│                      └──────┬───────┘                           │
└─────────────────────────────┼───────────────────────────────────┘
                              │
┌─────────────────────────────┼───────────────────────────────────┐
│                     Phase 2: Design                             │
│                              │                                  │
│              ┌───────────────┼───────────────┐                  │
│              ▼               ▼               ▼                  │
│     ┌────────────┐   ┌────────────┐                             │
│     │  Database  │   │    API     │                             │
│     │  Designer  │   │  Designer  │                             │
│     └─────┬──────┘   └─────┬──────┘                             │
└───────────┼────────────────┼────────────────────────────────────┘
            │                │
┌───────────┼────────────────┼────────────────────────────────────┐
│           │  Phase 3: Implementation Planning                   │
│           │                │                                    │
│           ▼                ▼                                    │
│   ┌────────────┐   ┌────────────┐   ┌────────────┐              │
│   │  Backend   │   │  Frontend  │   │  Security  │              │
│   │ Specialist │   │ Specialist │   │ Specialist │              │
│   └─────┬──────┘   └─────┬──────┘   └─────┬──────┘              │
└─────────┼────────────────┼────────────────┼─────────────────────┘
          │                │                │
┌─────────┼────────────────┼────────────────┼─────────────────────┐
│         │  Phase 4: Quality & Operations Planning               │
│         │                │                │                     │
│         ▼                ▼                ▼                     │
│ ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐       │
│ │ Testing  │   │  Perf    │   │  A11y    │   │  DevOps  │       │
│ │Specialist│   │Optimizer │   │Specialist│   │ Engineer │       │
│ └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘       │
└──────┼──────────────┼──────────────┼──────────────┼─────────────┘
       │              │              │              │
┌──────┼──────────────┼──────────────┼──────────────┼─────────────┐
│      │         Phase 5: Plan Finalization                       │
│      │              │              │              │             │
│      └──────────────┴──────────────┴──────────────┘             │
│                            │                                    │
│                            ▼                                    │
│              ┌─────────────────────────┐                        │
│              │     Code Reviewer       │                        │
│              └───────────┬─────────────┘                        │
│                          │                                      │
│                          ▼                                      │
│              ┌─────────────────────────┐                        │
│              │  Documentation Writer   │                        │
│              └─────────────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘

                    ════════════════════════
                    ║  USER APPROVAL GATE  ║
                    ════════════════════════
```

### Implementation Phases (6-10)

These phases generate actual source code based on approved plans.

```
┌─────────────────────────────────────────────────────────────────┐
│                Phase 6: Project Scaffolding                     │
│                                                                 │
│     ┌────────────┐   ┌────────────┐                             │
│     │  DevOps    │   │  Database  │                             │
│     │ (Docker,   │   │ (Migrations│                             │
│     │  configs)  │   │  schemas)  │                             │
│     └─────┬──────┘   └─────┬──────┘                             │
└───────────┼────────────────┼────────────────────────────────────┘
            │                │
┌───────────┼────────────────┼────────────────────────────────────┐
│           │  Phase 7: Core Backend                              │
│           │                │                                    │
│           ▼                ▼                                    │
│   ┌────────────┐   ┌────────────┐   ┌────────────┐              │
│   │    API     │   │  Backend   │   │  Security  │              │
│   │ (OpenAPI,  │   │ (Routes,   │   │ (Auth,     │              │
│   │  routes)   │   │ services)  │   │ middleware)│              │
│   └─────┬──────┘   └─────┬──────┘   └─────┬──────┘              │
└─────────┼────────────────┼────────────────┼─────────────────────┘
          │                │                │
┌─────────┼────────────────┼────────────────┼─────────────────────┐
│         │  Phase 8: Frontend Implementation                     │
│         │                │                │                     │
│         ▼                ▼                ▼                     │
│              ┌─────────────────────────┐                        │
│              │   Frontend Specialist   │                        │
│              │   (Components, pages,   │                        │
│              │    state, routing)      │                        │
│              └───────────┬─────────────┘                        │
└──────────────────────────┼──────────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────────┐
│         Phase 9: Testing & Quality                              │
│                          │                                      │
│         ┌────────────────┼────────────────┐                     │
│         ▼                ▼                ▼                     │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│ │   Testing    │  │     Code     │  │   DevOps     │            │
│ │  (test files │  │   Reviewer   │  │  (CI/CD      │            │
│ │   fixtures)  │  │  (refactor)  │  │   pipelines) │            │
│ └──────┬───────┘  └──────┬───────┘  └──────┬───────┘            │
└────────┼─────────────────┼─────────────────┼────────────────────┘
         │                 │                 │
┌────────┼─────────────────┼─────────────────┼────────────────────┐
│        │    Phase 10: Documentation & Finalization              │
│        │                 │                 │                    │
│        └─────────────────┴─────────────────┘                    │
│                          │                                      │
│                          ▼                                      │
│            ┌─────────────────────────┐                          │
│            │  Documentation Writer   │                          │
│            │  (README, API docs,     │                          │
│            │   user guides)          │                          │
│            └─────────────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
```

## Handoff Protocol

When delegating to a specialist, include:

### For Discovery Mode:
```
DISCOVERY TASK FOR Development Liaison:
- Objective: Conduct project interview and complete specification
- Template Location: .claude/project-spec.md
- Organizational Context: [reference existing org context in spec]
- Required Deliverables: Completed project-spec.md, feasibility assessment
- Output Location: .claude/project-spec.md
- Next in Chain: User approval, then orchestrator
```

### For Planning Mode:
```
PLANNING TASK FOR [SPECIALIST NAME]:
- Objective: [specific planning goal]
- Context: [relevant project-spec excerpts]
- Prerequisites Completed: [list of completed specialist work]
- Required Deliverables: [planning documents needed]
- Output Location: .claude/outputs/[specialist-name]/
- Next in Chain: [next specialist or 'orchestrator-review']
```

### For Build Mode:
```
BUILD TASK FOR [SPECIALIST NAME]:
- Objective: [specific implementation goal]
- Planning Reference: .claude/outputs/[specialist-name]/report.md
- Tech Stack: [confirmed technologies]
- Code Location: [target directory, e.g., backend/]
- Dependencies: [other code that must exist first]
- Required Deliverables: [specific files to create]
- Next in Chain: [next specialist or 'orchestrator-review']
```

## Output Locations

### Discovery Outputs
| Specialist | Output |
|------------|--------|
| Development Liaison | `.claude/project-spec.md` (completed specification) |

### Planning Outputs
| Specialist | Output Directory |
|------------|-----------------|
| Planner | `.claude/outputs/planner/` |
| Frontend Specialist | `.claude/outputs/frontend-specialist/` |
| Backend Specialist | `.claude/outputs/backend-specialist/` |
| Database Designer | `.claude/outputs/database-designer/` |
| API Designer | `.claude/outputs/api-designer/` |
| Security Specialist | `.claude/outputs/security-specialist/` |
| Code Reviewer | `.claude/outputs/code-reviewer/` |
| Testing Specialist | `.claude/outputs/testing-specialist/` |
| Performance Optimizer | `.claude/outputs/performance-optimizer/` |
| Accessibility Specialist | `.claude/outputs/accessibility-specialist/` |
| DevOps Engineer | `.claude/outputs/devops-engineer/` |
| Documentation Writer | `.claude/outputs/documentation-writer/` |

### Implementation Outputs (Code)
| Specialist | Code Directory |
|------------|---------------|
| Database Designer | `database/` (migrations, schemas) |
| API Designer | `api/` (OpenAPI specs, route definitions) |
| Backend Specialist | `backend/` (server, routes, services) |
| Frontend Specialist | `frontend/` (components, pages, hooks) |
| Security Specialist | `backend/middleware/`, `backend/utils/` |
| Testing Specialist | `tests/` (unit, integration, e2e) |
| DevOps Engineer | Root (Dockerfile, docker-compose.yml, .github/) |
| Documentation Writer | `docs/`, root README.md |

## Adding New Specialists

To extend the system with a new specialist:

1. Create agent definition in `.claude/agents/[new-specialist].md`
2. Add entry to the Specialist Registry table above
3. Define dependencies in both planning and implementation workflow diagrams
4. Create output directory `.claude/outputs/[new-specialist]/`
5. Update the orchestrator's specialist list
6. Specify whether the specialist produces code (for Build Mode)
