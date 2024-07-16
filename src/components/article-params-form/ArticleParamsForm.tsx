import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';

type ArticleParamsFormProps = {
	onApplyChanges: (styles: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [fontFamilyOption, setFontType] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeOption, setFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const [isOpen, setIsOpen] = useState(false);

	const applyChanges = (evt: FormEvent) => {
		evt.preventDefault();
		props.onApplyChanges({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
	};

	return (
		<>
			<ArrowButton
				onClick={() => {
					setIsOpen(!isOpen);
				}}
				isOpen={isOpen}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					onSubmit={applyChanges}
					onReset={props.onReset}
					className={styles.form}>
					<Text weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={fontFamilyOption}
						onChange={setFontType}
					/>
					<RadioGroup
						name='размер да'
						title='размер шрифта'
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={setFontSize}
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
