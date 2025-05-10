import { useState, useEffect } from 'react';

// Define medication type
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  type: string;
  startDate: string;
  endDate?: string;
  instructions?: string;
  refillDate?: string;
  refillReminder?: boolean;
}

export function useMedications() {
  // Mock medication data - in a real app, this would be fetched from an API or local storage
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      time: '09:00 AM',
      type: 'Tablet',
      startDate: '2025-05-10',
      instructions: 'Take with or without food.',
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '01:00 PM',
      type: 'Tablet',
      startDate: '2025-05-15',
      instructions: 'Take with meals.',
    },
    {
      id: '3',
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Once daily',
      time: '09:00 PM',
      type: 'Capsule',
      startDate: '2025-05-25',
      instructions: 'Take with food.',
    },
  ]);

  // Add a new medication
  const addMedication = (medication: Omit<Medication, 'id'>) => {
    const newMedication = {
      ...medication,
      id: Date.now().toString(), // Simple ID generation
    };
    setMedications(prevMedications => [...prevMedications, newMedication]);
  };

  // Update an existing medication
  const updateMedication = (updatedMedication: Medication) => {
    setMedications(prevMedications =>
      prevMedications.map(medication =>
        medication.id === updatedMedication.id ? updatedMedication : medication
      )
    );
  };

  // Delete a medication
  const deleteMedication = (id: string) => {
    setMedications(prevMedications =>
      prevMedications.filter(medication => medication.id !== id)
    );
  };

  // Get a medication by ID
  const getMedicationById = (id: string) => {
    return medications.find(medication => medication.id === id);
  };

  return {
    medications,
    addMedication,
    updateMedication,
    deleteMedication,
    getMedicationById,
  };
}