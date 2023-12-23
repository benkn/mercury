// read env vars from .env file
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const currentMonth = 'This_Month';
const maxValue = 100_000;

export const config: Config = {
  startDate: '2023-12-01',
  endDate: '2023-12-31',
  maxValueToInclude: 60,
  spreadsheetTabName: currentMonth, // Or 'Nov'
  spreadsheetId: process.env.SHEETS_SPREADSHEET_ID || '',
  googleCredentials: {
    private_key: process.env.SHEETS_PRIVATE_KEY,
    client_email: process.env.SHEETS_SVC_ACCOUNT,
  },
  plaid: {
    clientId: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    env: process.env.PLAID_ENV || 'sandbox',
  },
};

type Config = {
  /** Start date for range of transactions to include */
  startDate: string;
  /** End date for range of transactions to include */
  endDate: string;
  /** Filter out any transactions with an amount greater than this */
  maxValueToInclude: number;
  /** Name of the tab of the spreadsheet to insert transactions into */
  spreadsheetTabName: string;
  /** ID of the spreadsheet in Google Sheets */
  spreadsheetId: string;
  /** Credentials object to exchange with GoogleAuth */
  googleCredentials: {
    private_key: string | undefined;
    client_email: string | undefined;
  };
  plaid: {
    clientId: string | undefined;
    secret: string | undefined;
    env: string;
  };
};
