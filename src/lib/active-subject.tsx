import { createContext, useContext, useState, type ReactNode } from "react";
import {
  Calculator,
  FlaskConical,
  Languages,
  BookA,
  Video,
  ClipboardCheck,
  BookOpen,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import teacherMath from "@/assets/teacher_math.jpg.asset.json";
import teacherScience from "@/assets/teacher_science.jpg.asset.json";

export type SubjectId = "math" | "science" | "english" | "arabic";

export type SubjectData = {
  id: SubjectId;
  labelKey: string;
  icon: LucideIcon;
  progress: number;
  goalKey: string;
  minKey: string;
  taskCountKey: string;
  teacherPhoto: string;
  teacherNameKey: string;
  teacherInitial: string;
  teacherMsgKey: string;
  meetingTitleKey: string;
  meetingWhenKey: string;
  meetingTimeKey: string;
  meetingInKey: string;
  tasks: {
    icon: LucideIcon;
    titleKey: string;
    timeKey: string;
    status: "done" | "progress" | "todo" | "locked";
    typeKey: string;
  }[];
};

export const SUBJECTS: SubjectData[] = [
  {
    id: "math",
    labelKey: "subject.math",
    icon: Calculator,
    progress: 40,
    goalKey: "today.goalTitle",
    minKey: "today.min45",
    taskCountKey: "today.taskCount",
    teacherPhoto: teacherMath.url,
    teacherNameKey: "teacher.math.name",
    teacherInitial: "S",
    teacherMsgKey: "teacher.math.msg",
    meetingTitleKey: "meeting.math.title",
    meetingWhenKey: "meeting.math.when",
    meetingTimeKey: "meeting.math.time",
    meetingInKey: "meeting.math.in",
    tasks: [
      { icon: Video, titleKey: "today.task1", timeKey: "time.8min", status: "done", typeKey: "type.watch" },
      { icon: ClipboardCheck, titleKey: "today.task2", timeKey: "time.15min", status: "done", typeKey: "type.practice" },
      { icon: BookOpen, titleKey: "today.task3", timeKey: "time.5min", status: "todo", typeKey: "type.read" },
      { icon: ClipboardCheck, titleKey: "today.task4", timeKey: "time.12min", status: "locked", typeKey: "type.quiz" },
      { icon: MessageSquare, titleKey: "today.task5", timeKey: "time.3min", status: "todo", typeKey: "type.reflect" },
    ],
  },
  {
    id: "science",
    labelKey: "subject.science",
    icon: FlaskConical,
    progress: 62,
    goalKey: "sub.science.goal",
    minKey: "sub.science.min",
    taskCountKey: "sub.science.taskCount",
    teacherPhoto: teacherScience.url,
    teacherNameKey: "teacher.science.name",
    teacherInitial: "M",
    teacherMsgKey: "teacher.science.msg",
    meetingTitleKey: "meeting.science.title",
    meetingWhenKey: "meeting.science.when",
    meetingTimeKey: "meeting.science.time",
    meetingInKey: "meeting.science.in",
    tasks: [
      { icon: Video, titleKey: "sub.science.t1", timeKey: "time.5min", status: "done", typeKey: "type.watch" },
      { icon: BookOpen, titleKey: "sub.science.t2", timeKey: "time.8min", status: "done", typeKey: "type.read" },
      { icon: ClipboardCheck, titleKey: "sub.science.t3", timeKey: "time.12min", status: "progress", typeKey: "type.practice" },
      { icon: ClipboardCheck, titleKey: "sub.science.t4", timeKey: "time.15min", status: "todo", typeKey: "type.quiz" },
    ],
  },
  {
    id: "english",
    labelKey: "subject.english",
    icon: Languages,
    progress: 25,
    goalKey: "sub.english.goal",
    minKey: "sub.english.min",
    taskCountKey: "sub.english.taskCount",
    teacherPhoto: "/assets/teacher_english.jpg",
    teacherNameKey: "teacher.english.name",
    teacherInitial: "L",
    teacherMsgKey: "teacher.english.msg",
    meetingTitleKey: "meeting.english.title",
    meetingWhenKey: "meeting.english.when",
    meetingTimeKey: "meeting.english.time",
    meetingInKey: "meeting.english.in",
    tasks: [
      { icon: Video, titleKey: "sub.english.t1", timeKey: "time.5min", status: "progress", typeKey: "type.watch" },
      { icon: BookOpen, titleKey: "sub.english.t2", timeKey: "time.8min", status: "todo", typeKey: "type.read" },
      { icon: ClipboardCheck, titleKey: "sub.english.t3", timeKey: "time.12min", status: "todo", typeKey: "type.practice" },
      { icon: MessageSquare, titleKey: "sub.english.t4", timeKey: "time.3min", status: "locked", typeKey: "type.reflect" },
    ],
  },
  {
    id: "arabic",
    labelKey: "subject.arabic",
    icon: BookA,
    progress: 80,
    goalKey: "sub.arabic.goal",
    minKey: "sub.arabic.min",
    taskCountKey: "sub.arabic.taskCount",
    teacherPhoto: "/assets/teacher_arabic.jpg",
    teacherNameKey: "teacher.arabic.name",
    teacherInitial: "K",
    teacherMsgKey: "teacher.arabic.msg",
    meetingTitleKey: "meeting.arabic.title",
    meetingWhenKey: "meeting.arabic.when",
    meetingTimeKey: "meeting.arabic.time",
    meetingInKey: "meeting.arabic.in",
    tasks: [
      { icon: BookOpen, titleKey: "sub.arabic.t1", timeKey: "time.8min", status: "done", typeKey: "type.read" },
      { icon: Video, titleKey: "sub.arabic.t2", timeKey: "time.5min", status: "done", typeKey: "type.watch" },
      { icon: ClipboardCheck, titleKey: "sub.arabic.t3", timeKey: "time.12min", status: "done", typeKey: "type.practice" },
      { icon: MessageSquare, titleKey: "sub.arabic.t4", timeKey: "time.3min", status: "progress", typeKey: "type.reflect" },
    ],
  },
];


type Ctx = {
  activeId: SubjectId;
  setActiveId: (id: SubjectId) => void;
  active: SubjectData;
};

const ActiveSubjectContext = createContext<Ctx>({
  activeId: "math",
  setActiveId: () => {},
  active: SUBJECTS[0],
});

export function ActiveSubjectProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<SubjectId>("math");
  const active = SUBJECTS.find((s) => s.id === activeId) ?? SUBJECTS[0];
  return (
    <ActiveSubjectContext.Provider value={{ activeId, setActiveId, active }}>
      {children}
    </ActiveSubjectContext.Provider>
  );
}

export function useActiveSubject() {
  return useContext(ActiveSubjectContext);
}
