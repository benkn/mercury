import { sheets_v4 } from 'googleapis';
import Logger from '../../util/logger-console';
import { Transaction } from 'plaid';
import { config } from '../../config';

/**
 * The function filters out existing transactions from a given array of transactions based on the data
 * in a Google Sheets spreadsheet.
 * @param transactions - An array of Transaction objects. Each Transaction object represents a
 * transaction that needs to be filtered.
 * @param sheets - The `sheets` parameter is an instance of the `sheets_v4.Sheets` class, which is part
 * of the Google Sheets API. It is used to interact with Google Sheets and perform operations such as
 * getting values from a sheet.
 * @param {string} spreadsheetId - The `spreadsheetId` parameter is a string that represents the unique
 * identifier of the Google Sheets spreadsheet. It is used to specify which spreadsheet to retrieve
 * data from or write data to.
 * @param {string} spreadsheetTab - The `spreadsheetTab` parameter is the name of the tab or sheet
 * within the spreadsheet where the transactions are stored.
 * @returns an array of new transactions that do not already exist in the specified spreadsheet and
 * tab.
 */
export const findRemovedTransactions = async (
  transactions: Array<Transaction>,
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  spreadsheetTab: string
): Promise<Array<string>> => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: spreadsheetTab,
  });

  const rowsInSheet = response.data.values;

  let existingTransactionIds: Array<string> = [];

  if (rowsInSheet) {
    for (const columns of rowsInSheet) {
      const date = columns[0];
      if (config.startDate <= date && config.endDate >= date && columns.length === 9) {
        existingTransactionIds.push(columns[columns.length - 1]);
      }
    }
  }

  const transactionIds = transactions.map((t) => t.transaction_id);
  Logger.info(
    `The sheet "${spreadsheetTab}" contains ${existingTransactionIds.length} transactions. Comparing with ${transactionIds.length} transactions`
  );
  const removedTransactions: Array<string> = existingTransactionIds.filter((id) => !transactionIds.includes(id));
  Logger.important('These transactions need to be removed from the sheet', removedTransactions);
  return removedTransactions;
};
