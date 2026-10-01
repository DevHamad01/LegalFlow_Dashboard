import {
  Activity,
  ActivitySummary,
  CalendarDay,
  CalendarEvent,
  CasesOverview,
  LegalCase,
  NavItem,
  StatCard,
  Task,
  TaskBreakdownItem,
} from '../models/dashboard.models';

/** Static mock data — copy taken verbatim from the Figma frame "Dashboard - Filled". */

export const CURRENT_USER = { firstName: 'Qasim', sidebarName: 'Hassan', today: 'Sep 1, 2026' };

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'tasks', label: 'Tasks', icon: 'list' },
  { id: 'activities', label: 'Activities', icon: 'clock' },
  {
    id: 'email',
    label: 'Email',
    icon: 'mail',
    children: [
      { id: 'inbox', label: 'Inbox', icon: 'dot' },
      { id: 'sent', label: 'Sent', icon: 'dot' },
    ],
  },
  { id: 'contacts', label: 'Contacts', icon: 'contacts' },
  {
    id: 'matters',
    label: 'Matters',
    icon: 'briefcase',
    children: [
      { id: 'all-matters', label: 'All Matters', icon: 'dot' },
      { id: 'archived-matters', label: 'Archived', icon: 'dot' },
    ],
  },
  { id: 'documents', label: 'Documents', icon: 'file' },
  { id: 'communications', label: 'Communications', icon: 'chat' },
  { id: 'account', label: 'Account', icon: 'user-circle' },
  {
    id: 'tenants',
    label: 'Manage Tenants',
    icon: 'building',
    children: [
      { id: 'tenant-list', label: 'Tenants', icon: 'dot' },
      { id: 'tenant-plans', label: 'Plans', icon: 'dot' },
    ],
  },
  { id: 'billings', label: 'Billings', icon: 'wallet' },
  {
    id: 'user-access',
    label: 'User & Access',
    icon: 'users',
    children: [
      { id: 'users', label: 'Users', icon: 'dot' },
      { id: 'roles', label: 'Roles', icon: 'dot' },
      { id: 'permissions', label: 'Permissions', icon: 'dot' },
    ],
  },
  { id: 'integrations', label: 'App integrations', icon: 'grid' },
];

/** Groups expanded on first load — matches the design (User & Access is open). */
export const DEFAULT_EXPANDED_GROUPS = ['user-access'];

