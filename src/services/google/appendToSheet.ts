import { sheets_v4 } from 'googleapis';
import Logger from '../../util/logger-console';

export const appendToSheet = async (
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  spreadsheetTab: string,
  rows: string[][]
) => {
  const writeReq = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: spreadsheetTab,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: rows
    }
  });

  Logger.info(
    `Result of appending rows: ${writeReq.status === 200 ? 'Success!' : 'Oh no, failure -- ' + writeReq.data}`
  );
};
