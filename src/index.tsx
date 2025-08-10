import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, createContext, useContext, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, type ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

// Контекст для управления состоянием
type AppContextType = {
	pageState: ArticleStateType;
	formState: ArticleStateType;
	updatePageState: (newState: ArticleStateType) => void;
	updateFormState: (newState: ArticleStateType) => void;
	applyFormState: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within AppProvider');
	}
	return context;
};

const App = () => {
	// Состояние страницы - применяется сразу
	const [pageState, setPageState] = useState<ArticleStateType>(defaultArticleState);
	// Состояние формы - применяется только после нажатия "Применить"
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

	const updatePageState = (newState: ArticleStateType) => {
		setPageState(newState);
	};

	const updateFormState = (newState: ArticleStateType) => {
		setFormState(newState);
	};

	const applyFormState = () => {
		// Применяем состояние формы к странице
		setPageState(formState);
	};

	const contextValue: AppContextType = {
		pageState,
		formState,
		updatePageState,
		updateFormState,
		applyFormState,
	};

	return (
		<AppContext.Provider value={contextValue}>
			<main
				className={clsx(styles.main)}
				style={
					{
						'--font-family': pageState.fontFamilyOption.value,
						'--font-size': pageState.fontSizeOption.value,
						'--font-color': pageState.fontColor.value,
						'--container-width': pageState.contentWidth.value,
						'--image-max-width': pageState.contentWidth.value === '948px' ? '948px' : '1600px',
						'--bg-color': pageState.backgroundColor.value,
					} as CSSProperties
				}>
				<ArticleParamsForm />
				<Article />
			</main>
		</AppContext.Provider>
	);
};

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
