import { Transaction } from 'plaid';
import { TransactionX } from '../model';
import { CategoryLookups, SubCategoryLookups } from './categoryLookups';
import { applyCustomRule } from './applyCustomRule';
import { readable } from '../util/readable';

export function decorate(transactions: Array<Transaction>): Array<TransactionX> {
  return transactions.map((t) => decorateCategory(t));
}

function decorateCategory(t: Transaction): TransactionX {
  const x = t as TransactionX;
  // Set defaults
  x.my_raw_category = '';

  if (applyCustomRule(x)) {
    // behavior complete, continue
  }
  // Confirm there is an evaluated category on the transaction
  else if (x.personal_finance_category) {
    const primary = x.personal_finance_category.primary.trim();
    const detailed = x.personal_finance_category.detailed.trim();

    const subCategory = detailed.substring(primary.length);
    x.my_raw_category = detailed;

    // If we have an override for the category based on the detailed category given by Plaid, then set it as the category
    if (CategoryLookups[detailed]) {
      x.my_category = CategoryLookups[detailed];
      if (SubCategoryLookups[detailed]) {
        x.my_sub_category = SubCategoryLookups[detailed];
      } else {
        x.my_sub_category = readable(subCategory);
      }
    } else if (SubCategoryLookups[detailed]) {
      x.my_category = readable(primary);
      x.my_sub_category = SubCategoryLookups[detailed];
    } else if (
      x.personal_finance_category.confidence_level === 'VERY_HIGH' ||
      x.personal_finance_category.confidence_level === 'HIGH'
    ) {
      x.my_category = readable(primary);
      x.my_sub_category = readable(subCategory);
    }
    // If confidence is not high, then it probably needs a follow up
    else {
      x.my_category = `Maybe... ${readable(primary)}`;
      x.my_sub_category = `${readable(subCategory)}`;
    }
  }
  // If all else fails, then just mark is Unknown for a further follow-up
  else {
    x.my_category = 'Unknown';
  }

  return x;
}
