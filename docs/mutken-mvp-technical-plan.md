# Mutken MVP Technical Project Plan

Version: 1.0  
Date: 2026-07-07  
Related product document: [Mutken PRD](./mutken-prd.md)  
Product: Mutken student learning app  
Target platforms: Android, iOS, responsive web admin, responsive web teacher console

## Index

1. [Document Purpose](#1-document-purpose)
2. [Technical Executive Summary](#2-technical-executive-summary)
3. [Recommended MVP Architecture](#3-recommended-mvp-architecture)
4. [Technology Decision Summary](#4-technology-decision-summary)
5. [Core Backend Systems](#5-core-backend-systems)
6. [Mobile App Requirements](#6-mobile-app-requirements)
7. [Admin Area Requirements](#7-admin-area-requirements)
8. [Assistant Teacher View Requirements](#8-assistant-teacher-view-requirements)
9. [Content Repository and Curriculum CMS](#9-content-repository-and-curriculum-cms)
10. [Study Plan Recommendation System](#10-study-plan-recommendation-system)
11. [Resource Lesson Engine](#11-resource-lesson-engine)
12. [Points, Excellence Board, and Challenges Engine](#12-points-excellence-board-and-challenges-engine)
13. [Subscription, Payment, and Entitlement Engine](#13-subscription-payment-and-entitlement-engine)
14. [Live Session Platform](#14-live-session-platform)
15. [Assistant Teacher Chat System](#15-assistant-teacher-chat-system)
16. [Progress, Reports, and Analytics](#16-progress-reports-and-analytics)
17. [Notification and Communication Services](#17-notification-and-communication-services)
18. [Security, Privacy, and Compliance Requirements](#18-security-privacy-and-compliance-requirements)
19. [Infrastructure and DevOps Requirements](#19-infrastructure-and-devops-requirements)
20. [Database and Data Model Implementation](#20-database-and-data-model-implementation)
21. [API Requirements](#21-api-requirements)
22. [Testing and Quality Requirements](#22-testing-and-quality-requirements)
23. [MVP Timeline](#23-mvp-timeline)
24. [Team and Delivery Roles](#24-team-and-delivery-roles)
25. [Risks and Technical Decisions Needed](#25-risks-and-technical-decisions-needed)
26. [External Technical References](#26-external-technical-references)

## 1. Document Purpose

This document converts the Mutken PRD into a technical MVP delivery plan.

It defines:

- Backend systems that must be developed.
- Mobile app technical requirements for Android and iOS.
- Admin area requirements.
- Assistant teacher console requirements.
- Content repository and curriculum management requirements.
- Study plan recommendation requirements.
- Technology choices for each major system.
- A practical phased timeline.

This is not a UI prototype document. It is the engineering delivery plan needed to turn the prototype into a production-ready commercial MVP.

## 2. Technical Executive Summary

Mutken should be built as a modular product platform with these client surfaces:

1. Student mobile app for Android and iOS.
2. Admin web area for operations, content, subscriptions, payments, support, and reporting.
3. Assistant teacher web console for chat, recommendations, rewards, and live session control.
4. Backend API platform used by all clients.

Recommended MVP architecture:

- Start with a modular monolith backend, not microservices.
- Use PostgreSQL as the primary system of record.
- Use Redis for caching, rate limits, jobs, and realtime coordination.
- Use S3-compatible object storage plus CDN/video streaming for media.
- Use a rules-based recommendation engine first, then add AI/ML later.
- Use managed services for OTP, payments, video streaming, and live video where possible.
- Use event-based points and learning analytics from day one.

The current prototype is a React/TanStack/Vite web app. It should remain useful for product validation and admin-style web surfaces, but the production student app should be built as a real cross-platform mobile app.

Recommended mobile approach:

- React Native with Expo and TypeScript.
- Shared design tokens and business types with the backend where practical.
- Native builds for Android and iOS through EAS Build or equivalent CI.

## 3. Recommended MVP Architecture

### Architecture Style

Use a modular monolith for the first commercial MVP.

Reasoning:

- Mutken has many connected business rules: points, entitlements, progress, recommendations, payments, content, and subscription status.
- A modular monolith keeps transaction boundaries simpler.
- It avoids premature microservice complexity.
- Modules can later be extracted when usage or team size justifies it.

### High-Level Architecture

```mermaid
flowchart TD
  StudentApp["Student Mobile App<br/>React Native / Expo"]
  AdminWeb["Admin Web Area<br/>React / TanStack"]
  TeacherWeb["Assistant Teacher Console<br/>React / TanStack"]
  API["Backend API Platform<br/>Node.js / TypeScript / NestJS"]
  Jobs["Background Workers<br/>BullMQ / Redis"]
  Realtime["Realtime Gateway<br/>WebSocket / Socket.IO"]
  DB["PostgreSQL"]
  Redis["Redis"]
  Storage["Object Storage + CDN"]
  Video["Video Streaming Provider"]
  Live["Live Video Provider<br/>LiveKit or Agora"]
  OTP["SMS / WhatsApp OTP Provider"]
  Payment["Payment Provider Adapter"]
  Analytics["Analytics Warehouse / BI"]

  StudentApp --> API
  AdminWeb --> API
  TeacherWeb --> API
  StudentApp --> Realtime
  TeacherWeb --> Realtime
  API --> DB
  API --> Redis
  Jobs --> DB
  Jobs --> Redis
  API --> Storage
  API --> Video
  Realtime --> Redis
  API --> Live
  API --> OTP
  API --> Payment
  API --> Analytics
  Jobs --> Analytics
```

### Deployment Environments

Minimum environments:

| Environment | Purpose |
| --- | --- |
| Local | Developer machine |
| Development | Shared internal testing |
| Staging | Production-like UAT |
| Production | Live users |

Production must not share database, storage buckets, OTP credentials, or payment credentials with development or staging.

## 4. Technology Decision Summary

### Recommended Core Stack

| Area | Recommended Technology | Notes |
| --- | --- | --- |
| Student mobile app | React Native + Expo + TypeScript | Single codebase for Android and iOS. |
| Admin web area | React + TanStack Router + Vite/TanStack Start | Can reuse current prototype stack and components. |
| Assistant teacher web console | React + TanStack Router + Vite/TanStack Start | Real-time teacher workflows need desktop/tablet-friendly web UI. |
| Backend API | Node.js + TypeScript + NestJS | Structured modular backend, good for RBAC, OpenAPI, queues, WebSockets. |
| API transport | REST JSON with OpenAPI; WebSocket for realtime | REST is simpler for MVP mobile/admin integrations. |
| Primary database | PostgreSQL | Strong relational model for students, curriculum, entitlements, payments, points. |
| ORM/query layer | Prisma or Drizzle | Pick one. Prisma is simpler for MVP; Drizzle gives stronger SQL control. |
| Cache/rate limit/jobs | Redis | Required for OTP throttling, sessions, job queues, realtime coordination. |
| Background jobs | BullMQ | Email/SMS jobs, progress aggregation, recommendation refresh, payment retries. |
| Object storage | AWS S3, Cloudflare R2, or equivalent | Store thumbnails, attachments, PDFs, exports. |
| Video hosting | Mux, Cloudflare Stream, Bunny Stream, or AWS MediaConvert + CloudFront | Need HLS streaming, thumbnails, signed playback, duration metadata. |
| Live video | LiveKit Cloud/self-hosted or Agora | Do not build WebRTC SFU from scratch. |
| Realtime events | Socket.IO or native WebSocket gateway | Teacher shared area, live questions, chat presence. |
| Authentication | Backend-managed auth with JWT access token + refresh token | Supports mobile and web clients. |
| Social login | Google OAuth + Facebook Login | Link to same student account after phone verification. |
| OTP | SMS/WhatsApp provider adapter | Start with one provider, keep provider interface replaceable. |
| Payments | Payment provider adapter for Egypt | Paymob/Fawry/Stripe or selected provider; validate mobile store rules before launch. |
| Analytics | PostHog/Amplitude + server event table; later warehouse | Product events plus auditable server-side learning events. |
| Monitoring | Sentry + OpenTelemetry + server logs | Errors, performance, tracing, audit trails. |
| CI/CD | GitHub Actions | Build, test, deploy backend/web/admin/mobile. |
| Infrastructure | Docker on Ubuntu for MVP; managed DB/Redis preferred | Current server can host early staging, but production should use managed persistence. |

### Current Prototype Stack

The current prototype uses:

- React.
- TanStack Router / TanStack Start.
- Vite.
- Tailwind-style utility classes.
- TypeScript.
- Lucide icons.

Recommended use:

- Keep the prototype as product/design validation.
- Reuse visual language and component ideas.
- Build production backend separately.
- Build production mobile app separately with React Native.
- Build admin and teacher web consoles using the existing React/TanStack direction.

## 5. Core Backend Systems

The MVP backend should be split into clear modules inside one backend application.

| Backend System | Required in MVP | Main Responsibility | Recommended Technology |
| --- | --- | --- | --- |
| Identity and Auth | Yes | Signup, login, social account linking, sessions, password reset | NestJS auth module, JWT, bcrypt/argon2, OAuth libraries |
| OTP Verification | Yes | SMS/WhatsApp OTP, expiry, attempt limits, phone verification | Redis rate limits, provider adapter, PostgreSQL audit records |
| Student Profile | Yes | Student data, parent/guardian data, Student ID, language, grade | PostgreSQL, API module |
| Consent | Yes | Terms/privacy/guardian consent timestamps and versions | PostgreSQL append-only records |
| Curriculum Catalog | Yes | Country, education system, grade, subject, semester, unit, lesson | PostgreSQL hierarchical model |
| Content Repository | Yes | Resource metadata, videos, thumbnails, questions, markers | PostgreSQL + object storage + video provider |
| Resource Learning Engine | Yes | Watch progress, video markers, question attempts, stars, completion | API module + event writes |
| Points Ledger | Yes | Points events, weekly/lifetime points, idempotency, anti-abuse | PostgreSQL transaction tables |
| Entitlement Engine | Yes | Free caps, paid subject access, subscription state, locked content | Central policy service in backend |
| Subscription and Payment | Yes | Packages, monthly billing state, payment references, manual reconciliation | Payment adapter + webhook handler |
| Study Plan Recommendation | Yes | Today's learning journey, weak area logic, next resource ordering | Rules engine + scheduled jobs |
| Progress Engine | Yes | Subject progress, mastery, weak areas, completion summaries | Aggregation jobs + query API |
| Admin Operations | Yes | Manage users, content, curriculum, subscription, payment, support | Admin API + RBAC |
| Assistant Teacher Chat | Phase 2 | Teacher/student messages, recommendations, rewardable clips | Chat module + realtime gateway |
| Teacher Rewards | Phase 2 | Capped, audited teacher reward points | RBAC + points ledger |
| Live Sessions | Phase 3 | Live metadata, attendance, shared area, live questions | Live provider + realtime gateway |
| Challenges | Phase 3 | Weekly challenges, badges, challenge points | Challenge module + points ledger |
| Notifications | Yes | OTP, payment reminders, study reminders, live reminders | Queue workers + provider adapters |
| Analytics | Yes | Product events, conversion, learning events, operational metrics | Server event table + analytics tool |
| Audit Logging | Yes | Sensitive admin/teacher/support actions | Append-only audit table |

## 6. Mobile App Requirements

### Platform Requirement

The student product must work on:

- Android phones.
- iPhones.
- Arabic RTL as first-class layout.
- English LTR as secondary language.

### Recommended Mobile Technology

Use React Native with Expo and TypeScript.

Reasons:

- The current prototype and team direction are already React/TypeScript.
- One production mobile codebase can target Android and iOS.
- Expo supports app signing and store submission workflows.
- Native features can still be added through development builds.

### Required Mobile Capabilities

| Capability | Requirement | Technology |
| --- | --- | --- |
| Navigation | Bottom tabs, stack navigation, deep links to resource/chat/live | Expo Router or React Navigation |
| API data | Query caching, retry, stale data handling | TanStack Query |
| Auth storage | Secure token storage | Expo SecureStore or native secure storage |
| Localization | Arabic/English content and layout | i18next or equivalent, RTL handling |
| Video playback | HLS video, watch progress events, marker overlays | Expo AV or native video player package |
| Resource questions | Marker-triggered questions, answer feedback, stars | Native React Native components |
| Push notifications | Study reminders, live session reminders, payment reminders | Expo Notifications or Firebase Cloud Messaging |
| Offline tolerance | Cache current plan and last loaded resources | TanStack Query persistence, local storage |
| Payments | External/provider checkout or store-compliant in-app flow | Provider SDK or secure web checkout after policy review |
| Error reporting | Mobile crash and JS error capture | Sentry |
| Analytics | Client events, screen views, conversion funnels | PostHog/Amplitude/Firebase Analytics |
| App builds | Internal testing, staging, production stores | EAS Build / EAS Submit or native CI |

### Mobile MVP Screens

1. Signup/login.
2. OTP verification.
3. Student profile.
4. Subject selector.
5. Study Plan home.
6. Library.
7. Resource lesson page.
8. Progress summary.
9. Subscription/upgrade flow.
10. Payment status.
11. Assistant chat placeholder or Phase 2 chat.
12. Live session placeholder or Phase 3 live.

### Mobile Payment Note

Mobile payment implementation must be validated against current Apple App Store and Google Play rules before launch.

Engineering should implement payments through a payment abstraction:

- `PaymentProvider`
- `createCheckoutSession`
- `handleWebhook`
- `verifyPayment`
- `activateSubscription`
- `refundOrCancel`

This prevents the mobile app from depending directly on one provider or one app-store policy decision.

## 7. Admin Area Requirements

The admin area is the internal operating system for Mutken.

### Recommended Admin Technology

| Layer | Technology |
| --- | --- |
| Frontend | React + TanStack Router + TypeScript |
| UI | Existing component system / shadcn-style components |
| API | Backend admin REST API |
| Auth | Same backend auth with admin roles |
| Permissions | RBAC enforced server-side |
| Tables/forms | TanStack Table, React Hook Form, Zod |
| Charts | Recharts or BI embed |

### Admin Roles

| Role | Main Permissions |
| --- | --- |
| Super Admin | Full access, role assignment, configuration |
| Content Admin | Curriculum, resources, questions, markers, publishing |
| Teacher Lead | Teacher assignments, reward review, live schedule oversight |
| Assistant Teacher | Assigned students, chat, recommendations, rewards within limits |
| Support Agent | Student lookup, payment/subscription support, tickets |
| Finance Admin | Payment references, refunds, reconciliation |
| Read-only Analyst | Analytics dashboards only |

### Admin Modules

#### 7.1 Student Management

Requirements:

- Search by Mutken Student ID, name, phone, email.
- View profile, grade, language, country, education system.
- View phone verification status.
- View selected subjects and active subscription.
- View points summary and progress summary.
- View support tickets.
- Trigger account support flows with audit log.

Technology:

- Backend RBAC.
- PostgreSQL queries with indexed search fields.
- Audit log for sensitive views and edits.

#### 7.2 Subscription and Payment Operations

Requirements:

- View payment references.
- View payment status: pending, paid, failed, cancelled, refunded, manual review.
- View subscription status: free, active, past due, cancelled, expired, suspended.
- Search by Student ID, payment reference, phone.
- Manually reconcile payment only with permission.
- Record refund/manual review reason.
- Preserve payment audit history.

Technology:

- Payment provider webhook handlers.
- Payment and subscription state machines.
- Append-only payment event log.

#### 7.3 Entitlement Configuration

Requirements:

- Configure Free Plan limits:
  - Daily resources.
  - Daily questions.
  - Assistant teacher interactions.
  - Counted daily points.
  - Library watch cap.
- Configure Paid Plan packages:
  - 1 subject.
  - 3 subjects.
  - 5 subjects.
  - Monthly price.
- Configure subject switching rules.
- Configure grace period and expiry behavior.

Technology:

- Central entitlement policy table.
- Feature flag/config service.
- Admin audit logs for all changes.

#### 7.4 Content and Curriculum Management

Requirements:

- Manage academic years.
- Manage country and education system.
- Manage grades.
- Manage subjects.
- Manage semesters, units, lessons.
- Manage resources under lessons.
- Manage video markers and questions.
- Publish/unpublish content.
- Version curriculum updates.
- Review and approve content before publication.

Technology:

- PostgreSQL versioned curriculum schema.
- Object storage for thumbnails and attachments.
- Video provider for video asset lifecycle.

#### 7.5 Points and Anti-Abuse Operations

Requirements:

- View points event history per student.
- Explain total points through source events.
- View weekly vs lifetime points.
- View ranking eligibility flags.
- Review flagged abnormal point spikes.
- Adjust or void points only through audited admin action.

Technology:

- Append-only points ledger.
- Idempotency keys.
- Anti-abuse rules engine.
- Audit log.

#### 7.6 Support Ticket Management

Requirements:

- Create support ticket.
- Link ticket to student, subscription, and payment reference.
- Add internal notes.
- Record identity verification result.
- Assign ticket status and owner.

Technology:

- Support ticket tables.
- RBAC.
- Audit trail.

#### 7.7 Analytics Dashboard

Requirements:

- Acquisition: signup, OTP success, first resource completion.
- Conversion: free-to-paid, payment started/confirmed/failed.
- Engagement: DAU/WAU, resource completion, questions answered.
- Learning: accuracy, weak areas, stars, improvements.
- Monetization: MRR, package distribution, renewal/cancellation.
- Teacher operations: rewards, chats, live questions.

Technology:

- Server-side events.
- Analytics tool such as PostHog or Amplitude.
- Optional BI dashboard later.

## 8. Assistant Teacher View Requirements

The assistant teacher view is separate from admin. It is focused on teaching actions, not system administration.

### Recommended Teacher Console Technology

| Layer | Technology |
| --- | --- |
| Frontend | React + TanStack Router + TypeScript |
| Realtime | WebSocket / Socket.IO |
| Auth | Backend auth with teacher role |
| Permissions | Assigned subjects/students/classes only |
| Notifications | Realtime browser alerts and mobile push to students |

### Teacher Console Modules

#### 8.1 Teacher Dashboard

Requirements:

- View assigned subjects.
- View assigned students or live class groups.
- See students needing help.
- See recent weak areas.
- See recommended teacher actions.

Backend dependencies:

- Student progress engine.
- Study plan recommendations.
- Weak area summaries.

#### 8.2 Student Learning Context

Requirements:

- Student profile summary.
- Grade, subject, subscription state.
- Recent resources completed.
- Recent incorrect answers.
- Current weak areas.
- Recent points and streak.
- Recommended next action.

Technology:

- Read-only teacher API with assignment-based access control.

#### 8.3 Assistant Chat

Requirements:

- Send and receive messages.
- Send resource recommendation cards.
- Send short clip cards.
- Attach rewardable task.
- View completion status of recommended task.
- Award teacher effort points within configured caps.

Technology:

- Chat message table.
- Realtime gateway.
- Push notification worker.
- Points ledger integration.

#### 8.4 Teacher Reward Controls

Requirements:

- Reward requires selected reason.
- Reward value constrained by configured min/max.
- Weekly ranking-eligible portion is capped.
- Reward creates a points event.
- Reward creates audit record.

Technology:

- Teacher reward table.
- Points service idempotency key.
- RBAC and audit logging.

#### 8.5 Live Session Control

Requirements:

- Start/end live session.
- Publish waiting state.
- Publish study material.
- Publish quiz/question.
- Open/close submissions.
- Reveal correct answer and explanation.
- View live answer distribution.
- Clear shared area.

Technology:

- Live session API.
- WebSocket room per live session.
- LiveKit/Agora room token generation.
- Shared content state table.
- Live answer event table.

## 9. Content Repository and Curriculum CMS

### Purpose

The content repository is the source of truth for curriculum-aligned learning content.

It must support:

- Egyptian public education curriculum structure.
- Semester, unit, lesson hierarchy.
- Resources linked to lessons.
- Videos with marker timestamps.
- Questions linked to exact video timestamps.
- Versioning by academic year and subject.
- Review and publish workflow.

### Content Data Model

Minimum entities:

- CurriculumCatalog.
- CurriculumNode.
- Subject.
- Resource.
- ResourceMediaAsset.
- ResourceQuestion.
- ResourceQuestionChoice.
- VideoMarker.
- ContentReview.
- ContentVersion.

### Resource Types

| Resource Type | MVP Requirement |
| --- | --- |
| Video lesson | Required |
| Video clip | Required for assistant recommendations |
| Practice question set | Required |
| PDF/worksheet | Optional for MVP |
| Live session material | Phase 3 |

### Content Workflow

1. Content admin creates curriculum catalog.
2. Content admin creates semester/unit/lesson hierarchy.
3. Content admin uploads or links video.
4. System extracts video duration and thumbnail.
5. Content admin adds marker timestamps.
6. Content admin attaches questions to markers.
7. Subject matter expert reviews content.
8. Content admin publishes resource.
9. Published resources become available to Study Plan and Library based on entitlement.

### Technology

| Need | Recommended Technology |
| --- | --- |
| Structured curriculum data | PostgreSQL |
| File uploads | S3-compatible object storage |
| Video playback | HLS streaming provider |
| Signed URLs | Backend-generated signed playback/access URLs |
| Image processing | Provider thumbnails or worker job |
| Content versioning | PostgreSQL version tables |
| Search/filter | PostgreSQL indexes first; OpenSearch later if needed |

## 10. Study Plan Recommendation System

### Purpose

The recommendation system decides what the student should study today.

For MVP, this should be rules-based and explainable.

### Recommendation Inputs

Required inputs:

- Student grade.
- Country and education system.
- Active subject.
- Subscription entitlement.
- Curriculum catalog version.
- Resources completed.
- Resource stars earned.
- Watch percentage.
- Question attempts and correctness.
- Weak areas.
- Recent live session participation.
- Recent assistant recommendations.
- Daily free caps already consumed.

### Recommendation Outputs

The system should produce:

- Today's ordered study plan.
- Recommended resource IDs.
- Reason for each recommendation.
- Lock/unlock state.
- Available points.
- Upgrade prompt reason when locked by entitlement.

### MVP Recommendation Rules

| Scenario | Recommendation Behavior |
| --- | --- |
| Student has incomplete resource in current lesson | Continue that resource first |
| Student has 0-2 stars in a resource | Recommend easier/review resource in same lesson |
| Student has 3-4 stars | Recommend retry questions or next related practice |
| Student has 5/5 stars | Move to next resource or next lesson |
| Student repeatedly misses marker questions | Mark skill as weak and recommend remedial content |
| Student completed today's plan | Recommend challenge or next live session |
| Free user reached cap | Return locked item with upgrade reason |
| Paid user in subscribed subject | Return unlimited next resources |

### Recommendation Architecture

Use a two-layer approach:

1. Synchronous recommendation API for current plan.
2. Background aggregation jobs for progress and weak-area summaries.

Technology:

- Node.js/NestJS service.
- PostgreSQL queries and materialized progress tables.
- BullMQ scheduled jobs.
- Optional feature flags for tuning recommendation weights.

### Future AI Layer

AI should not be the first MVP dependency.

Recommended later approach:

- Keep rules engine as source of truth.
- Add AI-generated explanations or assistant teacher drafts.
- Use curriculum/resource metadata as controlled context.
- Require teacher/admin review for sensitive recommendations.

## 11. Resource Lesson Engine

### Purpose

The resource engine manages video learning, markers, questions, stars, points, and completion.

### Required Business Rules

- 5/5 stars completes a resource.
- Watch percentage awards points but does not complete the resource.
- Video markers are linked to relevant questions.
- Reaching a marker during playback can pause and show the question.
- If the video is paused, tapping a marker should show the linked question.
- Incorrect answers show explanation and hint.
- Correct answers show confirmation and reasoning.
- Points depend on attempt quality.
- Points are idempotent and cannot be duplicated by replaying.

### Required APIs

| API | Purpose |
| --- | --- |
| `GET /resources/:id` | Get resource metadata, video URL, markers, questions |
| `POST /resources/:id/watch-progress` | Save watch percentage and marker reach |
| `POST /resource-questions/:id/answer` | Submit answer attempt |
| `GET /resources/:id/progress` | Get stars, attempts, completion, points earned |
| `POST /resources/:id/complete` | Server-side completion validation when 5/5 stars |

### Technology

- Backend: NestJS resource module.
- Database: PostgreSQL resource progress and question attempt tables.
- Video: HLS streaming provider.
- Events: points events and learning analytics.
- Mobile: native video player with marker overlay.

## 12. Points, Excellence Board, and Challenges Engine

### Purpose

The points engine is a financial-like ledger for learning rewards. It must be auditable and idempotent.

### Required Technical Rules

- Never update total points directly from the client.
- Every point change must create a points event.
- Every event must have source module and source entity ID.
- Every event must have an idempotency key.
- Weekly, lifetime, and ranking eligibility must be separate.
- Teacher rewards require RBAC permission and audit.
- Ranking caps must be applied separately from point earning.

### Data Implementation

Tables:

- points_events.
- weekly_points_rollups.
- lifetime_points_rollups.
- ranking_scores.
- ranking_cap_rules.
- student_achievements.
- challenge_progress.

### Technology

- PostgreSQL transactions.
- Unique constraints on idempotency keys.
- Scheduled rollup jobs with BullMQ.
- Redis cache for leaderboard reads.

## 13. Subscription, Payment, and Entitlement Engine

### Purpose

This engine enforces Free vs Paid access and monthly subject packages.

### Packages

| Package | Monthly Price | Entitlement |
| --- | ---: | --- |
| Free | 0 EGP | Limited daily access |
| 1 subject | 450 EGP | Unlimited access to 1 selected subject |
| 3 subjects | 1,150 EGP | Unlimited access to 3 selected subjects |
| 5 subjects | 1,650 EGP | Unlimited access to 5 selected subjects |

### Required Systems

1. Subscription state machine.
2. Payment reference generation.
3. Payment provider adapter.
4. Payment webhook handler.
5. Entitlement policy engine.
6. Free usage counter.
7. Subject access checker.
8. Manual reconciliation admin workflow.

### Entitlement Check Pattern

Every student-facing API that returns content or records learning activity must call the entitlement engine.

Example:

```text
canAccessResource(studentId, subjectId, resourceId)
canAnswerQuestion(studentId, subjectId)
canUseAssistantChat(studentId, subjectId)
canJoinLiveSession(studentId, subjectId)
canViewProgressDetail(studentId, subjectId)
```

### Technology

- PostgreSQL subscriptions, entitlements, usage counters.
- Redis for daily cap counters.
- Payment provider adapter.
- Webhook validation.
- Admin reconciliation workflow.

## 14. Live Session Platform

### MVP Position

Live sessions are Phase 3 in the PRD. However, the backend should reserve the data model and entitlement hooks early so live can be added without redesigning the platform.

### Required Live Systems

- Live session scheduling.
- Teacher room control.
- Student join token generation.
- Attendance tracking.
- Shared area state.
- Live quiz/question events.
- Live answer submissions.
- Live participation points.

### Recommended Technology

| Need | Recommended Technology |
| --- | --- |
| Video/audio live class | LiveKit or Agora |
| Shared area updates | WebSocket / Socket.IO |
| Attendance events | Backend session events |
| Live question state | PostgreSQL + Redis pub/sub |
| Live points | Points ledger |

### Live Shared Area States

- Waiting.
- Study material.
- Quiz/question.
- Feedback/explanation.

The assistant teacher controls this state. Students should not be able to change shared content.

## 15. Assistant Teacher Chat System

### MVP Position

Assistant chat is Phase 2 in the PRD. Technical foundations should be prepared in Phase 1 by storing student progress, weak areas, and recommendations cleanly.

### Required Chat Features

- Student-to-assistant messages.
- Assistant-to-student messages.
- Resource recommendation card.
- Short clip recommendation card.
- Rewardable completion task.
- Chat history.
- Teacher assignment.
- Audit and safety review.

### Recommended Technology

- PostgreSQL chat tables.
- WebSocket for realtime updates.
- Push notifications for offline student.
- RBAC for assistant teacher access.
- Points ledger integration for reward completion.

### AI vs Human Operation

For MVP, assume human-operated assistant teacher workflows with AI-ready architecture.

Reasoning:

- K-12 guidance requires safety and accountability.
- Teacher rewards and recommendations must be auditable.
- AI can be added later to draft messages, summarize weak areas, or suggest resources.

If AI is added later:

- Store prompts and responses for audit.
- Use curriculum content as controlled context.
- Add moderation and teacher override.
- Do not allow AI to directly award points.

## 16. Progress, Reports, and Analytics

### Progress Engine

Required outputs:

- Subject progress percentage.
- Lesson completion.
- Resource stars.
- Watch progress.
- Accuracy.
- Weak areas.
- Weekly points.
- Lifetime points.
- Recommended next action.

### Reports

MVP student reports:

- Current subject progress.
- Recent achievements.
- Weak areas.
- Next recommended activity.

Later parent reports:

- Weekly summary by WhatsApp/email/app.
- Subscription value report.
- Progress and consistency report.

### Technology

- PostgreSQL event and rollup tables.
- BullMQ scheduled aggregation jobs.
- API read models optimized for mobile.
- Analytics tool for product funnels.

## 17. Notification and Communication Services

### Required Channels

| Channel | MVP Use |
| --- | --- |
| SMS | OTP and critical account messages |
| WhatsApp | OTP or parent/payment communication if provider supports it |
| Push notification | Study reminders, live reminders, assistant messages |
| Email | Receipts, account support, parent reports later |

### Technical Requirements

- Provider abstraction.
- Message templates.
- Language-specific templates.
- Delivery status tracking.
- Rate limiting.
- Audit logs for account/payment-related messages.

Technology:

- BullMQ notification queue.
- Redis rate limits.
- Provider adapters.
- PostgreSQL notification log.

## 18. Security, Privacy, and Compliance Requirements

### Security Requirements

- Server-side authorization for every protected route.
- Role-based access control for admin and teacher actions.
- Assignment-based access control for assistant teachers.
- Strong password hashing.
- Refresh token rotation.
- OTP expiry and attempt limits.
- Phone number change requires re-verification.
- Payment webhooks must be verified server-side.
- Points must never be client-editable.
- Sensitive admin actions must be audited.

### Privacy Requirements

- Consent records with version and timestamp.
- Parent/guardian consent path for applicable students.
- Data retention policy before production launch.
- Student data access limited by role.
- Support lookup by Student ID without exposing unnecessary data.
- Chat and teacher reward actions auditable.

### Recommended Technology

- NestJS guards/interceptors.
- PostgreSQL audit tables.
- Encryption at rest through managed database/storage.
- TLS everywhere.
- Sentry with PII scrubbing.
- Secret manager or environment secret storage.

## 19. Infrastructure and DevOps Requirements

### MVP Infrastructure

Recommended MVP production setup:

- Ubuntu server or container host for backend/web.
- Managed PostgreSQL if budget allows.
- Managed Redis if budget allows.
- Object storage bucket.
- CDN/video provider.
- Nginx reverse proxy.
- PM2 or Docker Compose for early deployment.

Recommended upgrade path:

- Dockerize backend, admin, teacher console.
- Use GitHub Actions for CI/CD.
- Move production database out of the app server.
- Add automated backups.
- Add staging environment.

### CI/CD Requirements

Each pull request:

- Type check.
- Lint.
- Unit tests.
- Build web/admin/backend.
- Run database migration check.

Each production deploy:

- Pull exact commit.
- Install dependencies.
- Run migrations.
- Build.
- Restart service.
- Health check.
- Rollback plan.

### Observability

Minimum:

- Application logs.
- Error tracking.
- API latency metrics.
- Background job failure tracking.
- Payment webhook failure alerts.
- OTP send failure alerts.
- Database backup monitoring.

Technology:

- Sentry.
- OpenTelemetry later.
- PM2 logs or Docker logs.
- Uptime monitoring.

## 20. Database and Data Model Implementation

### Primary Database

Use PostgreSQL.

Reason:

- Curriculum, subscriptions, payments, users, points, and progress are strongly relational.
- Transactions matter for points and payments.
- Auditability matters.

### Schema Groups

1. Identity:
   - users.
   - auth_accounts.
   - refresh_tokens.
   - otp_verifications.
   - consent_records.

2. Student profile:
   - students.
   - parent_guardians.
   - student_subject_preferences.

3. Curriculum:
   - curriculum_catalogs.
   - curriculum_nodes.
   - subjects.
   - curriculum_versions.

4. Content:
   - resources.
   - resource_media_assets.
   - video_markers.
   - resource_questions.
   - resource_question_choices.

5. Learning:
   - resource_progress.
   - question_attempts.
   - study_plan_items.
   - weak_area_summaries.

6. Commercial:
   - subscriptions.
   - entitlements.
   - payment_references.
   - payment_events.
   - usage_counters.

7. Points:
   - points_events.
   - points_rollups.
   - ranking_scores.
   - achievements.

8. Teacher/chat/live:
   - teachers.
   - teacher_assignments.
   - chat_threads.
   - chat_messages.
   - teacher_rewards.
   - live_sessions.
   - live_shared_content.
   - live_question_answers.

9. Operations:
   - support_tickets.
   - audit_logs.
   - notifications.
   - analytics_events.

### Database Rules

- Use migrations only; no manual production schema edits.
- Use foreign keys for core relations.
- Use unique constraints for:
  - Student ID display code.
  - Email where applicable.
  - Phone where applicable.
  - Points idempotency key.
  - Payment provider transaction reference.
- Use soft delete only where historical audit is required.
- Preserve learning history across curriculum version updates.

## 21. API Requirements

### API Style

Recommended:

- REST JSON APIs for MVP.
- OpenAPI documentation.
- WebSocket gateway for realtime chat/live.
- `/api/v1` version prefix.

### API Groups

| API Group | Examples |
| --- | --- |
| Auth | signup, login, social login, refresh, logout |
| OTP | send OTP, verify OTP, resend OTP |
| Profile | get/update profile, Student ID, parent data |
| Curriculum | subjects, semesters, units, lessons |
| Library | resource lists, filters, lock states |
| Resource | resource detail, watch progress, answer question |
| Study Plan | today's plan, item status, recommendation reason |
| Points | summary, event history, unlock status |
| Progress | subject progress, weak areas, next action |
| Subscription | packages, selected subjects, checkout, status |
| Payment | webhook, receipt, manual reconciliation |
| Admin | students, content, payments, support, config |
| Teacher | assigned students, chat, rewards, live controls |
| Live | sessions, join token, shared content, answers |
| Notifications | device tokens, preferences |
| Analytics | server-side event capture |

### API Security

- Every protected route must enforce authentication.
- Admin and teacher routes must enforce role and assignment checks.
- Student routes must scope data to the authenticated student.
- Payment webhooks must verify provider signatures.
- Rate limit OTP, login, and answer submission endpoints.

## 22. Testing and Quality Requirements

### Backend Tests

Required:

- Unit tests for entitlement rules.
- Unit tests for points idempotency.
- Unit tests for subscription state transitions.
- Unit tests for recommendation rules.
- Integration tests for resource question attempts.
- Integration tests for payment webhook handling.
- Integration tests for OTP verification limits.

### Mobile Tests

Required:

- Auth flow smoke test.
- OTP flow smoke test.
- Study plan loading.
- Resource playback progress event.
- Marker question answer flow.
- Arabic RTL visual checks.
- Subscription lock/unlock states.

### Admin/Teacher Tests

Required:

- RBAC permission tests.
- Content publish workflow.
- Payment reconciliation audit.
- Teacher reward cap.
- Live shared area state updates.

### Release Quality Gates

No production release unless:

- Build passes.
- Database migrations apply cleanly.
- Critical tests pass.
- Payment sandbox flow passes.
- OTP sandbox flow passes.
- Arabic RTL smoke test passes.
- Production rollback path is known.

## 23. MVP Timeline

The following timeline assumes a small focused team and parallel work across backend, mobile, admin, and content.

### Phase 0: Technical Discovery and Setup - 1 week

Deliverables:

- Confirm payment provider.
- Confirm OTP provider and WhatsApp/SMS launch rule.
- Confirm video hosting provider.
- Confirm live provider for Phase 3.
- Confirm production hosting approach.
- Create backend repository structure or app workspace.
- Define database migration strategy.
- Define shared TypeScript types strategy.

### Phase 1: Commercial Learning MVP - 10 to 12 weeks

Goal: launch a free/paid student learning experience that can sell monthly subject packages.

#### Weeks 1-2: Foundation

Backend:

- Project setup.
- PostgreSQL schema baseline.
- Auth module.
- OTP module.
- Student profile module.
- Consent module.
- Student ID generator.
- RBAC foundation.

Mobile:

- React Native/Expo project setup.
- Navigation shell.
- Arabic/English localization.
- Auth screens.
- Secure token storage.

Admin:

- Admin login.
- Admin shell.
- Basic role management.

DevOps:

- CI pipeline.
- Staging deployment.
- Database migration pipeline.

#### Weeks 3-4: Curriculum and Content Foundation

Backend:

- Curriculum catalog.
- Subject, semester, unit, lesson APIs.
- Resource metadata APIs.
- Media asset model.
- Content publish states.

Admin:

- Curriculum management screens.
- Resource creation/editing.
- Video marker and question editor baseline.

Mobile:

- Subject selector.
- Library browsing by semester/unit/lesson.
- Resource list and lock states.

Content:

- Load first launch curriculum and sample resources.

#### Weeks 5-6: Resource Lesson Engine

Backend:

- Resource detail API.
- Watch progress API.
- Marker question answer API.
- Star calculation.
- Resource completion validation.
- Points event creation for resource actions.

Mobile:

- Video playback screen.
- Marker timeline.
- Question modal/screen.
- Correct/incorrect feedback.
- Star progress.

Admin:

- Resource preview.
- Question review workflow.

#### Weeks 7-8: Subscription, Entitlement, and Payments

Backend:

- Packages: Free, 1 subject, 3 subjects, 5 subjects.
- Subscription state machine.
- Entitlement checks.
- Free daily usage counters.
- Payment reference generation.
- Payment provider integration.
- Payment webhook handling.

Mobile:

- Upgrade prompts.
- Package selection.
- Subject selection.
- Payment status screen.
- Locked/unlocked content behavior.

Admin:

- Payment and subscription lookup.
- Manual reconciliation.
- Entitlement configuration.

#### Weeks 9-10: Study Plan, Progress, and Points

Backend:

- Study plan recommendation rules.
- Daily plan API.
- Progress summaries.
- Weak area summaries.
- Points rollups.
- Excellence board activation state.

Mobile:

- Study Plan home connected to backend.
- Daily achievements connected to points.
- Progress summary connected to backend.
- Profile connected to Student ID/subscription.

Admin:

- Student detail page with learning context.
- Points event history.

#### Weeks 11-12: Hardening, UAT, and Launch Preparation

Backend:

- Audit logs.
- Rate limits.
- Production config.
- Backups.
- Monitoring.

Mobile:

- Arabic RTL QA.
- Android internal build.
- iOS TestFlight build.
- Performance fixes.

Admin:

- Support workflows.
- Content publishing QA.

Business:

- Payment sandbox UAT.
- OTP UAT.
- Content QA.
- Release checklist.

### Phase 2: Engagement and Support - 4 to 6 weeks

Goal: add assistant teacher support and stronger retention.

Deliverables:

- Google login.
- Facebook login.
- Assistant teacher console.
- Assistant chat.
- Teacher recommendations.
- Rewardable clips.
- Teacher reward caps.
- Improved progress reports.
- Payment/support operations dashboard improvements.

### Phase 3: Live and Competition - 6 to 8 weeks

Goal: add live learning and competition differentiation.

Deliverables:

- Live session scheduling.
- Live provider integration.
- Teacher live control room.
- Shared area states.
- Live questions and answer distribution.
- Live attendance tracking.
- Live points.
- Challenges.
- Excellence board enhancements.
- Parent report improvements.

### Timeline Summary

| Phase | Duration | Commercial Value |
| --- | ---: | --- |
| Phase 0: Technical setup | 1 week | Reduces implementation risk |
| Phase 1: Commercial Learning MVP | 10-12 weeks | Can sell paid subject packages |
| Phase 2: Engagement and Support | 4-6 weeks | Improves retention and support |
| Phase 3: Live and Competition | 6-8 weeks | Adds differentiation and community |

## 24. Team and Delivery Roles

Minimum team:

| Role | Responsibility |
| --- | --- |
| Product owner | Final decisions, acceptance, scope control |
| Technical lead | Architecture, backend boundaries, code review |
| Backend engineer | API, database, auth, entitlement, points, payments |
| Mobile engineer | Android/iOS app |
| Frontend/admin engineer | Admin and teacher web consoles |
| Content operations lead | Curriculum and resource publishing |
| QA engineer | Test plans, mobile QA, Arabic RTL QA |
| DevOps engineer | CI/CD, infrastructure, monitoring |
| Subject matter expert | Curriculum and question review |

Recommended small-team approach:

- Backend and database work starts first.
- Mobile starts in parallel after API contracts are drafted.
- Admin starts early because content entry is required before mobile UAT.
- Live features should not block Phase 1 unless the business decides live is mandatory for launch.

## 25. Risks and Technical Decisions Needed

### Product/Business Decisions

1. Payment provider for Egypt.
2. OTP provider and whether launch uses SMS, WhatsApp, or both.
3. Whether mobile subscriptions are sold inside app, externally, or through a compliant hybrid flow.
4. Final subject list for launch.
5. Initial curriculum source of truth.
6. Whether parent/guardian data is mandatory during signup or before payment.
7. Exact free daily limits.
8. Refund policy and grace period.
9. Live provider choice.
10. Whether assistant teacher is human-only or hybrid AI-assisted.

### Technical Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Payment policy mismatch on mobile stores | App rejection or payment redesign | Validate Apple/Google rules before implementing mobile checkout |
| Content entry takes longer than engineering | Empty product at launch | Build admin CMS early and assign content operations owner |
| Points duplication bugs | Trust and ranking problems | Ledger with idempotency and tests |
| Entitlement scattered across modules | Paid/free inconsistencies | Central entitlement engine |
| Live video complexity | Delays Phase 3 | Use managed LiveKit/Agora; do not build SFU |
| Recommendation logic becomes opaque | Hard to support students | Start with explainable rules |
| Arabic RTL regressions | Poor user experience | Mandatory RTL QA in every release |
| Sensitive student data exposure | Compliance and trust issue | RBAC, assignment checks, audit logs |

## 26. External Technical References

These references were checked for current platform implications:

- Expo EAS Build documentation: https://docs.expo.dev/build/introduction/
- Expo Application Services overview: https://docs.expo.dev/eas/
- Google Play Billing documentation: https://developer.android.com/google/play/billing
- Apple StoreKit External Purchase Link entitlement: https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.storekit.external-purchase-link
- LiveKit SFU documentation: https://docs.livekit.io/reference/internals/livekit-sfu/
- LiveKit overview: https://docs.livekit.io/intro/about/

