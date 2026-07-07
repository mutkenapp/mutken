export type PointText = {
  ar: string;
  en: string;
};

export type PointRule = {
  label: PointText;
  points: string;
  note?: PointText;
};

export const leaderboardUnlockPoints = 100;
export const leaderboardUnlockActivities = 3;
export const currentWeeklyPoints = 85;
export const currentWeeklyActivities = 2;
export const lifetimePoints = 1200;
export const achievementStreakDays = 12;

export const pointsRemaining = Math.max(leaderboardUnlockPoints - currentWeeklyPoints, 0);
export const leaderboardProgress = Math.min(
  Math.round((currentWeeklyPoints / leaderboardUnlockPoints) * 100),
  100,
);

export const weeklyPointSources: PointRule[] = [
  {
    label: { ar: "مشاهدة الموارد", en: "Watched resources" },
    points: "+30",
    note: { ar: "فيديو مكتمل ومراجعة قصيرة", en: "Completed video and short review" },
  },
  {
    label: { ar: "إجابات التدريب", en: "Practice answers" },
    points: "+25",
    note: { ar: "أسئلة ما بعد الدرس", en: "Post-lesson questions" },
  },
  {
    label: { ar: "الحصة المباشرة", en: "Live session" },
    points: "+20",
    note: { ar: "حضور وإجابة سؤال مباشر", en: "Attendance and one live answer" },
  },
  {
    label: { ar: "مكافأة المعلم المساعد", en: "Assistant teacher reward" },
    points: "+10",
    note: { ar: "تصحيح خطأ بعد الملاحظة", en: "Fixed a mistake after feedback" },
  },
];

export const resourcePointRules: PointRule[] = [
  { label: { ar: "مشاهدة ٨٠٪ من الفيديو", en: "Watch 80% of a video" }, points: "+10" },
  { label: { ar: "إكمال مورد أو درس", en: "Complete a resource or lesson" }, points: "+20" },
  { label: { ar: "إنهاء أسئلة ما بعد الفيديو", en: "Finish post-video questions" }, points: "+25" },
  { label: { ar: "دقة ٨٠٪ أو أكثر", en: "80%+ accuracy" }, points: "+20" },
];

export const answerPointRules: PointRule[] = [
  { label: { ar: "إجابة صحيحة من أول محاولة", en: "Correct on first try" }, points: "+10" },
  { label: { ar: "إجابة صحيحة من ثاني محاولة", en: "Correct on second try" }, points: "+6" },
  { label: { ar: "إجابة صحيحة بعد تلميح", en: "Correct after a hint" }, points: "+3" },
];

export const livePointRules: PointRule[] = [
  { label: { ar: "الدخول في الوقت", en: "Join on time" }, points: "+15" },
  { label: { ar: "حضور ٨٠٪ من الحصة", en: "Stay for 80% of session" }, points: "+20" },
  { label: { ar: "إجابة سؤال مباشر", en: "Answer a live question" }, points: "+8" },
  { label: { ar: "إجابة مباشرة صحيحة", en: "Correct live answer" }, points: "+15" },
  { label: { ar: "تقييم ممتاز من المعلم", en: "Teacher marks excellent" }, points: "+20" },
];

export const assistantPointRules: PointRule[] = [
  { label: { ar: "إكمال مهمة موصى بها", en: "Complete recommended task" }, points: "+20" },
  { label: { ar: "تصحيح خطأ بعد ملاحظة", en: "Fix a mistake after feedback" }, points: "+15" },
  { label: { ar: "طلب مساعدة ثم إكمال الشرح", en: "Ask for help and finish explanation" }, points: "+10" },
  { label: { ar: "مكافأة جهد من المعلم", en: "Teacher effort reward" }, points: "+10-30" },
];

export const challengePointRules: PointRule[] = [
  { label: { ar: "إكمال تحدي أسبوعي", en: "Complete weekly challenge" }, points: "+100" },
  { label: { ar: "دقة ٨٠٪ في التحدي", en: "80%+ challenge accuracy" }, points: "+50" },
  { label: { ar: "تحسن عن الأسبوع السابق", en: "Improve from last week" }, points: "+40" },
  { label: { ar: "سلسلة تعلم ٥ أيام", en: "5-day learning streak" }, points: "+75" },
];

export const todayPointBoosters: PointRule[] = [
  { label: { ar: "أكمل فيديو الكسور", en: "Complete fractions video" }, points: "+20" },
  { label: { ar: "أجب عن كل الأسئلة", en: "Answer all questions" }, points: "+25" },
  { label: { ar: "أنهِ خطة اليوم", en: "Finish today's plan" }, points: "+40" },
];
