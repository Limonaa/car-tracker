import {create} from 'zustand';
import {Expense, Vehicle} from './types';

type UIState = {
    loading: boolean;
    setLoading: (v: boolean) => void;
    selectedVehicleId?: string;
    setSelectedVehicleId: (id?: string) => void;
    vehicles: Vehicle[];
    setVehicles: (v: Vehicle[]) => void;
    expensesByVehicle: Record<string, Expense[]>;
    setExpenses: (vehicleId: string, items: Expense[]) => void;
};

export const useUI = create<UIState>((set) => ({
    loading: false,
    setLoading: (v) => set({loading: v}),
    selectedVehicleId: "686bd2ff-0c57-4c5f-b9d8-200dacdf765a", //TODO: Change to undefined
    setSelectedVehicleId: (id) => set({selectedVehicleId: id}),
    vehicles: [],
    setVehicles: (vehicles) => set({vehicles}),
    expensesByVehicle: {},
    setExpenses: (vehicleId, items) => set((s) => ({...s.expensesByVehicle, [vehicleId]: items})),

}))