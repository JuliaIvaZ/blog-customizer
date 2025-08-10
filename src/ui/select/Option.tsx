import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType['value']) => void;
	isDisabled?: boolean;
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className },
		onClick,
		isDisabled = false,
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);

	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			if (isDisabled) return;
			onClick(clickedValue);
		};

	useEnterOptionSubmit({
		optionRef,
		value,
		onClick,
	});

	return (
		<li
			className={clsx(
				styles.option,
				styles[optionClassName || ''],
				{ [styles.optionDisabled]: isDisabled }
			)}
			value={value}
			onClick={handleClick(value)}
			tabIndex={isDisabled ? -1 : 0}
			data-testid={`select-option-${value}`}
			data-disabled={isDisabled}
			ref={optionRef}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
};
