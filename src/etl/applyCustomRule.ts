import { TransactionX } from '../model';
import { firstDefined } from '../util/firstDefined';
import { readable } from '../util/readable';
import { Target, customRules } from './customRules';

/**
 * Reviews custom rules to see if any apply to this transaction.
 * For the first one which matches, apply transformations to the transaction and return true.
 */
export function applyCustomRule(x: TransactionX): boolean {
  // Go through all custom rules to check if any apply
  for (const rule of customRules) {
    // if the transaction matches the filter...
    if (doesTransactionMatchFilter(rule.filter, x)) {
      const primary = x.personal_finance_category?.primary || '';
      const detailed = x.personal_finance_category?.detailed || '';

      const subCategory = detailed.substring(primary.length);
      x.my_raw_category = detailed;

      x.my_category = firstDefined(rule.transformation.my_category, readable(primary));
      x.my_sub_category = firstDefined(rule.transformation.my_sub_category, readable(subCategory));
      x.name = rule.transformation.name || x.name;

      // once one rule matches, end
      return true;
    }
  }
  // No custom rules applied!
  return false;
}

function doesTransactionMatchFilter(target: Target, x: TransactionX): boolean {
  let startsWith = target.startsWith ? x.name.toUpperCase().startsWith(target.startsWith.toUpperCase()) : true;
  let includes = target.includes ? x.name.toUpperCase().includes(target.includes.toUpperCase()) : true;
  let endsWith = target.endsWith ? x.name.toUpperCase().endsWith(target.endsWith.toUpperCase()) : true;
  return startsWith && includes && endsWith;
}
