# Mutken Product Requirements Document

Version: 1.0  
Date: 2026-07-07  
Product: Mutken student learning app  
Market: Egypt / Arabic-first K-12 learning support  
Primary prototype domain: https://app.mutken.com

## 1. Product Summary

Mutken is a freemium student learning platform that helps students know exactly what to study today, follow a subject-based learning journey, attend live sessions, collect points, track progress, and compete in a fair excellence board.

The app is designed around daily habit formation. A student opens the app, chooses a subject, sees today's study journey, completes resources and questions, attends live sessions, receives assistant teacher guidance, earns points, and unlocks visibility in the excellence board.

The business model is simple:

- Free users can learn with daily limits.
- Paid users subscribe monthly by subject package and get unlimited learning access within their subscribed subjects.

## 2. Product Goals

1. Increase daily learning consistency through a clear study journey.
2. Convert free users to paid monthly subscriptions by showing value before payment.
3. Make points meaningful by connecting them to learning actions, live participation, assistant teacher rewards, and excellence board activation.
4. Give parents and students a simple way to understand progress, weak areas, and next actions.
5. Support subject-based monetization instead of a single all-or-nothing subscription.

## 3. Target Users

### Student

The student needs a simple, motivating daily experience:

- What should I study today?
- How much progress did I make?
- How can I earn points?
- How do I appear in the excellence board?
- What should I improve next?

### Parent

The parent needs confidence that the student is using the app and improving:

- Is my child studying consistently?
- Which subjects are improving?
- What are the weak areas?
- Is the paid subscription worth renewing?

### Assistant Teacher / Teacher

The assistant teacher supports learning and motivation:

- Guide students to the next useful activity.
- Reward effort and corrected mistakes.
- Encourage live session participation.
- Help students understand weak areas.

## 4. Commercial Model

Mutken has only two commercial tiers:

1. Free Plan - Free access with daily cap.
2. Paid Plan - Monthly subject-based subscription with unlimited access inside subscribed subjects.

There is no Premium, Family, 3-month, or annual package in this model.

## 5. Free Plan

### Business Purpose

The free plan exists to acquire students, demonstrate the core product value, and build a daily learning habit before payment.

### Free Plan Includes

- Limited daily resources.
- Limited daily practice questions.
- Limited live-session participation or preview.
- Limited assistant teacher interaction.
- Basic points collection.
- Basic progress view.
- Ability to unlock the excellence board after meeting activity requirements.

### Suggested Free Daily Caps

| Feature | Free Daily Cap |
| --- | ---: |
| Learning resources | 2 resources per day |
| Practice questions | 10 questions per day |
| Live-session activities | 1 activity per day |
| Assistant teacher interactions | Limited daily guidance |
| Daily points counted | 40 points per day |
| Excellence board unlock | 100 weekly points or 3 completed learning activities |

### Free Plan Upgrade Triggers

The app should prompt upgrade when:

- The student reaches the daily resource cap.
- The student reaches the daily question cap.
- The student tries to access unsubscribed subjects beyond the free limit.
- The student wants unlimited live-session participation.
- The student wants full assistant teacher support.
- The student wants deeper progress analysis.

### Free Plan Message

"Start free, collect points, and unlock the excellence board through daily commitment."

## 6. Paid Plan

### Business Purpose

The paid plan unlocks full learning access for the student's selected subjects. It should feel like removing friction from the student's learning journey, not like buying points.

### Paid Plan Includes

- Unlimited resources for subscribed subjects.
- Unlimited practice questions for subscribed subjects.
- Full live-session access for subscribed subjects.
- Full assistant teacher support and reward eligibility.
- Full progress tracking.
- Mistake review.
- Weekly performance reports.
- Full excellence board access.
- No daily learning cap within subscribed subjects.

### Paid Subject Packages

Subscriptions are monthly only.

| Package | Monthly Price | Business Positioning |
| --- | ---: | --- |
| 1 subject | 450 EGP / month | Focused improvement in one subject |
| 3 subjects | 1,150 EGP / month | Best value for core subjects |
| 5 subjects | 1,650 EGP / month | Complete school support |

### Pricing Logic

- 1 subject is the anchor price at 450 EGP.
- 3 subjects at full price would be 1,350 EGP, so 1,150 EGP creates a clear bundle discount.
- 5 subjects at full price would be 2,250 EGP, so 1,650 EGP makes the full package attractive.

