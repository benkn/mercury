import { TransactionX } from '../model';

export const headerRow: string[] = [
  'Date',
  'Description',
  'Amount',
  '✅',
  'Category',
  'Sub-Category',
  'Account',
  'Raw Category',
  'Transaction ID',
];

export function toColumnFormat(transactions: Array<TransactionX>): Array<Array<string>> {
  const res: string[][] = [];

  if (transactions && transactions.length) {
    transactions.forEach((t) => {
      res.push([
        `${t.date}`,
        `${t.name}`,
        `${t.amount}`,
        '',
        `${t.my_category}`,
        `${t.my_sub_category}`,
        `${t.account_owner}`,
        `${t.my_raw_category}`,
        `${t.transaction_id}`,
      ]);
    });
  }

  return res;
}
