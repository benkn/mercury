import { google } from 'googleapis';
import { config } from '../../config';

/**
 * Perform the authentication with Google to get back a Sheets object.
 * @returns sheets_v4.Sheets
 */
export const authentication = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: config.googleCredentials,
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const sheets = google.sheets({
    version: 'v4',
    auth: auth,
  });

  return sheets;
};
