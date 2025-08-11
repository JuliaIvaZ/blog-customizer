import { CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, type ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { AppContext } from './context/AppContext';

export const App = () => {
	const [pageState, setPageState] = useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

	const updatePageState = (newState: ArticleStateType) => {
		setPageState(newState);
	};

	const updateFormState = (newState: ArticleStateType) => {
		setFormState(newState);
	};

	const applyFormState = () => {
		setPageState(formState);
	};

	const contextValue = {
		pageState,
		formState,
		updatePageState,
		updateFormState,
		applyFormState,
	};

	return (
		<AppContext.Provider value={contextValue}>
			<main
				className={styles.main}
				style={{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--image-max-width': pageState.contentWidth.value === '948px' ? '948px' : '1600px',
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties}>
				<ArticleParamsForm />
				<Article />
			</main>
		</AppContext.Provider>
	);
};

export default App;
