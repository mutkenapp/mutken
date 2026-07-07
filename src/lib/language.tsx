import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Globe, Check } from "lucide-react";

export type Lang = "ar" | "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string; dir: "rtl" | "ltr" };
const LanguageContext = createContext<Ctx>({ lang: "ar", setLang: () => {}, t: (k) => k, dir: "rtl" });

const dict: Record<string, { ar: string; en: string }> = {
  // Common
  "app.name": { ar: "متقن", en: "Mutken" },
  "common.seeAll": { ar: "عرض الكل", en: "See all" },
  "common.online": { ar: "متصل", en: "Online" },
  "common.details": { ar: "التفاصيل", en: "Details" },
  "common.active": { ar: "نشط", en: "Active" },
  "common.min": { ar: "دقيقة", en: "min" },
  "common.tasks": { ar: "مهام", en: "tasks" },
  "common.of": { ar: "من", en: "of" },
  "common.days": { ar: "أيام", en: "days" },
  "common.day": { ar: "يوم", en: "day" },
  "common.week": { ar: "الأسبوع", en: "Week" },
  "common.left": { ar: "متبقية", en: "left" },
  "common.unlocked": { ar: "مفتوح", en: "Unlocked" },
  "common.locked": { ar: "مغلق", en: "Locked" },
  "common.inProgress": { ar: "قيد التنفيذ", en: "In progress" },
  "common.subjects": { ar: "المواد", en: "Subjects" },
  "common.score": { ar: "النتيجة", en: "Score" },
  "common.lessons": { ar: "دروس", en: "lessons" },
  "common.pts": { ar: "نقطة", en: "pts" },

  // Language selector
  "lang.title": { ar: "اللغة", en: "Language" },
  "lang.ar": { ar: "العربية", en: "Arabic" },
  "lang.en": { ar: "الإنجليزية", en: "English" },

  // Nav
  "nav.studyPlan": { ar: "الخطة الدراسية", en: "Study Plan" },
  "nav.progress": { ar: "التقدم", en: "Progress" },
  "nav.library": { ar: "المكتبة", en: "Library" },
  "nav.live": { ar: "مباشر", en: "Live" },
  "nav.challenges": { ar: "التحديات", en: "Challenges" },
  "nav.assistant": { ar: "المعلم المساعد", en: "Assistant teacher" },

  // Today
  "today.greeting": { ar: "متقن", en: "Mutken" },
  "today.hello": { ar: "صباحاً، عمر", en: "Morning, Omar" },
  "today.subtitle": { ar: "هذا هدفك لليوم", en: "Here is your goal for today" },
  "hero.greeting": { ar: "أحسنت يا عمر! 👏", en: "Great job, Omar! 👏" },
  "hero.msg.math": { ar: "لاحظت أنك أتقنت الجمع والطرح بنسبة ٩٢٪. اليوم سننهي الكسور معًا خطوة بخطوة.", en: "I noticed you mastered addition & subtraction with 92%. Today we'll finish fractions together, step by step." },
  "hero.msg.science": { ar: "أداؤك في القوى ممتاز! اليوم سنكمل تجربة الحركة خطوة بخطوة.", en: "Your work on forces is excellent! Today we'll complete the motion experiment together." },
  "hero.msg.english": { ar: "قواعدك تتحسن بسرعة! اليوم نتدرب على المحادثة معًا.", en: "Your grammar is improving fast! Today we practice speaking together." },
  "hero.msg.arabic": { ar: "إعرابك أصبح دقيقًا! اليوم نكمل درس الإعراب معًا.", en: "Your I'raab is getting sharp! Today we'll finish the lesson together." },
  "weekly.title": { ar: "تقدمك هذا الأسبوع", en: "Your progress this week" },
  "weekly.daysLeft": { ar: "٣ أيام متبقية", en: "3 days left" },
  "weekly.goal": { ar: "الهدف الأسبوعي", en: "Weekly Goal" },
  "today.todaysGoal": { ar: "هدف اليوم", en: "Today's Goal" },
  "today.goalTitle": { ar: "أكمل خطة الكسور في الرياضيات", en: "Complete your Math Fractions Plan" },
  "today.onTrack": { ar: "على المسار الصحيح", en: "On Track" },
  "today.min45": { ar: "٤٥ دقيقة", en: "45 min" },
  "today.taskCount": { ar: "٢ من ٥ مهام", en: "2 of 5 tasks" },
  "today.continuePlan": { ar: "متابعة الخطة", en: "Continue Plan" },
  "today.msSara": { ar: "أ. أحمد", en: "Mr. Ahmed" },
  "today.assistantTeacher": { ar: "معلم المادة", en: "Subject Teacher" },
  "today.msg": { ar: "اليوم سنركز على ضرب الكسور…", en: "Today we'll focus on multiplying fractions…" },
  "today.nextMeeting": { ar: "الاجتماع القادم", en: "Next Meeting" },
  "today.in2days": { ar: "بعد يومين", en: "in 2 days" },
  "today.weeklyReview": { ar: "مراجعة التقدم الأسبوعية", en: "Weekly Progress Review" },
  "today.meetingWhen": { ar: "الثلاثاء، ٦:٣٠ مساءً · مع أ. سارة", en: "Tue, 6:30 PM · with Ms. Sara" },
  "today.addReminder": { ar: "إضافة تذكير", en: "Add Reminder" },
  "today.goLive": { ar: "انضم للمباشر", en: "Go Live" },
  "today.todaysTasks": { ar: "رحلة التعلم اليوم", en: "Today's Learning Journey" },
  "today.tasksMeta": { ar: "٥ مهام · ٤٥ دقيقة", en: "5 tasks · 45 min" },
  "today.task1": { ar: "فهم الكسور", en: "Understanding Fractions" },
  "today.task2": { ar: "تدريب · ١٠ أسئلة", en: "Practice · 10 Questions" },
  "today.task3": { ar: "ملخص سريع", en: "Quick Summary" },
  "today.task4": { ar: "اختبار الكسور", en: "Fractions Checkpoint" },
  "today.task5": { ar: "تأمل", en: "Reflection" },
  "type.watch": { ar: "مشاهدة", en: "Watch" },
  "type.practice": { ar: "تدريب", en: "Practice" },
  "type.read": { ar: "قراءة", en: "Read" },
  "type.quiz": { ar: "اختبار", en: "Quiz" },
  "type.reflect": { ar: "تأمل", en: "Reflect" },
  "type.video": { ar: "فيديو", en: "Video" },
  "time.8min": { ar: "٨ دقائق", en: "8 min" },
  "time.15min": { ar: "١٥ دقيقة", en: "15 min" },
  "time.5min": { ar: "٥ دقائق", en: "5 min" },
  "time.12min": { ar: "١٢ دقيقة", en: "12 min" },
  "time.3min": { ar: "٣ دقائق", en: "3 min" },
  "today.recommendedForYou": { ar: "موصى به لك", en: "Recommended for you" },
  "today.recTitle": { ar: "راجع الكسور المتكافئة قبل بدء الاختبار", en: "Review equivalent fractions before starting the quiz" },
  "today.startReview": { ar: "ابدأ مراجعة ٥ دقائق", en: "Start 5-min Review" },
  "today.streak": { ar: "سلسلة ٤ أيام", en: "4-day streak" },
  "today.streakDesc": { ar: "استمر لفتح شارة", en: "Keep going to unlock a badge" },
  "today.short30": { ar: "مقطع · ٣٠ ثانية", en: "Short · 30s" },
  "today.shortTitle": { ar: "بسّط الكسور في ٣٠ ثانية", en: "Simplify fractions in 30 seconds" },
  "today.shortMeta": { ar: "رياضيات · كسور", en: "Math · Fractions" },

  // Per-subject today content
  "sub.science.goal": { ar: "أكمل تجربة القوى والحركة", en: "Complete the Forces & Motion experiment" },
  "sub.science.min": { ar: "٤٠ دقيقة", en: "40 min" },
  "sub.science.taskCount": { ar: "٢ من ٤ مهام", en: "2 of 4 tasks" },
  "sub.science.t1": { ar: "شرح قوانين نيوتن", en: "Newton's Laws explained" },
  "sub.science.t2": { ar: "قراءة: الاحتكاك", en: "Read: Friction" },
  "sub.science.t3": { ar: "تجربة السرعة", en: "Speed experiment" },
  "sub.science.t4": { ar: "اختبار الوحدة", en: "Unit checkpoint" },

  "sub.english.goal": { ar: "تدرّب على القراءة والقواعد", en: "Practice reading & grammar" },
  "sub.english.min": { ar: "٣٠ دقيقة", en: "30 min" },
  "sub.english.taskCount": { ar: "١ من ٤ مهام", en: "1 of 4 tasks" },
  "sub.english.t1": { ar: "فيديو: الأزمنة الحاضرة", en: "Video: Present tenses" },
  "sub.english.t2": { ar: "قراءة قصيرة", en: "Short reading passage" },
  "sub.english.t3": { ar: "تمارين القواعد", en: "Grammar practice" },
  "sub.english.t4": { ar: "تأمل الكتابة", en: "Writing reflection" },

  "sub.arabic.goal": { ar: "أكمل درس الإعراب", en: "Complete grammar (I'raab) lesson" },
  "sub.arabic.min": { ar: "٢٥ دقيقة", en: "25 min" },
  "sub.arabic.taskCount": { ar: "٣ من ٤ مهام", en: "3 of 4 tasks" },
  "sub.arabic.t1": { ar: "قراءة النص", en: "Read the passage" },
  "sub.arabic.t2": { ar: "فيديو: علامات الإعراب", en: "Video: Grammar signs" },
  "sub.arabic.t3": { ar: "تدريب على الإعراب", en: "I'raab practice" },
  "sub.arabic.t4": { ar: "تأمل التعلم", en: "Learning reflection" },

  // Islamic subject removed

  // Per-subject teachers & meetings
  "teacher.math.name": { ar: "أ. أحمد", en: "Mr. Ahmed" },
  "teacher.math.msg": { ar: "اليوم سنركز على ضرب الكسور…", en: "Today we'll focus on multiplying fractions…" },
  "meeting.math.title": { ar: "مراجعة الرياضيات الأسبوعية", en: "Weekly Math Review" },
  "meeting.math.when": { ar: "الثلاثاء، ٦:٣٠ مساءً · مع أ. أحمد", en: "Tue, 6:30 PM · with Mr. Ahmed" },
  "meeting.math.time": { ar: "الثلاثاء - 7/7/2025", en: "Tue, 07/07/2025" },
  "meeting.math.in": { ar: "بعد يومين", en: "in 2 days" },

  "teacher.science.name": { ar: "أ. منى", en: "Ms. Mona" },
  "teacher.science.msg": { ar: "جهّزي التجربة قبل الحصة، ستحبينها!", en: "Get the experiment ready before class, you'll love it!" },
  "meeting.science.title": { ar: "مختبر القوى والحركة", en: "Forces & Motion Lab" },
  "meeting.science.when": { ar: "الأربعاء، ٥:٠٠ مساءً · مع أ. منى", en: "Wed, 5:00 PM · with Ms. Mona" },
  "meeting.science.time": { ar: "الأربعاء - 8/7/2025", en: "Wed, 08/07/2025" },
  "meeting.science.in": { ar: "بعد ٣ أيام", en: "in 3 days" },

  "teacher.english.name": { ar: "أ. ليلى", en: "Ms. Layla" },
  "teacher.english.msg": { ar: "لنراجع الأزمنة الحاضرة بمحادثة قصيرة.", en: "Let's review present tenses with a short conversation." },
  "meeting.english.title": { ar: "محادثة إنجليزية", en: "English Speaking Session" },
  "meeting.english.when": { ar: "الخميس، ٤:٠٠ مساءً · مع أ. ليلى", en: "Thu, 4:00 PM · with Ms. Layla" },
  "meeting.english.time": { ar: "الخميس - 9/7/2025", en: "Thu, 09/07/2025" },
  "meeting.english.in": { ar: "بعد ٤ أيام", en: "in 4 days" },

  "teacher.arabic.name": { ar: "أ. خالد", en: "Mr. Khaled" },
  "teacher.arabic.msg": { ar: "سنتدرب اليوم على الإعراب معاً.", en: "Today we'll practice I'raab together." },
  "meeting.arabic.title": { ar: "درس الإعراب", en: "I'raab Lesson" },
  "meeting.arabic.when": { ar: "الاثنين، ٥:٣٠ مساءً · مع أ. خالد", en: "Mon, 5:30 PM · with Mr. Khaled" },
  "meeting.arabic.time": { ar: "الاثنين - 6/7/2025", en: "Mon, 06/07/2025" },
  "meeting.arabic.in": { ar: "غداً", en: "tomorrow" },

  // Islamic teacher & meeting removed

  // Progress
  "progress.myProfile": { ar: "ملفي الشخصي", en: "My Profile" },
  "progress.title": { ar: "تقدم التعلم", en: "Learning Progress" },
  "progress.studentName": { ar: "عمر الناصر", en: "Omar Al-Nasser" },
  "progress.grade": { ar: "الصف السادس · كامبريدج", en: "Grade 6 · Cambridge" },
  "progress.streakLabel": { ar: "السلسلة", en: "Streak" },
  "progress.streakVal": { ar: "٤ أيام", en: "4 days" },
  "progress.studyTime": { ar: "وقت الدراسة", en: "Study time" },
  "progress.studyTimeVal": { ar: "١٢س ٣٠د", en: "12h 30m" },
  "progress.mastery": { ar: "الإتقان", en: "Mastery" },
  "progress.saraInsight": { ar: "ملاحظة أ. سارة", en: "Ms. Sara's insight" },
  "progress.saraText": { ar: "تتحسن جيداً في الرياضيات. هذا الأسبوع ركّز على حل المسائل وقراءة الأسئلة بعناية.", en: "You're improving well in Math. This week, focus on problem-solving and reading questions carefully." },
  "progress.aiInsight": { ar: "توصية الذكاء الاصطناعي", en: "AI Insight" },
  "progress.aiText": { ar: "الطلاب مثلك تحسّنوا أسرع بثلاث جلسات تدريب قصيرة على الكسور", en: "Students like you improved faster with 3 short practice sessions in Fractions" },
  "progress.startPractice": { ar: "ابدأ التدريب", en: "Start Practice" },
  "progress.achievements": { ar: "الإنجازات", en: "Achievements" },
  "badge.streak5": { ar: "سلسلة ٥ أيام", en: "5-Day Streak" },
  "badge.quizMaster": { ar: "بطل الاختبارات", en: "Quiz Master" },
  "badge.mathImprover": { ar: "متقدم في الرياضيات", en: "Math Improver" },
  "badge.consistent": { ar: "متعلم منتظم", en: "Consistent Learner" },
  "subject.math": { ar: "رياضيات", en: "Math" },
  "subject.science": { ar: "علوم", en: "Science" },
  "subject.english": { ar: "إنجليزي", en: "English" },
  "subject.arabic": { ar: "عربي", en: "Arabic" },
  "subject.social": { ar: "اجتماعيات", en: "Social" },
  
  "status.improving": { ar: "يتحسن", en: "Improving" },
  "status.needsPractice": { ar: "يحتاج تدريباً", en: "Needs Practice" },
  "status.strong": { ar: "ممتاز", en: "Strong" },
  "status.onTrack": { ar: "على المسار", en: "On Track" },
  "status.mastered": { ar: "متقن", en: "Mastered" },
  "status.good": { ar: "جيد", en: "Good" },
  "weak.fractions": { ar: "الكسور", en: "Fractions" },
  "weak.forces": { ar: "القوى والحركة", en: "Forces & Motion" },
  "weak.grammar": { ar: "القواعد", en: "Grammar" },
  "weak.none": { ar: "—", en: "—" },
  "progress.weak": { ar: "الضعف", en: "Weak" },

  // Library
  "library.title": { ar: "مكتبة التعلم", en: "Learning Library" },
  "library.subtitle": { ar: "استكشف الدروس والفيديوهات والتدريبات", en: "Explore lessons, videos, and practice sets" },
  "library.searchPlaceholder": { ar: "ابحث عن دروس أو مواد أو مهارات…", en: "Search lessons, subjects, skills…" },
  "library.filter.grade6": { ar: "الصف السادس", en: "Grade 6" },
  "library.filter.allSubjects": { ar: "كل المواد", en: "All Subjects" },
  "library.filter.videos": { ar: "فيديوهات", en: "Videos" },
  "library.filter.practice": { ar: "تدريبات", en: "Practice" },
  "library.filter.quizzes": { ar: "اختبارات", en: "Quizzes" },
  "library.filter.recommended": { ar: "موصى", en: "Recommended" },
  "library.continueLearning": { ar: "متابعة التعلم", en: "Continue Learning" },
  "library.multiplyFractions": { ar: "ضرب الكسور", en: "Multiplying Fractions" },
  "library.becauseFractions": { ar: "لأنك تتدرب على الكسور", en: "Because you're practicing Fractions" },
  "library.rec1": { ar: "أساسيات الكسور المتكافئة", en: "Equivalent Fractions Basics" },
  "library.rec2": { ar: "شرح الأعداد المختلطة", en: "Mixed Numbers Explained" },
  "library.rec3": { ar: "مسائل كلامية - مجموعة ٣", en: "Word Problems Set 3" },
  "library.rec4": { ar: "تحدي الكسور السريع", en: "Fraction Sprint Challenge" },

  // Live
  "today.liveNow": { ar: "مباشر الآن", en: "Live Now" },
  "today.liveTitle": { ar: "انضم إلى الحصة المباشرة", en: "Join the Live Class" },
  "live.live": { ar: "مباشر", en: "Live" },
  "live.speaking": { ar: "يشرح الآن", en: "Speaking now" },
  "live.sharedByTeacher": { ar: "مشاركة من المعلم", en: "Shared by teacher" },
  "live.qCounter": { ar: "سؤال ٢ من ٥", en: "Question 2 of 5" },
  "live.question": { ar: "ما ناتج ٣/٤ + ١/٨ ؟", en: "What is 3/4 + 1/8 ?" },
  "live.opt1": { ar: "٤/١٢", en: "4/12" },
  "live.opt2": { ar: "٤/٨", en: "4/8" },
  "live.opt3": { ar: "٧/٨", en: "7/8" },
  "live.opt4": { ar: "١/٢", en: "1/2" },
  "live.submit": { ar: "أرسل الإجابة", en: "Submit Answer" },
  "live.answerSent": { ar: "تم إرسال إجابتك", en: "Answer sent" },
  "live.teacherNote": { ar: "ملاحظة المعلم", en: "Teacher note" },
  "live.explanation": { ar: "أحسنت! وحّد المقامات ثم اجمع البسط.", en: "Great! Find a common denominator, then add the numerators." },

  // Challenges
  "challenges.title": { ar: "التحديات", en: "Challenges" },
  "challenges.subtitle": { ar: "تنافس، تدرّب، وتحسّن كل أسبوع", en: "Compete, practice, and improve every week" },
  "challenges.thisWeek": { ar: "هذا الأسبوع", en: "This Week" },
  "challenges.timeLeft": { ar: "متبقٍ ٤ي ١٢س", en: "4d 12h left" },
  "challenges.sprintTitle": { ar: "سباق الكسور", en: "Fraction Sprint" },
  "challenges.sprintDesc": { ar: "أكمل ٢٠ سؤال كسور بدقة ٨٠٪", en: "Complete 20 fraction questions with 80% accuracy" },
  "challenges.pts150": { ar: "+١٥٠ نقطة", en: "+150 pts" },
  "challenges.badgeStarter": { ar: "شارة مبتدئ الكسور", en: "Fraction Starter badge" },
  "challenges.yourProgress": { ar: "تقدمك", en: "Your progress" },
  "challenges.continue": { ar: "متابعة التحدي", en: "Continue Challenge" },
  "challenges.cat.speed": { ar: "السرعة", en: "Speed" },
  "challenges.cat.team": { ar: "جماعي", en: "Team" },
  "challenges.cat.accuracy": { ar: "الدقة", en: "Accuracy" },
  "challenges.leaderboard": { ar: "لوحة الأسبوع", en: "Weekly Leaderboard" },
  "challenges.myClass": { ar: "صفي · السادس أ", en: "My Class · Grade 6-A" },
  "challenges.mostImproved": { ar: "الأكثر تحسناً هذا الأسبوع", en: "Most Improved this week" },
  "challenges.mostImprovedText": { ar: "ارتفعت ١٤٪ في الرياضيات · واصل!", en: "You're up 14% in Math · Keep it up!" },
  "challenges.p1": { ar: "ليلى م.", en: "Layla M." },
  "challenges.p2": { ar: "يوسف ك.", en: "Yousef K." },
  "challenges.p3": { ar: "سارة أ.", en: "Sara A." },
  "challenges.pme": { ar: "عمر (أنت)", en: "Omar (you)" },

  // Chat
  "chat.online": { ar: "معلمة مساعدة · متصلة", en: "Assistant Teacher · Online" },
  "chat.msg1": { ar: "مرحباً عمر! جهزت خطة اليوم لك. ركّز على المهمة الثانية لأن اختبارك السابق أظهر أخطاء في التبسيط.", en: "Hi Omar! I prepared your study plan for today. Focus on Task 2 because your last quiz showed some mistakes in simplification." },
  "chat.studyPlan": { ar: "خطة الدراسة", en: "Study Plan" },
  "chat.mathFractions": { ar: "رياضيات · كسور", en: "Math · Fractions" },
  "chat.msg2": { ar: "تحسنت من ٦٨٪ إلى ٨٢٪ الأسبوع الماضي — تقدم رائع! التالي سنتدرب على المسائل الكلامية معاً.", en: "You improved from 68% to 82% last week — great progress! Next, we'll practice word problems together." },
  "chat.studentMsg": { ar: "شكراً أ. سارة! لم أفهم السؤال ٤ في التدريب.", en: "Thank you Ms. Sara! I don't understand question 4 in the practice." },
  "chat.msg3": { ar: "لا مشكلة. حوّل العدد المختلط إلى كسر غير حقيقي أولاً، ثم اضرب. شاهد هذا المقطع لـ ٣٠ ثانية:", en: "No problem. Try converting the mixed number to an improper fraction first, then multiply. Watch this 30-second clip:" },
  "chat.clipTitle": { ar: "تحويل العدد المختلط إلى كسر", en: "Mixed to Improper Fractions" },
  "chat.q1": { ar: "اسأل عن خطة اليوم", en: "Ask about today's plan" },
  "chat.q2": { ar: "أحتاج مساعدة", en: "I need help" },
  "chat.q3": { ar: "إعادة جدولة الاجتماع", en: "Reschedule meeting" },
  "chat.q4": { ar: "أظهر تقدمي", en: "Show my progress" },
  "chat.inputPlaceholder": { ar: "اكتب سؤالك…", en: "Type your question…" },

  // Plan
  "plan.header": { ar: "خطة الدراسة", en: "Study Plan" },
  "plan.subheader": { ar: "رياضيات · الصف السادس", en: "Math · Grade 6" },
  "plan.title": { ar: "الكسور: الضرب والتبسيط", en: "Fractions: Multiplication & Simplification" },
  "plan.complete": { ar: "مكتمل", en: "Complete" },
  "plan.dueToday": { ar: "مستحق اليوم", en: "Due today" },
  "plan.noteFromSara": { ar: "ملاحظة من أ. سارة", en: "Note from Ms. Sara" },
  "plan.noteText": { ar: "ركّز على فهم الطريقة، ليس فقط الحل السريع. إذا حصلت على أقل من ٧٠٪ ستتضمن الخطة القادمة نشاط مراجعة.", en: "Focus on understanding the method, not just solving fast. If you score below 70%, the next plan will include a review activity." },
  "plan.objectives": { ar: "أهداف التعلم", en: "Learning Objectives" },
  "plan.obj1": { ar: "ضرب كسرين بشكل صحيح", en: "Multiply two fractions correctly" },
  "plan.obj2": { ar: "تبسيط الإجابة النهائية", en: "Simplify the final answer" },
  "plan.obj3": { ar: "حل المسائل الكلامية باستخدام الكسور", en: "Solve word problems using fractions" },
  "plan.obj4": { ar: "تحديد الأخطاء الشائعة", en: "Identify common mistakes" },
  "plan.taskJourney": { ar: "رحلة المهام", en: "Task Journey" },
  "plan.t1": { ar: "فهم الكسور", en: "Understanding Fractions" },
  "plan.t2": { ar: "ملخص الطريقة", en: "Method Summary" },
  "plan.t3": { ar: "١٠ أسئلة تدريبية", en: "10 Practice Questions" },
  "plan.t4": { ar: "اختبار الكسور", en: "Fractions Checkpoint" },
  "plan.t5": { ar: "فحص الثقة", en: "Confidence Check" },
  "plan.watched": { ar: "شوهد", en: "watched" },
  "plan.aiTip": { ar: "نصيحة الذكاء الاصطناعي", en: "AI Tip" },
  "plan.aiTipText": { ar: "راجع الكسور المتكافئة قبل الاختبار لرفع الدقة.", en: "Review equivalent fractions before the quiz to boost accuracy." },
  "plan.askSara": { ar: "اسأل أ. سارة", en: "Ask Ms. Sara" },
  "plan.continuePlan": { ar: "متابعة الخطة", en: "Continue Plan" },

  // Meeting
  "meeting.header": { ar: "الاجتماع القادم", en: "Next Meeting" },
  "meeting.subheader": { ar: "المراجعة الأسبوعية", en: "Weekly Review" },
  "meeting.online": { ar: "اجتماع عبر الإنترنت", en: "Online Meeting" },
  "meeting.title": { ar: "مراجعة التقدم الأسبوعية", en: "Weekly Progress Review" },
  "meeting.date": { ar: "الثلاثاء ١٨ مارس", en: "Tue, Mar 18" },
  "meeting.time": { ar: "٦:٣٠ مساءً · ٣٠ دقيقة", en: "6:30 PM · 30 min" },
  "meeting.agenda": { ar: "جدول الأعمال", en: "Agenda" },
  "meeting.a1": { ar: "مراجعة تقدم كسور الرياضيات", en: "Review Math Fractions progress" },
  "meeting.a2": { ar: "مناقشة نقاط الضعف", en: "Discuss weak areas" },
  "meeting.a3": { ar: "تحديد تركيز التعلم للأسبوع القادم", en: "Set next week's learning focus" },
  "meeting.a4": { ar: "الإجابة على أسئلتك", en: "Answer your questions" },
  "meeting.before": { ar: "قبل الاجتماع", en: "Before Our Meeting" },
  "meeting.c1": { ar: "إنهاء خطة اليوم", en: "Finish today's study plan" },
  "meeting.c2": { ar: "إكمال الاختبار المرحلي", en: "Complete checkpoint quiz" },
  "meeting.c3": { ar: "اكتب سؤالاً للمعلمة", en: "Write one question for teacher" },
  "meeting.c4": { ar: "راجع تقرير التقدم", en: "Review progress report" },
  "meeting.reminder": { ar: "إضافة تذكير", en: "Add Reminder" },
  "meeting.message": { ar: "مراسلة المعلمة", en: "Message Teacher" },
  "meeting.join": { ar: "انضم للاجتماع", en: "Join Meeting" },

  // Subject
  "subject.header": { ar: "تقرير المادة", en: "Subject Report" },
  "subject.mathGrade": { ar: "رياضيات · الصف السادس", en: "Math · Grade 6" },
  "subject.overall": { ar: "الإتقان الكلي · يتحسن", en: "Overall mastery · Improving" },
  "subject.thisMonth": { ar: "+١٢٪ هذا الشهر", en: "+12% this month" },
  "subject.lessonsStat": { ar: "الدروس", en: "Lessons" },
  "subject.avgQuiz": { ar: "متوسط الاختبارات", en: "Avg quiz" },
  "subject.timeStat": { ar: "الوقت", en: "Time" },
  "subject.timeVal": { ar: "٦س ٢٠د", en: "6h 20m" },
  "subject.weeklyTrend": { ar: "الاتجاه الأسبوعي", en: "Weekly Trend" },
  "subject.last7": { ar: "آخر ٧ أسابيع", en: "Last 7 weeks" },
  "subject.domains": { ar: "المجالات", en: "Domains" },
  "subject.d1": { ar: "العمليات على الأعداد", en: "Number Operations" },
  "subject.d2": { ar: "الكسور", en: "Fractions" },
  "subject.d3": { ar: "التفكير الجبري", en: "Algebraic Thinking" },
  "subject.d4": { ar: "الهندسة", en: "Geometry" },
  "subject.d5": { ar: "القياس", en: "Measurement" },
  "subject.recommended": { ar: "الخطوات الموصى بها", en: "Recommended Next Steps" },
  "subject.r1": { ar: "مراجعة تبسيط الكسور", en: "Review simplifying fractions" },
  "subject.r2": { ar: "شاهد: شرح الأعداد المختلطة", en: "Watch: Mixed Numbers explained" },
  "subject.r3": { ar: "أكمل تحدي سباق الكسور", en: "Complete Fraction Sprint challenge" },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("mutken-lang")) as Lang | null;
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("mutken-lang", l);
    } catch {}
  };

  const t = (key: string) => dict[key]?.[lang] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
export const useT = () => useContext(LanguageContext).t;

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onClick = () => setOpen(false);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [open]);

  return (
    <div className="relative" dir="ltr" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang.title")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="h-10 w-10 rounded-full bg-card/95 border border-border backdrop-blur flex items-center justify-center shadow-sm active:scale-95 transition-transform"
      >
        <Globe className="h-4 w-4 text-navy" />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-40 rounded-2xl border border-border bg-card shadow-soft overflow-hidden z-50"
        >
          <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {t("lang.title")}
          </p>
          {(["ar", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              role="option"
              aria-selected={lang === l}
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-muted transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-muted-foreground w-5">
                  {l.toUpperCase()}
                </span>
                <span className="font-medium">{t(`lang.${l}`)}</span>
              </span>
              {lang === l && <Check className="h-4 w-4 text-blue" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