export const FOOTER_NAV: NavItem[] = [
  { id: 'reports', label: 'Reports', icon: 'report' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export const STAT_CARDS: StatCard[] = [
  { id: 'active-cases', label: 'Active Cases', value: '53', icon: 'briefcase', iconSize: 18, tone: 'brand', change: 44, direction: 'up', sentiment: 'positive' },
  { id: 'tasks', label: 'Tasks', value: '586', icon: 'checklist', iconSize: 16, tone: 'success', change: 14, direction: 'up', sentiment: 'negative' },
  { id: 'units-billed', label: 'Units Billed (Jul)', value: '209', icon: 'receipt', iconSize: 18, tone: 'violet', change: 12, direction: 'up', sentiment: 'negative' },
  { id: 'wip', label: 'WIP', value: '£7,270.56', icon: 'coins', iconSize: 18, tone: 'warning', change: 11, direction: 'up', sentiment: 'positive' },
];

/** Figma bar heights are exactly 8px per unit, so these counts reproduce the design 1:1. */
export const ACTIVITY_SUMMARY: ActivitySummary = {
  total: 112,
  period: 'This Week • Oct 12 – Oct 18',
  days: [
    { day: 'Mon', task: 10, matter: 3, document: 5 },
    { day: 'Tue', task: 12, matter: 8, document: 6 },
    { day: 'Wed', task: 15, matter: 10, document: 8 },
    { day: 'Thu', task: 8, matter: 5, document: 12 },
    { day: 'Fri', task: 6, matter: 7, document: 5 },
  ],
};

export const ACTIVITIES: Activity[] = [
  { id: 'a1', title: 'You completed an assigned task', time: '5 min ago', attachment: { kind: 'link', label: 'Prepare Hearing Documents' } },
  { id: 'a2', title: 'You created a new case', time: '11:32 AM', attachment: { kind: 'link', label: 'Ahmed vs State' } },
  { id: 'a3', title: 'You uploaded a new document', time: '25 August, 2026', attachment: { kind: 'file', label: 'Evidence_Report.pdf', fileType: 'pdf' } },
  { id: 'a4', title: 'You updated the case status', time: '19 August, 2026', attachment: { kind: 'link', label: 'Patel Family Matter' } },
  { id: 'a5', title: 'You uploaded a new document', time: '15 August, 2026', attachment: { kind: 'file', label: 'Case Summary.pdf', fileType: 'pdf' } },
];

export const AI_SUMMARY =
  'Over the past 7 days, you created 12 new cases, completed 18 tasks, uploaded 24 documents, and recorded 31 case activities. 5 matters require your attention due to upcoming deadlines, while 3 tasks are overdue and should be reviewed today.';

/** Week of Mon 7 – Sun 13 Sep 2026. The design repeats "11" for Sat/Sun; corrected to 12/13. */
export const WEEK_DAYS: CalendarDay[] = [
  { iso: '2026-09-07', weekday: 'MON', date: 7 },
  { iso: '2026-09-08', weekday: 'TUE', date: 8 },
  { iso: '2026-09-09', weekday: 'WED', date: 9 },
  { iso: '2026-09-10', weekday: 'THU', date: 10 },
  { iso: '2026-09-11', weekday: 'FRI', date: 11 },
  { iso: '2026-09-12', weekday: 'SAT', date: 12 },
  { iso: '2026-09-13', weekday: 'SUN', date: 13 },
];
export const DEFAULT_SELECTED_DAY = '2026-09-08';

/** Event counts per day match the dot indicators in the design (Tue 4, Thu 2, Fri 1). */
export const EVENTS: CalendarEvent[] = [
  { id: 'e1', date: '2026-09-08', title: 'Memorandum of Understanding', time: '12:30 PM - 01:50 PM', hasMeeting: true },
  { id: 'e2', date: '2026-09-08', title: 'Client consultation call - A brief on how to handle the cae.', time: '4:00 PM - 4:15 PM', hasMeeting: true },
  { id: 'e3', date: '2026-09-08', title: 'Court filing deadline: Breach of Contract', time: '2:30 PM - 5:00 PM', hasMeeting: false },
  { id: 'e4', date: '2026-09-08', title: 'Internal review: Patel Family Matter', time: '5:30 PM - 6:00 PM', hasMeeting: true },
  { id: 'e5', date: '2026-09-10', title: 'Deposition prep with Ethan Carter', time: '10:00 AM - 11:30 AM', hasMeeting: true },
  { id: 'e6', date: '2026-09-10', title: 'Mediation session: Boundary Dispute', time: '2:00 PM - 4:00 PM', hasMeeting: false },
  { id: 'e7', date: '2026-09-11', title: 'Hearing: Ahmed vs State', time: '9:30 AM - 12:00 PM', hasMeeting: false },
];

export const CASES_OVERVIEW: CasesOverview = { total: 53, active: 4, draft: 3 };

export const RECENT_CASES: LegalCase[] = [
  { id: 'c1', number: '#14124', client: 'Marcus Albright', type: 'Criminal - Assault', status: 'draft' },
  { id: 'c2', number: '#23567', client: 'Ethan Carter', type: 'Breach of Contract', status: 'active' },
  { id: 'c3', number: '#23876', client: 'Liam Anderson', type: 'Property - Boundary Dispute', status: 'active' },
  { id: 'c4', number: '#24185', client: 'Noah Ramirez', type: 'Employment', status: 'draft' },
  { id: 'c5', number: '#24494', client: 'Oliver Thompson', type: 'Personal Injury - Auto Accident', status: 'draft' },
];

/** "Total 21" is shown as in the design (the four counts in the design itself sum to 27). */
export const TASKS_TOTAL = 21;
export const TASK_BREAKDOWN: TaskBreakdownItem[] = [
  { status: 'urgent', label: 'Urgent', count: 2 },
  { status: 'todo', label: 'To Do', count: 12 },
  { status: 'in-progress', label: 'In Progress', count: 8 },
  { status: 'on-hold', label: 'On Hold', count: 5 },
];

export const UPCOMING_TASKS: Task[] = [
  { id: 't1', title: 'Client intake review - Reach out to client before review and lorem ipsum', due: 'Sep 22, 11:00 AM', status: 'urgent' },
  { id: 't2', title: 'Draft settlement letter', due: 'Sep 17, 10:00 AM', status: 'on-hold' },
  { id: 't3', title: 'Review medical records', due: 'Sep 22, 4:00 PM', status: 'in-progress' },
  { id: 't4', title: 'File discovery response', due: 'Sep 24, 11:00 AM', status: 'todo' },
  { id: 't5', title: 'Draft settlement letter', due: 'Sep 17, 10:00 AM', status: 'on-hold' },
];
