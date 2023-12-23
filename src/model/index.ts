import { Transaction } from 'plaid';

/** Extension of the Plaid Transaction to include additional metadata */
export interface TransactionX extends Transaction {
  my_category?: string;
  my_sub_category?: string;
  my_raw_category?: string;
}
