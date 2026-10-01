import { IconName } from '../../shared/components/icon/icon.types';

export type Tone = 'brand' | 'success' | 'danger' | 'warning' | 'violet' | 'neutral' | 'muted';

export interface NavItem {
  id: string;
  label: string;
  icon: IconName;
  children?: NavItem[];
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  icon: IconName;
  iconSize: 16 | 18;
  tone: Extract<Tone, 'brand' | 'success' | 'violet' | 'warning'>;
  change: number;
  direction: 'up' | 'down';
  /** Colour of the change indicator: positive = green, negative = red */
  sentiment: 'positive' | 'negative';
}

export interface ActivityDay {
  day: string;
  task: number;
  matter: number;
  document: number;
}

export interface ActivitySummary {
  total: number;
  period: string;
  days: ActivityDay[];
}

export type ActivityAttachment =
  | { kind: 'link'; label: string }
  | { kind: 'file'; label: string; fileType: 'pdf' };

export interface Activity {
  id: string;
  title: string;
  time: string;
  attachment: ActivityAttachment;
}

export interface CalendarDay {
  iso: string; // yyyy-mm-dd
  weekday: string; // MON
  date: number;
}

export interface CalendarEvent {
  id: string;
  date: string; // yyyy-mm-dd
  title: string;
  time: string;
  hasMeeting: boolean;
}

export type CaseStatus = 'active' | 'draft';

export interface LegalCase {
  id: string;
  number: string;
  client: string;
  type: string;
  status: CaseStatus;
}

export interface CasesOverview {
  total: number;
  active: number;
  draft: number;
}

export type TaskStatus = 'urgent' | 'todo' | 'in-progress' | 'on-hold';

export interface Task {
  id: string;
  title: string;
  due: string;
  status: TaskStatus;
}

export interface TaskBreakdownItem {
  status: TaskStatus;
  label: string;
  count: number;
}
