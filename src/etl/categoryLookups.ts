/**
 * If the transaction's category is this, then replace it with that:
 * {
 *    ORIGINAL_CATEGORY: 'Updated Category'
 * }
 */
export const CategoryLookups: Record<string, string> = {
  FOOD_AND_DRINK_COFFEE: 'Food and Dining',
  GOVERNMENT_AND_NON_PROFIT_DONATIONS: 'Donations',
};

/**
 * If the transaction's sub-category is this, then replace it with that:
 * {
 *    ORIGINAL_SUB_CATEGORY: 'Updated Sub-Category'
 * }
 */
export const SubCategoryLookups: Record<string, string> = {
  FOOD_AND_DRINK_COFFEE: 'Coffee Shops',
  GENERAL_MERCHANDISE_CLOTHING_AND_ACCESSORIES: 'Clothing',
  GOVERNMENT_AND_NON_PROFIT_DONATIONS: '',
};
