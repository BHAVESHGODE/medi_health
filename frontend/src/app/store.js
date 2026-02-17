import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import patientReducer from '../features/patients/patientSlice';
import appointmentReducer from '../features/appointments/appointmentSlice';
import inventoryReducer from '../features/inventory/inventorySlice';
import emergencyReducer from '../features/emergency/emergencySlice';
import chatReducer from '../features/chat/chatSlice';
import labReducer from '../features/lab/labSlice';
import insuranceReducer from '../features/insurance/insuranceSlice';
import notificationsReducer from '../features/notifications/notificationSlice';
import triageReducer from '../features/triage/triageSlice';
import searchReducer from '../features/search/searchSlice';
import exportsReducer from '../features/exports/exportSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        appointment: appointmentReducer,
        patient: patientReducer,
        inventory: inventoryReducer,
        emergency: emergencyReducer,
        chat: chatReducer,
        lab: labReducer,
        insurance: insuranceReducer,
        notifications: notificationsReducer,
        triage: triageReducer,
        search: searchReducer,
        exports: exportsReducer,
    },
});
