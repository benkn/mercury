import { sheets_v4 } from 'googleapis';
import Logger from '../../util/logger-console';
import { Transaction } from 'plaid';

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
export const filterExistingTransactions = async (
  transactions: Array<Transaction>,
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  spreadsheetTab: string
): Promise<Array<Transaction>> => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: spreadsheetTab,
  });

  const rowsInSheet = response.data.values;
  // Logger.debug('Sheet contains:\n', rowsInSheet);

  const existingTransactions = rowsInSheet ? rowsInSheet.map((columns) => columns[columns.length - 1]) : [];

  Logger.info(`The sheet "${spreadsheetTab}" already contains ${existingTransactions.length} transactions.`);
  const newTransactions = transactions.filter(
    (transaction) => !existingTransactions?.includes(transaction.transaction_id)
  );
  Logger.info(
    `Filtering out existing transactions has left ${newTransactions.length} transactions to write to the sheet.`
  );
  return newTransactions;
};
