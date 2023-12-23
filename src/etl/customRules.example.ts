export const customRules: Array<Rule> = [
  {
    filter: {
      startsWith: 'CHASE CREDIT CRD DES:AUTOPAY',
    },
    transformation: {
      my_category: 'Credit Card Payment',
      my_sub_category: '',
      name: 'Chase Credit Card Payment',
    },
  },
  {
    filter: {
      startsWith: 'BEN GONGS TEA',
    },
    transformation: {
      my_category: 'Food and Drink',
      my_sub_category: 'Coffee Shops',
      name: 'Ben Gongs Tea',
    },
  },
];

export type Target = {
  startsWith?: string;
  includes?: string;
  endsWith?: string;
};

type Transformation = {
  my_category?: string;
  my_sub_category?: string;
  name?: string;
};

type Rule = {
  filter: Target;
  transformation: Transformation;
};
