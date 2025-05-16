import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface AppointmentsState {
  appointments: Appointment[];
}

const initialState: AppointmentsState = {
  appointments: [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2025-05-25',
      time: '10:30 AM',
      location: 'Heart Care Center',
      notes: 'Bring previous ECG reports.',
      status: 'upcoming',
    },
    // ... other initial mock data
  ],
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Omit<Appointment, 'id'>>) => {
      const newAppointment = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.appointments.push(newAppointment);
    },
    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      const index = state.appointments.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    deleteAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(a => a.id !== action.payload);
    },
  },
});

export const { addAppointment, updateAppointment, deleteAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
