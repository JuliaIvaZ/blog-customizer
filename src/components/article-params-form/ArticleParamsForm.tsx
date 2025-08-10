import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	type ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

	const handleToggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleFontFamilyChange = (option: typeof fontFamilyOptions[0]) => {
		setFormState(prev => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontSizeChange = (option: typeof fontSizeOptions[0]) => {
		setFormState(prev => ({ ...prev, fontSizeOption: option }));
	};

	const handleFontColorChange = (option: typeof fontColors[0]) => {
		setFormState(prev => ({ ...prev, fontColor: option }));
	};

	const handleBackgroundColorChange = (option: typeof backgroundColors[0]) => {
		setFormState(prev => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (option: typeof contentWidthArr[0]) => {
		setFormState(prev => ({ ...prev, contentWidth: option }));
	};

	// Определяем заблокированные цвета фона (цвета, совпадающие с выбранным цветом шрифта)
	const disabledBackgroundColors = backgroundColors.filter(
		bgColor => bgColor.value === formState.fontColor.value
	);

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleToggleForm} />
			<aside className={`${styles.container} ${isFormOpen ? styles.container_open : ''}`}>
				<form className={styles.form}>
					<div className={styles.header}>
						<Text
							family="open-sans"
							weight={800}
							size={31}
							uppercase
							align="left"
						>
							Задайте параметры
						</Text>
					</div>

					<div className={styles.formContent}>
						<div className={styles.formSection}>
							<Select
								title="шрифт"
								options={fontFamilyOptions}
								selected={formState.fontFamilyOption}
								onChange={handleFontFamilyChange}
							/>

							<RadioGroup
								title="размер шрифта"
								name="fontSize"
								options={fontSizeOptions}
								selected={formState.fontSizeOption}
								onChange={handleFontSizeChange}
							/>

							<Select
								title="цвет шрифта"
								options={fontColors}
								selected={formState.fontColor}
								onChange={handleFontColorChange}
							/>
						</div>

						<hr className={styles.separator} />

						<div className={styles.formSection}>
							<Select
								title="цвет фона"
								options={backgroundColors}
								selected={formState.backgroundColor}
								onChange={handleBackgroundColorChange}
								disabledOptions={disabledBackgroundColors}
							/>

							<Select
								title="ширина контента"
								options={contentWidthArr}
								selected={formState.contentWidth}
								onChange={handleContentWidthChange}
							/>
						</div>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