### Paid Plan Message

"Unlock all Mutken learning features based on the subjects you need."

## 7. Subscription Entitlement Rules

### Subject Access

Each subscription package unlocks only the selected number of subjects.

Examples:

- 1-subject package: Math only, or Science only, etc.
- 3-subject package: any 3 selected subjects.
- 5-subject package: all 5 available subjects.

### Switching Subjects

Recommended rule:

- Allow subject selection when purchasing.
- Allow subject switching once per billing cycle.
- Prevent unlimited subject switching to avoid abuse.

### Renewal

Subscriptions renew monthly.

If payment fails:

- Keep access active until the end of the paid period.
- After expiry, downgrade to Free Plan.
- Preserve points, achievements, history, and progress.

### Cancellation

If a student cancels:

- Access remains until the end of the paid period.
- No daily cap applies until paid access expires.
- After expiry, the user returns to Free Plan limits.

## 8. Core Product Modules

The first commercial version should include these modules:

1. Study Plan
2. Points System
3. Live Sessions
4. Library
5. Progress
6. Challenges
7. Commercial Subscription

## 9. Module: Study Plan

### Purpose

The Study Plan module is the home experience. It tells the student what to do today for the active subject.

### User Value

Students do not need to search or decide what to study. The app creates a clear learning journey.

### Core Features

- Subject selector with progress percentage.
- Assistant teacher greeting.
- Next live meeting card.
- Weekly progress toward excellence board activation.
- Daily achievements card.
- Today's learning journey.
- Ordered resources with step numbering.
- Video/resource status:
  - Completed
  - In progress
  - To do
  - Locked

### Business Rules

- Free users see a limited number of daily resources.
- Paid users see unlimited resources in subscribed subjects.
- Unsubscribed subjects should be visible but locked with an upgrade message.
- Each completed study plan item can generate points.
- Completing the full daily journey should provide a bonus.

### Study Plan Point Opportunities

| Action | Points |
| --- | ---: |
| Watch 80% of a video | +10 |
| Complete a resource or lesson | +20 |
| Finish post-video questions | +25 |
| 80%+ accuracy | +20 |
| Finish today's plan | +40 |

### Key UX Requirements

- The daily journey must be visible without too much scrolling.
- The student should always know the next action.
- Points available per activity should be visible before starting.
- The app should show how the next activity helps unlock the excellence board.

### Acceptance Criteria

- The student can select a subject.
- The student sees today's resources for that subject.
- Resource status is clear.
- The next meeting date and time are visible.
- Weekly progress toward excellence board activation is visible.
- Free users hit a cap after the allowed number of resources.
- Paid users do not hit the daily cap within subscribed subjects.

## 10. Module: Points System

### Purpose

The Points System motivates learning behavior, activates the excellence board, and creates a measurable weekly goal.

### Principles

1. Points reward effort and learning quality.
2. Paid users can learn more, but ranking should remain fair.
3. Assistant teacher rewards should encourage real effort, not inflate rankings.
4. Weekly leaderboard points reset weekly.
5. Lifetime points stay in the student profile.

### Point Types

| Point Type | Description |
| --- | --- |
| Daily points | Points earned today |
| Weekly points | Points used for weekly excellence board activation and ranking |
| Lifetime points | Total historical points shown in profile and achievements |
| Bonus points | Extra points from streaks, accuracy, challenges, or teacher rewards |

### Current Prototype Baseline

| Metric | Prototype Value |
| --- | ---: |
| Weekly unlock points | 100 |
| Weekly unlock activities | 3 |
| Example current weekly points | 85 |
| Example lifetime points | 1,200 |
| Example streak | 12 days |

### Resource Points

| Action | Points |
| --- | ---: |
| Watch 80% of a video | +10 |
| Complete resource or lesson | +20 |
| Finish post-video questions | +25 |
| 80%+ accuracy | +20 |

### Answer Points

| Action | Points |
| --- | ---: |
| Correct answer on first try | +10 |
| Correct answer on second try | +6 |
| Correct answer after hint | +3 |

### Live Session Points

| Action | Points |
| --- | ---: |
| Join on time | +15 |
| Stay for 80% of session | +20 |
| Answer a live question | +8 |
| Correct live answer | +15 |
| Teacher marks excellent | +20 |

