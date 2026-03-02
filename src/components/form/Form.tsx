import { Separator } from '@/components/separator';
import { cn } from '@/lib/utils';
import type {
	FormGroupProps,
	FormRootProps,
	FormSeparatorProps,
	FormSetProps,
} from './types';
import { createContext, useContext, useMemo } from 'react';
import type { FormEvent } from 'react';

type FormRootContextValue = {
	isLoading: boolean;
};

const FormRootContext = createContext<FormRootContextValue | null>(null);

export const useFormRootContext = () => {
	const context = useContext(FormRootContext);

	if (!context) {
		throw new Error('useFormRootContext must be used within Form.Root');
	}

	return context;
};

const FormRoot = ({
	className,
	children,
	form: formApi,
	isLoading = false,
}: FormRootProps) => {
	const formRootContextValue = useMemo<FormRootContextValue>(
		() => ({
			isLoading,
		}),
		[isLoading],
	);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		formApi.handleSubmit();
	};

	return (
		<FormRootContext.Provider value={formRootContextValue}>
			<formApi.AppForm>
				<form
					className={cn('w-full h-full', className)}
					onSubmit={handleSubmit}
				>
					{children}
				</form>
			</formApi.AppForm>
		</FormRootContext.Provider>
	);
};

const FormSet = ({ className, ...props }: FormSetProps) => {
	return (
		<fieldset
			data-slot='field-set'
			className={cn(
				'gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col',
				className,
			)}
			{...props}
		/>
	);
};

const Group = ({ className, ...props }: FormGroupProps) => {
	return (
		<div
			data-slot='field-group'
			className={cn(
				'gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4 group/field-group @container/field-group flex w-full flex-col',
				className,
			)}
			{...props}
		/>
	);
};

const FormSeparator = ({
	children,
	className,
	...props
}: FormSeparatorProps) => {
	return (
		<div
			data-slot='field-separator'
			data-content={!!children}
			className={cn(
				'-my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2 relative',
				className,
			)}
			{...props}
		>
			<Separator className='absolute inset-0 top-1/2' />
			{children && (
				<span
					className='text-muted-foreground px-2 bg-background relative mx-auto block w-fit'
					data-slot='field-separator-content'
				>
					{children}
				</span>
			)}
		</div>
	);
};

export const Form = {
	Root: FormRoot,
	Set: FormSet,
	Group,
	Separator: FormSeparator,
};
