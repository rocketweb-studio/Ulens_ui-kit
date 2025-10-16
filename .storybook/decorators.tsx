import { FormProvider, useForm } from 'react-hook-form';

export const WithReactHookForm = (Story: any) => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <Story />
        </FormProvider>
    );
};