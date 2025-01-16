export const filtersData = [
  {
    name: 'Model year',
    type: 'year',
    optionsType: 'range',
    options: {
      reverse: true,
      range: 1,
      min: 1970,
      max: 2024,
    },
  },
  {
    name: 'Engine capacity cm³',
    type: 'capacity',
    optionsType: 'range',
    options: {
      range: 200,
      min: 1000,
      max: 5000,
    },
  },
  {
    name: 'Engine power, kW',
    type: 'power',
    optionsType: 'range',
    options: {
      range: 20,
      min: 20,
      max: 300,
    },
  },
  {
    name: 'Fuel type',
    type: 'fuel_type[]',
    optionsType: 'checkbox',
    options: [
      { label: 'Diesel', value: 'diesel' },
      { label: 'Gasoline', value: 'gasoline'},
    ],
  },
  {
    name: 'Gearbox type',
    type: 'gearbox_type[]',
    optionsType: 'checkbox',
    options: [
      { label: 'Manual', value: 'manual' },
      { label: 'Automatic', value: 'automatic' },
    ],
  },
  {
    name: 'Driving wheels',
    type: 'wheels[]',
    optionsType: 'checkbox',
    options: [
      { label: 'Front', value: 'front' },
      { label: 'AWD', value: 'awd'},
    ],
  },
  {
    name: 'Steering wheel position',
    type: 'rhd[]',
    optionsType: 'checkbox',
    options: [
      { label: 'Left', value: '0' },
      { label: 'Right', value: '1'},
    ],
  },
];