### Assistant Teacher Points

| Action | Points |
| --- | ---: |
| Complete recommended task | +20 |
| Fix mistake after feedback | +15 |
| Ask for help and finish explanation | +10 |
| Teacher effort reward | +10 to +30 |

### Challenge Points

| Action | Points |
| --- | ---: |
| Complete weekly challenge | +100 |
| 80%+ challenge accuracy | +50 |
| Improve from previous week | +40 |
| 5-day learning streak | +75 |

### Free vs Paid Point Rules

Free users:

- Can collect points.
- Have a daily counted-points cap.
- Can unlock excellence board by meeting weekly activity requirements.

Paid users:

- Can earn points from all subscribed subjects.
- Have no daily learning cap inside subscribed subjects.
- Should still have anti-abuse limits for ranking.

### Recommended Fair Ranking Formula

The excellence board should not rank students only by raw total points.

Recommended weekly ranking score:

```text
weekly_score =
  activity_points
  + accuracy_bonus
  + consistency_bonus
  + live_participation_bonus
  + capped_teacher_reward_bonus
```

Teacher rewards should be capped in ranking calculation so manual rewards do not dominate the board.

### Anti-Abuse Rules

- Count each completed resource once.
- Do not reward replaying the same video repeatedly.
- Do not reward the same question repeatedly.
- Cap assistant teacher reward impact per day.
- Flag abnormal point spikes.
- Reset weekly ranking points every week.
- Keep lifetime points as historical achievement.

### Acceptance Criteria

- Every points event has a source.
- The student can see how points were collected.
- The student can see points remaining to unlock excellence board.
- Lifetime points are not reset weekly.
- Weekly points reset weekly.
- Free users have daily counted-point limits.
- Paid users have no daily learning limits in subscribed subjects.

## 11. Module: Live Sessions

### Purpose

Live Sessions connect students with teacher-led learning, real-time questions, and live participation rewards.

### User Value

Students get guided support, motivation, and immediate feedback.

### Core Features

- Upcoming meeting card on home screen.
- Meeting date and time.
- Teacher name and photo.
- Join live button.
- Live class screen.
- Teacher video/presentation area.
- Live question flow.
- Multiple-choice answer submission.
- Teacher note and explanation after answer.
- Live points panel.

### Business Rules

- Free users can preview or join limited live activities.
- Paid users can fully join live sessions for subscribed subjects.
- Live points count toward weekly progress.
- Attendance alone should not be enough to dominate rankings.
- Correct participation should be rewarded more than passive attendance.

### Live Session Rewards

| Action | Points |
| --- | ---: |
| Join on time | +15 |
| Stay for 80% of session | +20 |
| Answer live question | +8 |
| Correct live answer | +15 |
| Teacher marks excellent | +20 |

### Acceptance Criteria

- Student can see the next live session date and time.
- Student can join live session from the home card.
- Student can answer a live question.
- Student receives feedback after answer submission.
- Points earned from live session are visible.
- Free users have limited live participation.
- Paid users have full participation for subscribed subjects.

## 12. Module: Library

### Purpose

The Library is the searchable learning content hub for videos, lessons, practice sets, and quizzes.

### User Value

Students can explore content beyond today's plan and continue learning by topic, subject, skill, or recommendation.

### Core Features

- Search by lesson, subject, or skill.
- Grade filter.
- Subject filter.
- Content type filters:
  - Videos
  - Practice
  - Quizzes
  - Recommended
- Continue learning section.
- Recommended resources.
- Resource cards with thumbnails, titles, duration, questions, status, and points.

### Business Rules

- Free users can open limited daily resources.
- Paid users can open unlimited resources for subscribed subjects.
- Locked resources should communicate why they are locked.
- Resource completion should feed the Points System and Progress module.
- Recommended resources should prioritize weak areas and active study plan goals.

### Library Point Opportunities

| Action | Points |
| --- | ---: |
| Watch 80% of video | +10 |
| Complete resource | +20 |
| Finish post-video questions | +25 |
| 80%+ accuracy | +20 |

### Acceptance Criteria

