import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { NumericFormat } from 'react-number-format';
import { BaseField } from '../base-field';
import { fieldInputVariants } from '../base-field/consts';
import type { InputButton } from '../base-field/types';
import { getInputButtonsLayout } from '../base-field/utils';
import { useBaseField } from '../base-field/useBaseField';
import type { NumberInputProps } from './types';

const NumberInputIncrementIcon = ({ className, ...props }: LucideProps) => {
	return (
		<ChevronUpIcon
			strokeWidth={1.6}
			className={cn('text-foreground/50', className)}
			{...props}
		/>
	);
};

const NumberInputDecrementIcon = ({ className, ...props }: LucideProps) => {
	return (
		<ChevronDownIcon
			strokeWidth={1.6}
			className={cn('text-foreground/50', className)}
			{...props}
		/>
	);
};

const clampValue = (value: number, min: number, max: number) => {
	return Math.min(Math.max(value, min), max);
};

export const NumberInput = ({
	className,
	label,
	description,
	errors,
	showErrors,
	disabled,
	required,
	readOnly,
	buttons = [],
	style: inputStyle,
	onChange,
	onBlur,
	value: controlledValue,
	defaultValue,
	stepper = 1,
	min = Number.NEGATIVE_INFINITY,
	max = Number.POSITIVE_INFINITY,
	onKeyDown,
	id: providedId,
	...props
}: NumberInputProps) => {
	const baseId = useId();
	const id = providedId ?? baseId;

	const [uncontrolledValue, setUncontrolledValue] = useState<
		number | undefined
	>(controlledValue ?? defaultValue);

	useEffect(() => {
		if (controlledValue !== undefined) {
			setUncontrolledValue(controlledValue);
		}
	}, [controlledValue]);

	const value =
		controlledValue !== undefined ? controlledValue : uncontrolledValue;
	const stepAmount = Math.abs(stepper) || 1;

	const { inputProps } = useBaseField({
		errors,
		showErrors,
		disabled,
		required,
		readOnly,
	});

	const syncValue = useCallback(
		(nextValue: number | undefined) => {
			if (controlledValue === undefined) {
				setUncontrolledValue(nextValue);
			}

			onChange?.(nextValue);
		},
		[controlledValue, onChange],
	);

	const handleIncrement = useCallback(() => {
		if (disabled || readOnly) {
			return;
		}

		const nextValue = clampValue(
			value === undefined ? stepAmount : value + stepAmount,
			min,
			max,
		);
		syncValue(nextValue);
	}, [disabled, max, min, readOnly, stepAmount, syncValue, value]);

	const handleDecrement = useCallback(() => {
		if (disabled || readOnly) {
			return;
		}

		const nextValue = clampValue(
			value === undefined ? -stepAmount : value - stepAmount,
			min,
			max,
		);
		syncValue(nextValue);
	}, [disabled, max, min, readOnly, stepAmount, syncValue, value]);

	const canIncrement = !disabled && !readOnly && value !== max;
	const canDecrement = !disabled && !readOnly && value !== min;

	const defaultButtons = useMemo<InputButton[]>(
		() => [
			{
				side: 'right',
				icon: NumberInputIncrementIcon,
				label: 'Increase value',
				onClick: handleIncrement,
				disabled: !canIncrement,
			},
			{
				side: 'right',
				icon: NumberInputDecrementIcon,
				label: 'Decrease value',
				onClick: handleDecrement,
				disabled: !canDecrement,
			},
		],
		[canDecrement, canIncrement, handleDecrement, handleIncrement],
	);
	const inputButtons = [...buttons, ...defaultButtons];
	const { paddingStyle } = getInputButtonsLayout({
		buttons: inputButtons,
	});

	const handleBlur = () => {
		if (value === undefined) {
			onBlur?.();
			return;
		}

		const clampedValue = clampValue(value, min, max);
		if (clampedValue !== value) {
			syncValue(clampedValue);
		}

		onBlur?.();
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			handleIncrement();
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			handleDecrement();
		}

		onKeyDown?.(event);
	};

	return (
		<BaseField.Root>
			<BaseField.Label htmlFor={id}>{label}</BaseField.Label>

			<BaseField.Control>
				<div className='relative w-full'>
					<NumericFormat
						id={id}
						data-slot='input'
						value={value}
						allowNegative={min < 0}
						onValueChange={(values) => {
							syncValue(values.floatValue);
						}}
						className={cn(
							fieldInputVariants({
								height: 'fixed',
								focusMode: 'focusVisible',
							}),
							'placeholder:text-muted-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
							className,
						)}
						style={{ ...paddingStyle, ...inputStyle }}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						{...inputProps}
						{...props}
					/>

					<BaseField.InputButtons
						buttons={inputButtons}
						side='left'
						disabled={disabled}
						readOnly={readOnly}
					/>
					<BaseField.InputButtons
						buttons={inputButtons}
						side='right'
						disabled={disabled}
						readOnly={readOnly}
					/>
				</div>
			</BaseField.Control>

			<BaseField.Description>{description}</BaseField.Description>
			<BaseField.Error
				errors={errors}
				showErrors={showErrors}
			/>
		</BaseField.Root>
	);
};
