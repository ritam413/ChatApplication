import {create} from 'zustand'

export const useViewStore = create((set) => ({
    currentView: 'default',
    setView: (view) => set({currentView: view}),    
}))