import { create } from 'zustand';

interface Project {
  id: string;
  name: string;
  prompt: string;
  code?: string;
  status: string;
  createdAt: string;
}

interface BuilderStoreState {
  currentProject: Project | null;
  projects: Project[];
  credits: number;
  isGenerating: boolean;
  generatedCode: string | null;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  setGenerating: (status: boolean) => void;
  setGeneratedCode: (code: string | null) => void;
  decrementCredits: () => void;
  setCredits: (credits: number) => void;
}

export const useBuilderStore = create<BuilderStoreState>((set) => ({
  currentProject: null,
  projects: [],
  credits: 2,
  isGenerating: false,
  generatedCode: null,
  
  setCurrentProject: (project) => set({ currentProject: project }),
  addProject: (project) => set((state) => ({ 
    projects: [...state.projects, project] 
  })),
  setGenerating: (status) => set({ isGenerating: status }),
  setGeneratedCode: (code) => set({ generatedCode: code }),
  decrementCredits: () => set((state) => ({ 
    credits: Math.max(0, state.credits - 1) 
  })),
  setCredits: (credits) => set({ credits }),
}));
