import { TConstructorIngredient, TIngredient } from '@utils-types';

export const bun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const ingredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

export const ingredients: TConstructorIngredient[] = [
  {
    id: 'fixed-id-1',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    id: 'fixed-id-2',
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  }
];

export const ordersData = {
  success: true,
  orders: [
    {
      _id: '67f06933e8e61d001cec07d2',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Астероидный краторный минеральный бургер',
      createdAt: '2025-04-04T23:20:19.899Z',
      updatedAt: '2025-04-04T23:20:20.548Z',
      number: 73490
    }
  ],
  total: 1,
  totalToday: 0
};

export const orderData = {
  success: true,
  name: 'Краторный люминесцентный бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ],
    _id: '67f078afe8e61d001cec07ea',
    owner: {
      name: 'ЕкатеринаТест',
      email: 'ekaterinatest@mail.ru',
      createdAt: '2025-04-04T03:21:35.061Z',
      updatedAt: '2025-04-04T03:21:35.061Z'
    },
    status: 'done',
    name: 'Краторный люминесцентный бургер',
    createdAt: '2025-04-05T00:26:23.442Z',
    updatedAt: '2025-04-05T00:26:24.220Z',
    number: 73491,
    price: 3498
  }
};

export const userOrders = {
  success: true,
  orders: [
    {
      _id: '67ef5049ea327c001cf32294',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный астероидный spicy бургер',
      createdAt: '2025-04-04T03:21:45.645Z',
      updatedAt: '2025-04-04T03:21:46.401Z',
      number: 73267
    },
    {
      _id: '67ef506fea327c001cf32296',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Минеральный флюоресцентный spicy люминесцентный бургер',
      createdAt: '2025-04-04T03:22:23.965Z',
      updatedAt: '2025-04-04T03:22:24.698Z',
      number: 73269
    },
    {
      _id: '67ef72f3ea327c001cf322f4',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-04-04T05:49:39.972Z',
      updatedAt: '2025-04-04T05:49:40.646Z',
      number: 73297
    },
    {
      _id: '67ef7b43ea327c001cf32304',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный фалленианский бургер',
      createdAt: '2025-04-04T06:25:07.465Z',
      updatedAt: '2025-04-04T06:25:08.130Z',
      number: 73299
    },
    {
      _id: '67ef7b4cea327c001cf32305',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Экзо-плантаго флюоресцентный бургер',
      createdAt: '2025-04-04T06:25:16.547Z',
      updatedAt: '2025-04-04T06:25:17.258Z',
      number: 73300
    },
    {
      _id: '67ef830bea327c001cf32316',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-04-04T06:58:19.584Z',
      updatedAt: '2025-04-04T06:58:20.351Z',
      number: 73302
    },
    {
      _id: '67f078afe8e61d001cec07ea',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2025-04-05T00:26:23.442Z',
      updatedAt: '2025-04-05T00:26:24.220Z',
      number: 73491
    }
  ],
  total: 73117,
  totalToday: 227
};

export const user = {
  success: true,
  user: { email: 'ekaterinatest@mail.ru', name: 'ЕкатеринаТест' }
};
