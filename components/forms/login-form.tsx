import { Formik, Form } from 'formik';
import { Button } from '@/components/ui/button';
import { FormField } from './form-field';
import { loginSchema } from '@/utils/form-schemas';

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  isLoading?: boolean;
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="Введите email"
          />
          <FormField
            name="password"
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}; 