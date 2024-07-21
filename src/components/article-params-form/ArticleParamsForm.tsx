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
import { FormEvent, useState, forwardRef } from 'react';

type ArticleParamsFormProps = {
	onApplyChanges: (styles: ArticleStateType) => void;
	onReset: () => void;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

export const ArticleParamsForm = forwardRef<
	HTMLDivElement,
	ArticleParamsFormProps
>((props, ref) => {
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

	const resetForm = () => {
		setFontType(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

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
		<div ref={ref}>
			<ArrowButton
				onClick={() => {
					props.setIsOpen(!props.isOpen);
				}}
				isOpen={props.isOpen}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: props.isOpen,
				})}>
				<form
					onSubmit={applyChanges}
					onReset={() => {
						props.onReset();
						resetForm();
					}}
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
		</div>
	);
});

ArticleParamsForm.displayName = 'ArticleParamsForm';
