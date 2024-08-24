import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CalendarEvent {
  id: string;
  exerciseName: string;
  trainerName: string;
  start: Date;
  end: Date;
  period: string;
  customerName: string;
  currentDate: string;
  userPicture?: string;
}

interface CalendarState {
  events: CalendarEvent[];
}

const initialState: CalendarState = {
  events: [],
};

 

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);  // Adds the new event to the state
    },
    updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;  // Updates the existing event
      }
    },
    
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
   
  },
});

export const { addEvent, updateEvent , deleteEvent  } = calendarSlice.actions;

export default calendarSlice.reducer;
