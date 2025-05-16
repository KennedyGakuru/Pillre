import {createSlice, PayloadAction} from  '@reduxjs/toolkit'

interface Medication {
    id: string;
    name: string;
    dosage: string;
    time: string;
    type: string;
}

interface MedicationState {
    medications: Medication[];
}

const initialState:  MedicationState ={
    medications: [],
};

const medicationsSlice = createSlice({
    name:'medications',
    initialState,
    reducers : {
        addMedication(state, action: PayloadAction<Medication>) {
            state.medications.push(action.payload);
        },
        setMedications(state, action: PayloadAction<Medication[]>) {
            state.medications = action.payload;
        },
    },
});

export const {addMedication, setMedications} = medicationsSlice.actions;
export default medicationsSlice.reducer;