- Student can browse resources.
- Student can filter by subject and content type.
- Student can continue an in-progress lesson.
- Resource cards show potential or earned points.
- Free plan caps are enforced.
- Paid subject entitlements are enforced.

## 13. Module: Progress

### Purpose

The Progress module shows the student's learning status, mastery, achievements, weak areas, and recommended next steps.

### User Value

Students and parents can understand whether learning is improving and what needs focus.

### Core Features

- Student profile summary.
- Overall mastery percentage.
- Study streak.
- Study time.
- Weekly points progress.
- Points source breakdown.
- Subject mastery cards.
- Weak area by subject.
- Teacher insight.
- AI recommendation.
- Achievements and badges.

### Business Rules

- Free users see basic progress.
- Paid users see full progress and deeper recommendations.
- Progress should connect directly to next learning action.
- Weekly points reset weekly.
- Lifetime achievements remain.
- Subject mastery should update based on completed resources, quiz accuracy, and challenge performance.

### Suggested Progress Metrics

| Metric | Description |
| --- | --- |
| Mastery | Weighted score by subject/topic |
| Accuracy | Correct answers divided by total answers |
| Completion | Completed resources divided by assigned resources |
| Consistency | Days active per week |
| Study time | Active learning time |
| Weak areas | Topics with low accuracy or repeated mistakes |
| Improvement | Change compared to previous week |

### Acceptance Criteria

- Student can see overall mastery.
- Student can see subject-level mastery.
- Student can identify weak areas.
- Student can see weekly points and source breakdown.
- Student can see achievements.
- Student receives a recommended next action.

## 14. Module: Challenges

### Purpose

Challenges create weekly motivation, structured practice, badges, and fair competition.

### User Value

Students get a concrete weekly goal and a reason to practice with consistency.

### Core Features

- Weekly challenge card.
- Time remaining.
- Challenge goal.
- Challenge reward.
- Challenge progress.
- Challenge categories:
  - Speed
  - Team
  - Accuracy
- Excellence board activation.
- Weekly leaderboard.
- Most improved highlight.
- Challenge reward rules.

### Business Rules

- Free users can participate in limited challenges.
- Paid users can participate fully in subscribed subjects.
- Weekly challenges should be topic-based and aligned with weak areas.
- Leaderboard visibility requires activation.
- The board should reward improvement and consistency, not just volume.

### Excellence Board Activation

Recommended activation rule:

- Unlock with 100 weekly points, or
- Unlock with 3 completed learning activities.

The app should show:

- Current weekly points.
- Points remaining.
- Progress bar.
- Clear next action to unlock.

### Challenge Rewards

| Action | Points |
| --- | ---: |
| Complete weekly challenge | +100 |
| 80%+ challenge accuracy | +50 |
| Improve from previous week | +40 |
| 5-day learning streak | +75 |

### Acceptance Criteria

- Student can see this week's challenge.
- Student can continue a challenge.
- Student can see progress toward challenge completion.
- Student can see rewards before starting.
- Student can see whether excellence board is locked or unlocked.
- Student can see ranking after activation.

## 15. Module: Commercial Subscription

### Purpose

The Commercial Subscription module converts free users into paying users through monthly subject-based packages.

### Core Features

- Plan comparison:
  - Free
  - Paid
- Subject package selection:
  - 1 subject
  - 3 subjects
  - 5 subjects
- Monthly pricing.
- Subject selection.
- Payment status.
- Renewal state.
- Upgrade prompts.
- Downgrade behavior.

### Subscription Packages

| Package | Monthly Price | Access |
| --- | ---: | --- |
| Free | 0 EGP | Limited daily access |
| 1 subject | 450 EGP | Unlimited access to 1 selected subject |
| 3 subjects | 1,150 EGP | Unlimited access to 3 selected subjects |
| 5 subjects | 1,650 EGP | Unlimited access to 5 selected subjects |

### Upgrade Prompt Locations

- Home Study Plan when daily cap is reached.
- Library when opening content beyond cap.
- Subject page when trying to access locked subjects.
- Live Sessions when trying to join full session.
- Progress page when trying to view deeper reports.
- Challenges page when trying to access full weekly challenge benefits.

### Recommended Upgrade Copy

"You reached today's free learning limit. Subscribe monthly to continue unlimited learning in your selected subjects."

### Acceptance Criteria

