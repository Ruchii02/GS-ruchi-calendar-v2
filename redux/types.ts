import type { Dayjs } from 'dayjs';

export interface Note {
  date: Dayjs;
  content: {
    exercise: string;
    name: string;
    startTime: string;
    endTime: string;
    period: string;
    customerName: string;
    userPicture?: string;
  };
}

export interface CalendarEvent {
  id: string;
  exerciseName: string;
  trainerName: string;
  start: string;
  end: string;
  period: string;
  customerName: string;
  currentDate: string;
  userPicture?: string;
}

export interface CalendarState {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  currentEvent: CalendarEvent | null;
}
