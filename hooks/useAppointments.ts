import { useState, useEffect } from 'react';

// Define appointment type
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

export function useAppointments() {
  // Mock appointment data - in a real app, this would be fetched from an API or local storage
  const [appointments, setAppointments] = useState<Appointment[]>([
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
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Endocrinologist',
      date: '2025-06-02',
      time: '2:15 PM',
      location: 'Diabetes Management Clinic',
      notes: 'Fasting required for 8 hours before appointment.',
      status: 'upcoming',
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'General Physician',
      date: '2025-04-15',
      time: '9:00 AM',
      location: 'Family Health Clinic',
      notes: 'Annual physical examination.',
      status: 'completed',
    },
  ]);

  // Add a new appointment
  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(), // Simple ID generation
    };
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
  };

  // Update an existing appointment
  const updateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === updatedAppointment.id ? updatedAppointment : appointment
      )
    );
  };

  // Delete an appointment
  const deleteAppointment = (id: string) => {
    setAppointments(prevAppointments =>
      prevAppointments.filter(appointment => appointment.id !== id)
    );
  };

  // Get an appointment by ID
  const getAppointmentById = (id: string) => {
    return appointments.find(appointment => appointment.id === id);
  };

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentById,
  };
}