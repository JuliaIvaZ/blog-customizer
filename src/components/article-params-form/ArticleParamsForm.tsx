import { useState, useRef } from 'react';
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
import { useAppContext } from 'src/context/AppContext';
import { useClose } from 'src/hooks/useClose';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const { formState, updateFormState, applyFormState, updatePageState } = useAppContext();
	const formRef = useRef<HTMLElement>(null);

	useClose({
		isOpen: isFormOpen,
		onClose: () => setIsFormOpen(false),
		rootRef: formRef,
	});

	const handleToggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleFontFamilyChange = (option: typeof fontFamilyOptions[0]) => {
		updateFormState({ ...formState, fontFamilyOption: option });
	};

	const handleFontSizeChange = (option: typeof fontSizeOptions[0]) => {
		updateFormState({ ...formState, fontSizeOption: option });
	};

	const handleFontColorChange = (option: typeof fontColors[0]) => {
		updateFormState({ ...formState, fontColor: option });
	};

	const handleBackgroundColorChange = (option: typeof backgroundColors[0]) => {
		updateFormState({ ...formState, backgroundColor: option });
	};

	const handleContentWidthChange = (option: typeof contentWidthArr[0]) => {
		updateFormState({ ...formState, contentWidth: option });
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		applyFormState();
		setIsFormOpen(false);
	};

	const handleReset = () => {
		updateFormState(defaultArticleState);
		updatePageState(defaultArticleState);
		setIsFormOpen(false);
	};

	const disabledBackgroundColors = backgroundColors.filter(
		bgColor => bgColor.value === formState.fontColor.value
	);

	const disabledFontColors = fontColors.filter(
		fontColor => fontColor.value === formState.backgroundColor.value
	);

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleToggleForm} />
			<aside ref={formRef} className={clsx(styles.container, { [styles.container_open]: isFormOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
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
								disabledOptions={disabledFontColors}
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
						<Button title='Сбросить' htmlType='button' type='clear' onClick={handleReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
