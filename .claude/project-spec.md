# Project Specification

## Project Overview
- **Project Name**: [Name]
- **Problem Statement**: [Why this app?]
- **Description**: [Brief description]
- **Target Users**: [Who will use this]
- **Business Objectives**: [Key goals]

## Organizational Context
- **Org Name**: OrthoArkansas
- **Org Field**: Orthopedic Healthcare
- **Org Size**: ~550 Employees
- **Available IT Workstaff**:
    - IT Director x 1
    - Network/Security Manager x 1
    - Networking Admin x 1
    - Systems Admin x 1
    - Helpdesk Technicians x 2
- **Preferred Frameworks**:
    - Org Environment: Windows Server Active Directory synced to E3 Licensed O365
    - Containerizing: Docker
    - Version Control: GitHub
    - Frontend: HTML5, CSS, JS, Bootstrap, React, Tailwind
    - Backend: Node.js (Express, EJS)
    - Database: PostGreSQL
    - HTTPS: Nginx 
    - AI: MS Azure Hosted OpenAI (Pay-as-you-go)
    - Misc: Python 3.14
- **Available Hardware**:
    - Development Sandbox:
        - Ubuntu Server w/Docker installed
        - MSI 3080 Ti x 2
        - 128GB Memory
        - 2TB NVMe x 4 (BIOS RAID 1 x 2)
        - Intel 14th Gen i7-14700K
    - PXE Imaged Desktops/Laptops

## Technical Requirements

### Frontend Requirements
- Framework: React, Tailwind
- Key Features:
    - [ ] Feature 1
    - [ ] Feature 2
- UI/UX Considerations: 
    - Web app will need to be responsive.
    - Template as much as you can, including headers and footers. 
    - When styling your pages, use variables to store colors.
    - Consider company colors when selecting a color palette: White, Orange #F4A336, and Blue #37ABD4. 
    - Use best practices and so one individual could change/manage project files.
- State Management: React built-in state management

### Backend Requirements
- Language/Framework: Node.js w/Express.js
- Architecture: [Monolith/Microservices/Serverless]
- Key Services:
    - [ ] Backend Contained with Docker.
    - [ ] Include middleware that logs traffic to the server, including IP address and relevant details.
- Business Logic Complexity: [Low/Medium/High]

### Database Requirements
- Database Type: PostgreSQL, Contained with Docker.
- Key Entities:
    - Access Logs (Backend Middleware)
    - Entity 2: [description]
- Relationships: [describe key relationships]
- Data Volume Expectations: [size/growth]
- File Storage: 
    - Docker volume mounted to /srv/project root on Ubuntu Server.
    - Daily backups scheduled.

### API Requirements
- Style: [REST/GraphQL/gRPC]
- Authentication: Azure AD (Entra ID) OAuth 2.0 (MSAL)
- Key Endpoints/Operations:
    - [ ] Endpoint 1
    - [ ] Endpoint 2
- Versioning Strategy: [URL/Header/etc.]

### Security Requirements
- Authentication Method: Azure AD (Entra ID) OAuth 2.0 (MSAL)
- Authorization Model: [RBAC/ABAC/etc.]
- Compliance Needs: [GDPR/HIPAA/SOC2/etc.]
- Known Security Concerns: [list any]

### Performance Requirements
- Expected Load: [users/requests per second]
- Response Time Targets: [latency requirements]
- Scalability Needs: [horizontal/vertical]

### Accessibility Requirements
- WCAG Level: [A/AA/AAA]
- Key Considerations: [screen readers, keyboard nav, etc.]

### Infrastructure Requirements
- Hosting: [AWS/GCP/Azure/etc.]
- CI/CD Needs: [GitHub Actions/Jenkins/etc.]
- Containerization: [Docker/Kubernetes]
- Environments: [dev/staging/prod]

### Testing Requirements
- Coverage Target: [percentage]
- Test Types Needed:
    - [ ] Unit Tests
    - [ ] Integration Tests
    - [ ] E2E Tests
    - [ ] Performance Tests

### Documentation Requirements
- [ ] API Documentation
- [ ] User Guide
- [ ] Developer Guide
- [ ] Architecture Diagrams
- [ ] Accessing Traffic Logs

## Constraints & Considerations
- Timeline: [deadline or duration]
- Team Size: [number of developers]
- Budget Constraints: [if applicable]
- Technical Debt Considerations: [existing codebase issues]
    - Host device could possibly contain other web apps.
- Integration Requirements: [external systems]

## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