- User can understand the difference between Free and Paid.
- User can choose 1, 3, or 5 subjects.
- User can see monthly price before purchase.
- Paid access unlocks only selected subjects.
- Free caps are enforced.
- Cancelled users keep paid access until the end of the billing period.
- Expired users downgrade to Free without losing progress.

## 16. Data Model Requirements

### Student

- Student ID
- Name
- Grade
- Country
- Preferred language
- Parent account link
- Active subscription
- Selected subjects
- Lifetime points
- Weekly points
- Achievements

### Subscription

- Subscription ID
- Student ID
- Plan type
- Subject package count
- Selected subjects
- Monthly price
- Billing status
- Start date
- End date
- Renewal date
- Cancellation status

### Subject

- Subject ID
- Subject name
- Grade
- Progress percentage
- Mastery percentage
- Weak areas
- Assigned resources
- Live sessions

### Resource

- Resource ID
- Subject ID
- Title
- Type
- Duration
- Questions
- Thumbnail
- Status
- Points available
- Points earned

### Points Event

- Event ID
- Student ID
- Subject ID
- Source module
- Action type
- Points awarded
- Timestamp
- Weekly eligible flag
- Lifetime eligible flag
- Anti-abuse status

### Live Session

- Session ID
- Subject ID
- Teacher ID
- Date
- Time
- Duration
- Attendance status
- Live questions
- Participation events
- Points awarded

### Challenge

- Challenge ID
- Subject ID
- Title
- Type
- Start date
- End date
- Goal
- Reward
- Student progress
- Completion status

## 17. Analytics Requirements

### Acquisition Metrics

- Free signups
- First resource completed
- First question answered
- First points earned
- First excellence board unlock

### Engagement Metrics

- Daily active students
- Weekly active students
- Resources completed per student
- Questions answered per student
- Live sessions joined
- Challenge participation
- Study streak length

### Conversion Metrics

- Free-to-paid conversion rate
- Upgrade prompt conversion by location
- Package selection rate
- Subject selection distribution
- Monthly renewal rate
- Cancellation rate

### Learning Metrics

- Accuracy by subject
- Mastery improvement
- Weak area improvement
- Challenge completion
- Live participation accuracy

### Monetization Metrics

- Monthly recurring revenue
- Average revenue per paying student
- Revenue by package
- Revenue by subject
- Failed payment rate

## 18. Non-Functional Requirements

### Performance

- App should load quickly on mobile networks.
- Home screen should prioritize visible daily actions.
- Images and thumbnails should be optimized.

### Accessibility

- Arabic RTL must be supported.
- English LTR should remain available.
- Text should not overflow cards.
- Buttons must have readable labels.

### Reliability

- Points events must be traceable.
- Subscription state must be accurate.
- Downgrades must not delete progress.

### Security

- Payment state must be verified server-side.
- Users should not be able to edit their own points directly.
- Teacher reward permissions must be role-based.

## 19. MVP Scope

### In Scope

- Free vs paid entitlement logic.
- Monthly subject packages.
- Study plan home screen.
- Library resources.
- Points system.
- Excellence board activation.
- Live session prototype flow.
- Progress summary.
- Weekly challenges.
- Assistant teacher reward rules.

### Out of Scope

- Family package.
- Annual package.
- 3-month package.
- Complex school administration.
- Marketplace for teachers.
- Full parent payment dashboard beyond basic subscription state.

## 20. Release Readiness Checklist

- Free caps defined and enforced.
- Paid package entitlement rules implemented.
- Subscription state controls subject access.
- Points events are generated from real actions.
- Weekly points and lifetime points are separated.
- Excellence board activation rule is clear.
- Live session attendance and answer points are tracked.
- Library content locks/unlocks correctly.
- Progress data reflects completed work.
- Challenge rewards cannot be duplicated.
- Upgrade prompts appear at the right moments.
- Arabic RTL layout is verified on mobile.

## 21. Open Product Decisions

1. Final number of available subjects for launch.
2. Whether free users can join full live sessions or only previews.
3. Exact daily assistant teacher limit for free users.
4. Whether paid users have any ranking-specific points cap despite unlimited learning.
5. Payment provider for Egypt.
6. Whether parents receive progress reports inside the app, by email, or by WhatsApp.
7. Whether subject switching is allowed once monthly or requires support approval.

