import { Transaction } from 'plaid';
import { accounts } from './config/accounts';
import { config } from './config/config';
import { decorate } from './etl/decorate';
import { toColumnFormat } from './util/toColumnFormat';
import { appendToSheet } from './services/google/appendToSheet';
import { authentication } from './services/google/authenticate';
import { PlaidClient } from './services/plaid/plaidClient';
import Logger from './util/logger-console';
import { filterExistingTransactions } from './services/google/filterExistingTransactions';

async function main() {
  Logger.important(`Collecting transactions since ${config.startDate}`);

  const client = new PlaidClient();

  const transactions: Transaction[] = [];

  // Go through every account known to collect transactions for this month
  for (const account of accounts) {
    let t = await client.getTransactions(account, config.startDate, config.endDate);
    Logger.info(`Account has ${t.length} transactions after filtering`);
    t.forEach((v) => {
      v.account_owner = account.name;
      transactions.push(v);
    });
  }

  const sheetsAuth = await authentication();
  const spreadsheetId = config.spreadsheetId;
  const sheet = config.spreadsheetTabName;

  Logger.info('Config says ID is ' + config.spreadsheetId);

  const newTransactions = await filterExistingTransactions(transactions, sheetsAuth, spreadsheetId, sheet);

  if (newTransactions.length === 0) {
    Logger.info('No new transactions to include in the sheet!');
  } else {
    Logger.info(`Decorating ${newTransactions.length} transactions...`);
    const decoratedTransactions = decorate(newTransactions);

    Logger.info(`Transforming to rows...`);
    const rows = toColumnFormat(decoratedTransactions);

    Logger.info(`Writing the new transactions to the sheet...`);
    await appendToSheet(sheetsAuth, spreadsheetId, sheet, rows);
  }

  Logger.important('All done! 🎉');
}

main().catch((error) => {
  Logger.error(error);
});
