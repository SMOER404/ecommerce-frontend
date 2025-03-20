import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Email обязателен'),
  password: yup
    .string()
    .min(6, 'Минимум 6 символов')
    .required('Пароль обязателен')
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Email обязателен'),
  password: yup
    .string()
    .min(6, 'Минимум 6 символов')
    .required('Пароль обязателен'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтвердите пароль'),
  firstName: yup
    .string()
    .required('Имя обязательно'),
  lastName: yup
    .string()
    .required('Фамилия обязательна')
});

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required('Название обязательно'),
  description: yup
    .string()
    .required('Описание обязательно'),
  price: yup
    .number()
    .positive('Цена должна быть положительной')
    .required('Цена обязательна'),
  categoryId: yup
    .string()
    .required('Категория обязательна'),
  brandId: yup
    .string()
    .required('Бренд обязателен'),
  stock: yup
    .number()
    .integer('Количество должно быть целым числом')
    .min(0, 'Количество не может быть отрицательным')
    .required('Количество обязательно')
});

export const orderSchema = yup.object().shape({
  items: yup
    .array()
    .of(
      yup.object().shape({
        productId: yup.string().required(),
        quantity: yup
          .number()
          .integer()
          .min(1)
          .required()
      })
    )
    .min(1, 'Добавьте хотя бы один товар'),
  shippingAddress: yup.object().shape({
    street: yup.string().required('Адрес обязателен'),
    city: yup.string().required('Город обязателен'),
    postalCode: yup.string().required('Почтовый индекс обязателен'),
    country: yup.string().required('Страна обязательна')
  }),
  paymentMethod: yup
    .string()
    .required('Способ оплаты обязателен')
}); 