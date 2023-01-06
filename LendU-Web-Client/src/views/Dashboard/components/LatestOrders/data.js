import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    address: {
      country: 'USA',
      state: 'West Virginia',
      city: 'Parkersburg',
      street: '2849 Fulton Street'
    },
    email: 'ekaterina.tankova@devias.io',
    phone: '304-428-3097',
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    address: {
      country: 'USA',
      state: 'Bristow',
      city: 'Iowa',
      street: '1865  Pleasant Hill Road'
    },
    email: 'cao.yu@devias.io',
    phone: '712-351-5711',
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    address: {
      country: 'USA',
      state: 'Georgia',
      city: 'Atlanta',
      street: '4894  Lakeland Park Drive'
    },
    email: 'alexa.richardson@devias.io',
    phone: '770-635-2682',
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    address: {
      country: 'USA',
      state: 'Ohio',
      city: 'Dover',
      street: '4158  Hedge Street'
    },
    email: 'anje.keizer@devias.io',
    phone: '908-691-3242',
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    address: {
      country: 'USA',
      state: 'Texas',
      city: 'Dallas',
      street: '75247'
    },
    email: 'clarke.gillebert@devias.io',
    phone: '972-333-4106',
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    address: {
      country: 'USA',
      state: 'California',
      city: 'Bakerfield',
      street: '317 Angus Road'
    },
    email: 'adam.denisov@devias.io',
    phone: '858-602-3409',
    createdAt: 1554670800000,
    status: 'delivered'
  }
];
