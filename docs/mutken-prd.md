# Mutken Product Requirements Document

Version: 1.0  
Date: 2026-07-07  
Product: Mutken student learning app  
Market: Egypt / Arabic-first K-12 learning support  
Primary prototype domain: https://app.mutken.com

## Index

1. [Product Summary](#1-product-summary)
2. [Product Goals](#2-product-goals)
3. [Target Users](#3-target-users)
4. [Commercial Model](#4-commercial-model)
5. [Free Plan](#5-free-plan)
6. [Paid Plan](#6-paid-plan)
7. [Subscription Entitlement Rules](#7-subscription-entitlement-rules)
8. [Core Product Modules](#8-core-product-modules)
9. [Module: Study Plan](#9-module-study-plan)
10. [Module: Points System](#10-module-points-system)
11. [Module: Live Sessions](#11-module-live-sessions)
12. [Module: Library](#12-module-library)
13. [Module: Resource Lesson Page](#13-module-resource-lesson-page)
14. [Module: Assistant Teacher Chat](#14-module-assistant-teacher-chat)
15. [Module: Progress](#15-module-progress)
16. [Module: Challenges](#16-module-challenges)
17. [Module: Commercial Subscription](#17-module-commercial-subscription)
18. [Module: Registration, Login, and Profile Identity](#18-module-registration-login-and-profile-identity)
19. [Entitlement Matrix](#19-entitlement-matrix)
20. [Detailed Points Event Rules](#20-detailed-points-event-rules)
21. [Payment and Subscription Operations](#21-payment-and-subscription-operations)
22. [Privacy, Consent, and Data Retention](#22-privacy-consent-and-data-retention)
23. [Curriculum Catalog and Versioning](#23-curriculum-catalog-and-versioning)
24. [Teacher Console and Assistant Teacher Operations](#24-teacher-console-and-assistant-teacher-operations)
25. [MVP Phasing](#25-mvp-phasing)
26. [Data Model Requirements](#26-data-model-requirements)
27. [Analytics Requirements](#27-analytics-requirements)
28. [Non-Functional Requirements](#28-non-functional-requirements)
29. [MVP Scope](#29-mvp-scope)
30. [Release Readiness Checklist](#30-release-readiness-checklist)
31. [Open Product Decisions](#31-open-product-decisions)

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
5. Resource Lesson Page
6. Assistant Teacher Chat
7. Progress
8. Challenges
9. Commercial Subscription
10. Registration, Login, and Profile Identity

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
- Live teacher video area.
- Live status and session timer.
- Teacher-controlled shared area.
- Shared study material state.
- Shared quiz/question state.
- Empty waiting state when nothing is shared.
- Live question flow.
- Multiple-choice answer submission.
- Teacher note and explanation after answer.
- Live points panel.

### Live Screen Layout

The live session screen has two main areas:

1. Live teacher video area.
2. Shared area controlled by the assistant teacher.

The live teacher video area should show:

- Teacher camera feed.
- Live badge.
- Session timer.
- Teacher name.
- Subject or session context.
- Camera/micro interaction state when needed.

The shared area is not controlled by the student. It is controlled by the assistant teacher during the session.

### Teacher-Controlled Shared Area

The assistant teacher decides what appears in the shared area at any moment.

The shared area can be in one of these states:

| State | Description | Student Action |
| --- | --- | --- |
| Empty / waiting | Nothing has been shared yet. The student waits for the assistant teacher to send material or a question. | No required action |
| Study material | The assistant teacher shares an explanation, slide, image, resource excerpt, short clip, or worked example. | View, read, or follow the teacher |
| Quiz / question | The assistant teacher shares a live question or poll. | Select answer and submit |
| Feedback | The assistant teacher shares explanation after answers are submitted. | Review feedback |

### Empty / Waiting State

When the assistant teacher has not shared anything:

- The shared area should clearly indicate that the student is waiting for teacher content.
- The student should remain in the live session.
- No points should be awarded only for waiting in this state.
- The app may show lightweight text such as "Waiting for teacher to share material" or its Arabic equivalent.

### Shared Study Material State

When the assistant teacher shares study material:

- The shared area should display the material without forcing a quiz response.
- The material can be:
  - Text explanation
  - Slide
  - Image
  - PDF/page excerpt
  - Short video clip
  - Worked example
  - Link to a related resource
- The student can view the material while listening to the teacher.
- If the material includes a related resource, it can link to the Resource Lesson Page after the live session.

### Shared Quiz / Question State

When the assistant teacher shares a question:

- The shared area should show a "Shared by teacher" label.
- The app should show question progress, for example Question 2 of 5.
- The question text should be prominent.
- Answer options should be easy to tap.
- Submit Answer should remain disabled until the student selects an option.
- Once submitted, the student's answer should be locked unless the teacher allows retry.
- The assistant teacher can reveal the correct answer and explanation.

### Teacher Control Rules

- The assistant teacher can publish, replace, or clear shared content.
- The assistant teacher can switch from study material to quiz at any point.
- The assistant teacher can keep the shared area empty while speaking.
- The assistant teacher can decide when a question is open and when it is closed.
- Students should see updates in real time.
- If the teacher clears the shared area, the student returns to the waiting state.

### Business Rules

- Free users can preview or join limited live activities.
- Paid users can fully join live sessions for subscribed subjects.
- Live points count toward weekly progress.
- Attendance alone should not be enough to dominate rankings.
- Correct participation should be rewarded more than passive attendance.
- Viewing study material during live sessions can support learning progress but should not award the same points as answering correctly.
- Quiz participation should be traceable to the specific live session and question.
- If the shared area is empty, students can earn attendance/time points only through valid session attendance rules, not through shared-content actions.

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
- Student can see the teacher live video area.
- Student can see the live badge and session timer.
- Shared area can show an empty/waiting state.
- Shared area can show teacher-shared study material.
- Shared area can show a teacher-shared quiz question.
- Student can answer a live question.
- Submit Answer is disabled until an answer is selected.
- Teacher can change what appears in the shared area.
- Student receives feedback after answer submission.
- Points earned from live session are visible.
- Free users have limited live participation.
- Paid users have full participation for subscribed subjects.

## 12. Module: Library

### Purpose

The Library is the curriculum-aligned learning content hub. It lets the student browse the selected subject exactly as it appears in the Egyptian public education textbook structure: semester, unit, lesson, then learning resources.

### User Value

Students can find lessons using the same structure they already know from school textbooks. This reduces confusion and helps students connect Mutken resources with classroom learning.

### Core Features

- Subject header.
- Back navigation to previous screen.
- Semester filter.
- Unit filter.
- Curriculum structure:
  - Semester
  - Unit
  - Lesson
  - Learning resources inside lesson
- Lesson list grouped under each unit.
- Lesson cards showing:
  - Lesson title
  - Estimated duration
  - Resource points available
  - Lesson status
  - Navigation to lesson resources
- Search by lesson, unit, subject, or skill.
- Content type filters:
  - Videos
  - Practice
  - Quizzes
  - Recommended
- Continue learning section.
- Recommended resources.
- Resource cards with thumbnails, titles, duration, questions, status, and points.

### Curriculum Structure

The Library should mirror the official public education curriculum in Egypt for the selected grade and subject.

Required hierarchy:

```text
Subject
  Semester
    Unit
      Lesson
        Learning resources
```

Example for Math:

```text
Math
  Semester 1
    Unit 1: Numbers
      Place Value
      Rounding
      Estimation
    Unit 2: Fractions
      Intro to Fractions
      Multiplying Fractions
      Dividing Fractions
  Semester 2
    Unit 3: Geometry
      Angles
```

The semester, unit, and lesson names must match the textbook/curriculum naming for the selected subject.

### Lesson Resource Flow

When a student selects a lesson:

- The app opens the lesson's learning resources.
- Resources may include:
  - Video lesson
  - Marker-based video questions
  - Practice questions
  - Short quiz
  - Worked example
  - Review resource
- Completing learning resources inside the lesson affects:
  - Points System
  - Progress module
  - Study Plan recommendation logic
  - Weak-area recommendations
  - Challenge readiness when relevant

### Recommendation Relationship

The Library is not only a static content catalog. Student activity inside the Library should influence recommendations.

Examples:

- If the student watches "Intro to Fractions" but answers marker questions incorrectly, the Study Plan can recommend a simpler fractions review.
- If the student completes "Multiplying Fractions" with high accuracy, the Study Plan can recommend "Dividing Fractions" or a challenge.
- If the student repeatedly fails questions in one unit, Progress should mark that unit or skill as a weak area.
- If the assistant teacher recommends a resource, the Library should open the correct lesson/resource directly.

### Business Rules

- Free users can open limited daily resources.
- Free users have a Library content watch limit.
- Free users should still see the curriculum structure, but locked/capped lessons should show an upgrade prompt.
- Paid users can open unlimited resources for subscribed subjects.
- Paid users can browse and watch all resources inside subscribed subjects without daily Library caps.
- Unsubscribed subjects should remain visible but locked or upgrade-gated.
- Locked resources should communicate why they are locked.
- Resource completion should feed the Points System and Progress module.
- Recommended resources should prioritize weak areas and active study plan goals.
- Lesson completion should be calculated from completion of its required learning resources.
- Unit progress should be calculated from completed lessons inside the unit.
- Semester progress should be calculated from completed units/lessons inside the semester.

### Library Point Opportunities

| Action | Points |
| --- | ---: |
| Watch 80% of video | +10 |
| Complete resource | +20 |
| Finish post-video questions | +25 |
| 80%+ accuracy | +20 |

### Acceptance Criteria

- Student can select a subject and see its curriculum structure.
- Student can filter by semester.
- Student can filter by unit.
- Student can select a lesson.
- Student can view all learning resources inside a lesson.
- Semester, unit, and lesson structure matches the official Egyptian public education textbook structure for the selected subject.
- Student can filter by content type when viewing resources.
- Student can continue an in-progress lesson.
- Resource cards show potential or earned points.
- Resource achievements and question answers affect the Points System.
- Resource achievements and question answers affect Study Plan recommendations.
- Free users hit the Library watch/content limit.
- Free plan caps are enforced.
- Paid subject entitlements are enforced.

## 13. Module: Resource Lesson Page

### Purpose

The Resource Lesson Page is the focused learning experience for one video lesson. It combines video, timeline question markers, interactive questions, stars, points, and immediate feedback.

### User Value

Students learn inside the video instead of passively watching. Questions appear at the exact moment they are relevant, so the student connects the explanation with practice.

### Core Features

- Video player with play, pause, and progress timeline.
- Question markers on the video timeline.
- Each marker is linked to a specific question.
- Question counter, for example Question 1/5.
- Lesson title and duration.
- Star progress, for example 0/5 correct.
- Lesson points panel.
- Question answer choices.
- Correct answer confirmation.
- Incorrect answer explanation.
- Hint after incorrect attempt.
- Points by attempt quality.
- Resource completion state.

### Video Marker Behavior

Each video contains time-based markers. A marker means that the question is relevant at that exact time in the video.

Required behavior:

- When the video reaches a marker, the video pauses and the related question appears.
- If the video is paused, the student can tap/click any marker to open the related question.
- If a question has already been answered, tapping the marker should show the answered state and explanation.
- The student should be able to return to the relevant video moment after answering.
- Markers should visually show status:
  - Not reached
  - Current question
  - Correct
  - Incorrect / needs retry

### Question Behavior

Questions are multiple choice in the current prototype direction.

When the student answers incorrectly:

- The app should not only say "wrong".
- The app should explain why the answer is incorrect.
- The app should provide a hint that helps the student find the correct answer.
- The student should be allowed to try again.
- Points decrease by attempt count, but learning should continue.

When the student answers correctly:

- The app should confirm the answer is correct.
- The app should explain why it is correct.
- The app should award points based on attempt quality.
- The app should award one star for the question if the star was not already earned.

### Star Completion Rule

Stars are the resource completion mechanic.

Recommended rule:

- Each resource has 5 required stars.
- Each correct question earns 1 star.
- A resource is completed when the student earns 5/5 stars.
- Stars are not removed after being earned.
- Re-answering an already completed question should not duplicate points or stars.

### Points Rules

Stars and points should be related but not identical:

- Stars show completion.
- Points show effort, accuracy, and quality.

| Action | Points |
| --- | ---: |
| Watch 80% of video | +10 |
| Complete resource or lesson | +20 |
| Finish post-video questions | +25 |
| 80%+ accuracy | +20 |
| Correct on first try | +10 |
| Correct on second try | +6 |
| Correct after hint | +3 |

### Completion Rules

A resource is completed when:

- The student reaches 5/5 stars.

Video watch percentage is used for points, not for resource completion.

If the student reaches 5/5 stars but has not watched enough of the video:

- Mark the resource as completed.
- Show 5/5 stars.
- Do not award the "Watch 80% of video" points until the watch threshold is reached.
- Prompt the student to watch the remaining video portion only as an optional points opportunity.

If the student watches the video but has not earned all stars:

- Keep the resource in progress.
- Prompt the student to answer remaining marker questions.

### Free vs Paid Rules

Free users:

- Can open resource pages within the daily free resource cap.
- Can answer questions within the daily free question cap.
- Can earn stars and points until the daily cap is reached.

Paid users:

- Have unlimited resource access for subscribed subjects.
- Have unlimited questions for subscribed subjects.
- Can complete all resource stars without daily cap friction.

### Acceptance Criteria

- Video shows timeline markers.
- Marker opens the correct linked question.
- Reaching a marker pauses the video and shows the question.
- Clicking a marker while paused shows the related question.
- Incorrect answers show explanation and hint.
- Correct answers show confirmation and reasoning.
- Correct answers increase stars.
- 5/5 stars marks the resource as completed.
- Points are awarded once per eligible action.
- Repeating the same question does not duplicate points.

## 14. Module: Assistant Teacher Chat

### Purpose

Assistant Teacher Chat gives the student a direct guidance channel with the assistant teacher. It should feel personal, supportive, and connected to the student's study plan, progress, and mistakes.

### User Value

Students can ask for help when stuck, receive short targeted explanations, and get guided back to the right study task.

### Core Features

- Assistant teacher profile header.
- Online status.
- Chat conversation.
- Assistant-initiated study plan recommendations.
- Study plan deep link card.
- Progress improvement messages.
- Student question composer.
- Attachment or clip card from the assistant.
- Short video clip recommendation.
- Reward prompt for completing the suggested clip.
- Assistant teacher reward points.

### Conversation Examples

The assistant teacher can send:

- A greeting using the student's name.
- A prepared daily study plan.
- A recommendation to focus on a specific task because of recent mistakes.
- A progress message, such as improvement from 68% to 82%.
- A short explanation for a question the student does not understand.
- A 30-second video clip linked to the relevant concept.
- A reward message, such as "Complete the clip to earn +10".

### Business Rules

- Chat is connected to the student's active subject, study plan, progress, and weak areas.
- Free users receive limited daily assistant teacher interactions.
- Paid users receive full assistant teacher support for subscribed subjects.
- Assistant teacher messages should guide students to action, not only answer questions.
- Assistant teacher rewards must be capped and traceable.
- Rewards should be based on effort and completion, not manual favoritism.

### Assistant Teacher Reward Rules

| Action | Points |
| --- | ---: |
| Complete recommended task | +20 |
| Fix mistake after feedback | +15 |
| Ask for help and finish explanation | +10 |
| Complete recommended short clip | +10 |
| Teacher effort reward | +10 to +30 |

### Recommended Chat Actions

The assistant teacher should be able to recommend:

- Continue today's study plan.
- Watch a specific resource.
- Answer a marker question again.
- Review a mistake.
- Join the next live session.
- Complete a challenge.
- Watch a short clip.

### Guardrails

- The assistant should not simply give final answers without explanation.
- The assistant should provide hints before revealing full reasoning when appropriate.
- Reward points should be awarded only after the student completes the recommended action.
- Chat rewards should count toward weekly points but be capped for ranking fairness.
- Chat history should remain visible for student review.

### Free vs Paid Rules

Free users:

- Limited daily messages.
- Limited short clip recommendations.
- Limited reward opportunities.

Paid users:

- Full chat support for subscribed subjects.
- Unlimited guidance within reasonable anti-abuse limits.
- Full assistant reward eligibility.

### Acceptance Criteria

- Student can open chat with assistant teacher.
- Student can send a question.
- Assistant can recommend a study plan item.
- Assistant can send a short video clip card.
- Student can earn points by completing the recommended action.
- Free users hit a daily chat/support limit.
- Paid users have full support for subscribed subjects.
- Assistant reward events are stored as points events.

## 15. Module: Progress

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

## 16. Module: Challenges

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

## 17. Module: Commercial Subscription

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
- Resource Lesson Page when question or resource caps are reached.
- Assistant Teacher Chat when daily free support is used.
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

## 18. Module: Registration, Login, and Profile Identity

### Purpose

Registration and login create a verified student account that can safely connect learning progress, subscriptions, payments, support requests, and assistant teacher history to the correct student.

### Business Purpose

The account model must support:

- Fast signup for free users.
- Secure login for returning students.
- Verified telephone number for identity, payment follow-up, and support.
- A generated Mutken Student ID used later for payment reference, support, and account lookup.
- Flexible signup methods through email, Google/Gmail, or Facebook.

### Signup Methods

Mutken should support these signup methods:

| Method | Required? | Notes |
| --- | --- | --- |
| Email and password | Yes | Default signup option |
| Google/Gmail account | Yes | Social signup and login |
| Facebook account | Yes | Social signup and login |
| Telephone number | Yes | Required for all accounts through OTP verification |

Telephone verification is mandatory even when the student signs up with Google/Gmail or Facebook.

### Login Methods

Mutken should support these login methods:

- Email and password.
- Google/Gmail login.
- Facebook login.
- Telephone number with OTP, if enabled for returning users.

Recommended MVP rule:

- Email, Google/Gmail, and Facebook are primary login methods.
- Telephone OTP is required for verification and can also be used for account recovery.

### Telephone OTP Verification

Every student account must have a verified telephone number.

OTP delivery channels:

- SMS.
- WhatsApp.

Required behavior:

- Student enters telephone number during signup.
- Student selects or receives available OTP channel: SMS or WhatsApp.
- System sends one-time password.
- Student enters OTP.
- Account is marked as phone verified only after successful OTP validation.
- If OTP fails, student can request resend after a short cooldown.
- OTP expires after a limited time.
- Too many failed attempts should temporarily block verification attempts.

### Required Registration Data

Minimum required data for student signup:

| Data Field | Required | Purpose |
| --- | --- | --- |
| Student first name | Yes | Personalization |
| Student last name | Yes | Account identity |
| Telephone number | Yes | OTP, payment, support |
| OTP verification status | Yes | Security and trust |
| Email address | Required for email signup, optional for social signup if provided by provider | Login and communication |
| Password | Required for email signup only | Login |
| Social provider ID | Required for Google/Gmail or Facebook signup | Social login identity |
| Grade/year | Yes | Curriculum and content selection |
| Education system | Yes | Public education curriculum alignment |
| Country | Yes | Curriculum, pricing, and phone format |
| Preferred language | Yes | Arabic/English app experience |
| Parent/guardian name | Recommended | Support and payment context |
| Parent/guardian phone | Recommended | Payment and support follow-up |

### Optional Profile Data

Optional fields that can improve personalization:

- School name.
- Governorate/city.
- Student photo/avatar.
- Parent email.
- Learning goals.
- Preferred subjects.
- Weak subjects selected by parent/student.

### Generated Mutken Student ID

After successful account creation, Mutken must generate a unique Student ID.

Business use:

- Payment reference.
- Support ticket lookup.
- Parent support calls.
- Subscription activation.
- Manual payment reconciliation.
- Assistant teacher account identification.

Student ID requirements:

- Generated automatically.
- Unique across all students.
- Visible in the student's profile.
- Easy to read and share with support.
- Not based only on telephone number or personal data.
- Never changes after creation.

Recommended format:

```text
MTK-YYYY-000001
```

Example:

```text
MTK-2026-001245
```

### Registration Flow

Recommended signup flow:

1. Student chooses signup method: Email, Google/Gmail, or Facebook.
2. Student provides required profile data.
3. Student enters telephone number.
4. System sends OTP through SMS or WhatsApp.
5. Student verifies OTP.
6. System creates profile and generates Mutken Student ID.
7. Student selects grade, education system, and subjects of interest.
8. Student lands in Free Plan and can start learning.
9. Upgrade prompts later guide the student to paid subject packages.

### Profile Requirements

The student profile should show:

- Student name.
- Mutken Student ID.
- Grade/year.
- Country.
- Education system.
- Selected/subscribed subjects.
- Telephone verification status.
- Active subscription status.
- Lifetime points.
- Achievements.

### Business Rules

- A verified telephone number is required before payment activation.
- A verified telephone number is required before support can process sensitive account requests.
- One telephone number should not create unlimited student accounts without guardrails.
- Social signup accounts must still complete phone OTP verification.
- Student ID should be used in payment and support workflows instead of asking support teams to search by name only.
- If a user signs up with social login and later adds email/password, both methods should link to the same account after verification.
- If the same email or phone already exists, the app should guide the user to login or account recovery instead of creating a duplicate.

### Acceptance Criteria

- Student can sign up with email and password.
- Student can sign up with Google/Gmail.
- Student can sign up with Facebook.
- Student must verify telephone number by OTP.
- OTP can be delivered by SMS or WhatsApp.
- Student can log in with email.
- Student can log in with Google/Gmail.
- Student can log in with Facebook.
- Student can recover access using verified telephone OTP.
- System generates a unique Mutken Student ID after signup.
- Student ID appears in profile.
- Student ID can be used later for payment and support.
- Duplicate email/phone cases are handled.

## 19. Entitlement Matrix

### Purpose

The entitlement matrix centralizes what Free and Paid users can do. This prevents each module from interpreting limits differently.

### Plan-Level Entitlements

| Area | Free Plan | Paid Plan |
| --- | --- | --- |
| Subject access | Limited access and previews | Unlimited access for subscribed subjects |
| Daily learning resources | 2 resources per day | Unlimited inside subscribed subjects |
| Daily practice questions | 10 questions per day | Unlimited inside subscribed subjects |
| Resource lesson page | Available within resource/question caps | Unlimited inside subscribed subjects |
| Library browsing | Full curriculum structure visible | Full curriculum structure visible |
| Library watching | Limited daily content watch cap | Unlimited inside subscribed subjects |
| Live sessions | Limited preview or limited activity | Full access for subscribed subjects |
| Assistant teacher chat | Limited daily guidance | Full support for subscribed subjects |
| Points | Can earn points up to free counted-point cap | Can earn points without learning cap, with ranking anti-abuse caps |
| Excellence board | Unlock after weekly activity threshold | Unlock after weekly activity threshold; no automatic paid bypass |
| Progress | Basic progress | Full progress and deeper recommendations |
| Challenges | Limited challenge participation | Full participation for subscribed subjects |

### Reset Rules

| Limit | Reset Cadence |
| --- | --- |
| Free daily resources | Daily |
| Free daily questions | Daily |
| Free daily assistant teacher interactions | Daily |
| Free daily counted points | Daily |
| Weekly excellence board points | Weekly |
| Weekly challenge progress | Weekly |
| Lifetime points | Never reset |

### Upgrade Trigger Rules

The app should show an upgrade prompt when:

- A free user reaches the daily resource cap.
- A free user reaches the daily question cap.
- A free user reaches the Library watch/content cap.
- A free user reaches the assistant teacher support cap.
- A free user tries to join full live participation beyond preview rules.
- A free user tries to access unsubscribed or locked subject content.
- A user tries to subscribe to more subjects than the current package allows.

### Entitlement Acceptance Criteria

- Entitlement checks use one central rule set.
- Entitlement decisions are consistent across Study Plan, Library, Resource Lesson Page, Live Sessions, Assistant Chat, Progress, and Challenges.
- Upgrade prompts explain exactly which limit was reached.
- Paid access applies only to subscribed subjects.
- Expired subscriptions downgrade to Free Plan without deleting progress.

## 20. Detailed Points Event Rules

### Purpose

Points must be traceable, fair, and safe from duplication. Every point increase should come from a stored event with a source and eligibility rules.

### Points Event Requirements

Every points event must include:

- Student ID.
- Mutken Student ID display code.
- Source module.
- Source entity ID, such as resource ID, question ID, live session ID, challenge ID, or chat message ID.
- Action type.
- Points awarded.
- Attempt number when relevant.
- Weekly eligibility flag.
- Lifetime eligibility flag.
- Ranking eligibility flag.
- Timestamp.
- Idempotency key.
- Anti-abuse status.

### Idempotency Rules

- The same completed resource cannot award completion points more than once.
- The same question cannot award answer points more than once for the same star/attempt result.
- The same video cannot award "Watch 80%" points more than once.
- The same assistant teacher reward cannot be applied twice.
- The same live question answer cannot award points twice.
- The same challenge completion cannot award completion points twice.

### Ranking Caps

Paid users can learn without daily learning caps, but ranking must stay fair.

Recommended ranking caps:

| Source | Ranking Cap |
| --- | ---: |
| Assistant teacher rewards | Max 60 ranking-eligible points per week |
| Repeated practice in same lesson | Count first eligible completion only |
| Live attendance | Count once per live session |
| Live answers | Count once per question |
| Resource completion | Count once per resource |

### Resource Points Clarification

- 5/5 stars completes the resource.
- Watch percentage does not control completion.
- Watch 80% of video awards watch points only.
- A student can complete a resource by earning 5/5 stars even if the watch percentage points are not yet earned.

### Teacher Reward Rules

- Teacher rewards must be tied to a clear action.
- Teacher rewards must require teacher or assistant teacher permission.
- Teacher rewards must be auditable.
- Teacher rewards should count toward lifetime points.
- Teacher rewards should be capped for weekly ranking fairness.

### Points Acceptance Criteria

- Every points total can be explained through event history.
- Duplicate events do not duplicate points.
- Weekly points and lifetime points are stored separately.
- Ranking eligibility is separate from point earning.
- Free counted-point caps are enforced.
- Paid users are not learning-capped in subscribed subjects, but ranking caps still apply.

## 21. Payment and Subscription Operations

### Purpose

Payment operations define how subscriptions are activated, renewed, reconciled, cancelled, refunded, and supported.

### Payment States

| State | Meaning |
| --- | --- |
| Pending | Payment started but not confirmed |
| Paid | Payment confirmed and access can activate |
| Failed | Payment attempt failed |
| Cancelled | Payment was cancelled before completion |
| Refunded | Payment was returned to customer |
| Manual review | Payment needs support verification |

### Subscription States

| State | Meaning |
| --- | --- |
| Free | No active paid subscription |
| Active | Paid access is active |
| Past due | Renewal/payment failed but grace period may apply |
| Cancelled | Renewal stopped; access remains until period end |
| Expired | Paid period ended and user is downgraded to Free |
| Suspended | Access blocked due to abuse, fraud, or support action |

### Activation Rules

- Payment activation requires verified telephone number.
- Payment record must include Mutken Student ID.
- Paid access starts only after payment is confirmed.
- Subject entitlements must match the purchased package.
- Manual payment reconciliation must use Mutken Student ID plus payment reference.

### Grace Period

Recommended rule:

- If renewal fails, keep access active for a short grace period.
- Notify parent/student through available channels.
- If payment is not resolved by grace period end, downgrade to Free Plan.
- Do not delete learning history, points, or achievements.

### Receipts and Support

- Each successful payment should generate a payment reference.
- Payment reference should be linked to Student ID and subscription ID.
- Support should be able to search by Student ID, telephone number, or payment reference.
- Receipts should show package, subjects, amount, currency, and period.

### Refund Rules

Refund policy must be defined before launch.

Minimum requirements:

- Support can mark a payment as refunded.
- Refunded subscription access follows the approved refund policy.
- Refunded transactions remain in history for audit.
- Points and progress earned during the paid period are not deleted unless fraud is detected.

### Payment Acceptance Criteria

- A verified phone is required before activating paid subscription.
- Payment state and subscription state are stored separately.
- Support can reconcile payments by Student ID.
- Failed payments do not delete progress.
- Expired subscriptions downgrade to Free Plan automatically.

## 22. Privacy, Consent, and Data Retention

### Purpose

Mutken handles student learning data, phone numbers, parent data, chat history, and payment records. Privacy and consent must be explicit because the product serves K-12 students.

### Consent Requirements

The product should capture consent for:

- Account creation.
- Terms of use.
- Privacy policy.
- Telephone OTP.
- SMS/WhatsApp communication.
- Parent/guardian communication.
- Learning progress tracking.
- Assistant teacher chat history.
- Payment and support processing.

### Guardian Consent

Recommended business rule:

- If the student is below the age threshold defined by local policy, parent/guardian consent is required.
- Parent/guardian contact should be captured before paid subscription or sensitive account changes.
- Support actions that expose sensitive student data require account verification.

### Data Access Rules

| Role | Allowed Access |
| --- | --- |
| Student | Own profile, progress, resources, points, chat |
| Parent/guardian | Linked student progress, subscription, payment/support status |
| Assistant teacher | Assigned student learning context, chat, live session participation |
| Support | Account, payment, subscription, and support context |
| Admin | Operational access with audit logging |

### Data Retention

Recommended retention rules:

- Learning history remains while account is active.
- Payment records are retained for financial audit requirements.
- OTP codes expire quickly and are not retained as readable codes.
- Chat history is retained for learning continuity and safety review.
- Deleted/deactivated accounts should follow a defined retention and deletion policy.

### Privacy Acceptance Criteria

- Consent timestamps are stored.
- Parent/guardian consent flow is defined.
- Users can request account support using Student ID.
- Sensitive support actions require identity verification.
- Role-based access prevents unauthorized student data access.
- Chat and teacher reward actions are auditable.

## 23. Curriculum Catalog and Versioning

### Purpose

The Library and Study Plan depend on accurate curriculum structure. The curriculum catalog defines the official subject, semester, unit, lesson, and resource hierarchy for each grade and academic year.

### Curriculum Catalog Requirements

Each curriculum catalog must include:

- Country.
- Education system.
- Academic year.
- Grade/year.
- Subject.
- Semester.
- Unit.
- Lesson.
- Learning resources.
- Curriculum version.
- Source/reference.
- Content owner.
- Last updated date.

### Versioning Rules

- Curriculum content must be versioned by academic year and subject.
- Updates should not break existing student progress.
- If a lesson is renamed, the system should preserve historical progress mapping.
- If a lesson is removed, the student's completed progress remains in history.
- New curriculum versions should be reviewed before publishing.

### Ownership and Review

- Product/content team owns curriculum mapping.
- Subject matter expert reviews unit and lesson mapping.
- Engineering owns versioned data structure and migration.
- Assistant teachers can suggest corrections but should not directly publish curriculum changes without review.

### Curriculum Acceptance Criteria

- Library structure matches the selected official curriculum version.
- Study Plan recommendations reference valid curriculum lessons.
- Resources are linked to exact semester, unit, and lesson.
- Curriculum changes are versioned and auditable.
- Student progress survives curriculum updates.

## 24. Teacher Console and Assistant Teacher Operations

### Purpose

The teacher console is the operational interface that lets assistant teachers manage live sessions, share material, send questions, guide students, and award traceable rewards.

### Core Teacher Capabilities

- View assigned students or live class group.
- Start and end live session.
- Publish shared material to the live shared area.
- Clear shared material and return students to waiting state.
- Send a live question or quiz.
- Open and close question submissions.
- Reveal answer and explanation.
- View live answer distribution.
- Send recommended resources in chat.
- Send short clips in chat.
- Award teacher effort rewards within allowed limits.

### Live Session Teacher Controls

The teacher can control the shared area state:

- Empty/waiting.
- Study material.
- Quiz/question.
- Feedback/explanation.

Teacher actions should update student screens in real time.

### Reward Controls

- Teacher rewards require a selected reason.
- Teacher rewards have configured min/max values.
- Teacher rewards are capped per student per week for ranking eligibility.
- Reward events must be auditable by support/admin.

### Teacher Console Acceptance Criteria

- Teacher can start a live session.
- Teacher can share material.
- Teacher can send and close a live question.
- Teacher can reveal the correct answer and explanation.
- Teacher can see submitted answers.
- Teacher can recommend a resource or clip in chat.
- Teacher can award capped points with an audit trail.

## 25. MVP Phasing

### Purpose

The full PRD is larger than a first release. Phasing reduces delivery risk and keeps the first version commercially useful.

### Phase 1: Commercial Learning MVP

Goal: launch a paid/free learning experience that can sell subject packages.

Includes:

- Registration by email.
- Telephone OTP through one primary channel.
- Generated Mutken Student ID.
- Free vs paid entitlement logic.
- Monthly subject packages.
- Study Plan.
- Curriculum Library.
- Resource Lesson Page with video markers, questions, stars, and points.
- Basic Progress.
- Upgrade prompts.

### Phase 2: Engagement and Support

Goal: increase retention and support learning after core subscription works.

Includes:

- Google/Gmail login.
- Facebook login.
- Assistant Teacher Chat.
- Assistant teacher recommendations.
- Teacher reward controls.
- Improved progress reports.
- Payment/support operations dashboard.

### Phase 3: Live and Competition

Goal: increase differentiation through live learning and community motivation.

Includes:

- Live Sessions.
- Teacher Console for shared material and live questions.
- Challenges.
- Excellence board enhancements.
- Advanced points ranking controls.
- Parent reporting improvements.

### Phasing Acceptance Criteria

- Phase 1 can operate commercially without Phase 2 or Phase 3.
- Each phase has testable scope.
- Later phases do not require rebuilding the entitlement or points foundation.
- Social login and live sessions can be delayed without blocking the paid MVP.

## 26. Data Model Requirements

### Student

- Student ID
- Mutken Student ID display code
- Name
- First name
- Last name
- Grade
- Country
- Education system
- Preferred language
- Telephone number
- Telephone verification status
- Email address
- Authentication providers linked
- Profile photo/avatar
- Parent/guardian name
- Parent/guardian phone
- Parent/guardian email
- Parent account link
- Active subscription
- Selected subjects
- Lifetime points
- Weekly points
- Achievements

### Auth Account

- Auth account ID
- Student ID
- Email
- Password hash for email signup
- Google/Gmail provider ID
- Facebook provider ID
- Linked provider list
- Last login method
- Last login timestamp
- Account status
- Created timestamp

### OTP Verification

- OTP verification ID
- Student ID
- Telephone number
- Delivery channel: SMS or WhatsApp
- OTP status
- Attempt count
- Resend count
- Expiry timestamp
- Verified timestamp

### Consent Record

- Consent record ID
- Student ID
- Parent/guardian ID when applicable
- Consent type
- Consent status
- Consent version
- Accepted timestamp
- Revoked timestamp
- Source channel

### Subscription

- Subscription ID
- Student ID
- Mutken Student ID display code
- Plan type
- Subject package count
- Selected subjects
- Monthly price
- Billing status
- Start date
- End date
- Renewal date
- Cancellation status

### Entitlement

- Entitlement ID
- Student ID
- Subscription ID
- Plan type
- Subject IDs allowed
- Daily resource limit
- Daily question limit
- Daily assistant interaction limit
- Library watch limit
- Ranking cap profile
- Start timestamp
- End timestamp
- Status

### Payment Reference

- Payment reference ID
- Student ID
- Mutken Student ID display code
- Subscription ID
- Package selected
- Amount
- Currency
- Payment provider
- Payment status
- Provider transaction reference
- Created timestamp

### Support Ticket

- Support ticket ID
- Student ID
- Mutken Student ID display code
- Contact name
- Contact telephone
- Issue type
- Issue description
- Related subscription ID
- Related payment reference ID
- Status
- Created timestamp

### Subject

- Subject ID
- Subject name
- Grade
- Curriculum catalog ID
- Progress percentage
- Mastery percentage
- Weak areas
- Assigned resources
- Live sessions

### Curriculum Catalog

- Curriculum catalog ID
- Country
- Education system
- Academic year
- Grade/year
- Subject ID
- Curriculum version
- Source/reference
- Content owner
- Review status
- Published timestamp

### Curriculum Node

- Curriculum node ID
- Curriculum catalog ID
- Parent node ID
- Node type: semester, unit, or lesson
- Display order
- Name
- Status
- Previous version node ID

### Resource

- Resource ID
- Subject ID
- Curriculum node ID
- Title
- Type
- Duration
- Questions
- Thumbnail
- Status
- Points available
- Points earned
- Video marker timestamps
- Required stars
- Stars earned
- Watch percentage
- Completion status

### Resource Question

- Question ID
- Resource ID
- Marker timestamp
- Question text
- Answer choices
- Correct answer
- Incorrect-answer explanation
- Correct-answer explanation
- Hint
- Attempt count
- Star awarded flag

### Chat Message

- Message ID
- Student ID
- Assistant teacher ID
- Subject ID
- Sender type
- Message text
- Linked resource ID
- Linked study plan item ID
- Linked video clip
- Reward points available
- Reward completion status

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

### Live Shared Content

- Shared content ID
- Live session ID
- Teacher ID
- Shared state: waiting, study material, quiz, feedback
- Content type
- Content payload/reference
- Question ID when applicable
- Open/closed status
- Published timestamp
- Cleared timestamp

### Teacher

- Teacher ID
- Name
- Subjects assigned
- Role
- Permissions
- Status

### Teacher Reward

- Teacher reward ID
- Teacher ID
- Student ID
- Source activity ID
- Reason
- Points awarded
- Ranking eligible points
- Created timestamp
- Audit status

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

## 27. Analytics Requirements

### Acquisition Metrics

- Signup started
- Signup completed
- Signup method used: email, Google/Gmail, Facebook
- OTP sent by channel: SMS or WhatsApp
- OTP verification success rate
- OTP failure rate
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
- Resource stars earned
- Marker questions answered
- Incorrect answers corrected after hint
- Assistant teacher chat messages
- Assistant recommended clips completed
- Live sessions joined
- Challenge participation
- Study streak length

### Conversion Metrics

- Free-to-paid conversion rate
- Upgrade prompt conversion by location
- Package selection rate
- Subject selection distribution
- Payment started
- Payment confirmed
- Payment failed
- Payment manually reconciled
- Monthly renewal rate
- Cancellation rate

### Learning Metrics

- Accuracy by subject
- Mastery improvement
- Weak area improvement
- Marker question accuracy
- First-try correct answer rate
- Hint-to-correct conversion rate
- Challenge completion
- Live participation accuracy

### Monetization Metrics

- Monthly recurring revenue
- Average revenue per paying student
- Revenue by package
- Revenue by subject
- Failed payment rate
- Refund rate
- Past-due recovery rate

### Teacher Operations Metrics

- Live sessions started
- Shared materials published
- Live questions sent
- Live question response rate
- Teacher rewards awarded
- Teacher rewards rejected by cap or rule

### Privacy and Consent Metrics

- Consent accepted
- Consent revoked
- Parent/guardian consent completion rate
- Data deletion requests
- Support identity verification success rate

## 28. Non-Functional Requirements

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
- Video marker state must not lose answered questions or earned stars.
- Chat reward completion must not duplicate points.
- Student ID generation must not create duplicates.
- OTP verification state must be reliable and auditable.
- Payment and subscription state transitions must be auditable.
- Curriculum updates must not erase historical student progress.
- Live shared content updates should reach active students in real time.

### Security

- Payment state must be verified server-side.
- Users should not be able to edit their own points directly.
- Teacher reward permissions must be role-based.
- Assistant teacher reward actions must be auditable.
- Chat content and student learning history must be protected.
- Passwords must never be stored in plain text.
- OTP codes must expire and be rate-limited.
- SMS and WhatsApp OTP attempts must have abuse protection.
- Social login provider IDs must be linked securely to one student account.
- Telephone number changes must require re-verification.
- Role-based access must protect student, parent, teacher, and support data.
- Consent records and sensitive support actions must be auditable.
- Payment/support lookup by Student ID must not expose unnecessary student data.

## 29. MVP Scope

### In Scope

The list below is the full commercial MVP scope. Delivery should follow the phased rollout in Section 25, with Phase 1 treated as the first build baseline.

- Signup by email and password.
- Signup/login by Google/Gmail.
- Signup/login by Facebook.
- Telephone OTP verification by SMS or WhatsApp.
- Generated Mutken Student ID in student profile.
- Free vs paid entitlement logic.
- Monthly subject packages.
- Study plan home screen.
- Library resources.
- Resource lesson page with video markers, questions, stars, and answer feedback.
- Points system.
- Excellence board activation.
- Live session prototype flow.
- Assistant teacher chat with study plan recommendations and rewardable clips.
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

## 30. Release Readiness Checklist

- Email signup works.
- Google signup/login works.
- Facebook signup/login works.
- Telephone OTP verification works by SMS or WhatsApp.
- OTP expiry, resend, and failed-attempt limits are implemented.
- Student ID is generated uniquely.
- Student ID appears in profile.
- Student ID can be used in payment/support lookup.
- Consent records are captured and auditable.
- Parent/guardian consent path is defined.
- Entitlement rules use the central entitlement matrix.
- Payment and subscription states are tested.
- Manual payment reconciliation can use Student ID.
- Free caps defined and enforced.
- Paid package entitlement rules implemented.
- Subscription state controls subject access.
- Points events are generated from real actions.
- Weekly points and lifetime points are separated.
- Ranking eligibility and point earning are separated.
- Excellence board activation rule is clear.
- Curriculum catalog is versioned by academic year and subject.
- Resource video markers trigger the correct questions.
- Incorrect resource answers show explanation and hint.
- Correct resource answers show confirmation and reasoning.
- Resource stars complete at 5/5.
- Watch percentage awards points but does not control resource completion.
- Resource completion cannot duplicate stars or points.
- Assistant teacher chat can recommend a study plan item.
- Assistant teacher chat can recommend a short clip with reward.
- Assistant teacher reward points are capped and traceable.
- Live session attendance and answer points are tracked.
- Teacher console can control the live shared area.
- Library content locks/unlocks correctly.
- Progress data reflects completed work.
- Challenge rewards cannot be duplicated.
- Upgrade prompts appear at the right moments.
- Arabic RTL layout is verified on mobile.

## 31. Open Product Decisions

1. Final number of available subjects for launch.
2. Whether free users can join full live sessions or only previews.
3. Exact daily assistant teacher limit for free users.
4. Whether paid users have any ranking-specific points cap despite unlimited learning.
5. Payment provider for Egypt.
6. Whether parents receive progress reports inside the app, by email, or by WhatsApp.
7. Whether subject switching is allowed once monthly or requires support approval.
8. Whether every resource must always have exactly 5 marker questions or whether 5 stars can be earned across a variable number of questions.
9. Whether assistant teacher chat is human-operated, AI-assisted, or hybrid for the MVP.
10. Whether telephone OTP should allow both SMS and WhatsApp at launch or start with one primary channel.
11. Whether parent/guardian data should be mandatory during signup or collected later before payment.
12. Final Mutken Student ID format.
13. Refund policy and grace period length.
14. Data retention period for chat, progress, OTP, and payment records.
15. Guardian consent age threshold and legal text.
16. Curriculum source of truth and content review owner.
17. Exact Phase 1 launch scope and timeline.
