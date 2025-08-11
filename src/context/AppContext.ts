import { createContext, useContext } from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

export type AppContextType = {
  pageState: ArticleStateType;
  formState: ArticleStateType;
  updatePageState: (newState: ArticleStateType) => void;
  updateFormState: (newState: ArticleStateType) => void;
  applyFormState: () => void;
};

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
