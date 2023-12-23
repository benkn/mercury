import { Configuration, PlaidApi, PlaidEnvironments, Transaction, TransactionsGetRequest } from 'plaid';
import Logger from '../../util/logger-console';
import { Account, config } from '../../config';

export class PlaidClient {
  private configuration: Configuration;
  private client: PlaidApi;

  constructor() {
    if (!config.plaid.clientId || !config.plaid.secret) {
      Logger.error('Plaid client ID or secret not set...');
    }

    this.configuration = new Configuration({
      basePath: PlaidEnvironments[config.plaid.env],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': config.plaid.clientId,
          'PLAID-SECRET': config.plaid.secret,
          'Plaid-Version': '2020-09-14',
        },
      },
    });

    this.client = new PlaidApi(this.configuration);
  }

  public getTransactions = async (account: Account, startDate: string, endDate: string): Promise<Transaction[]> => {
    Logger.important(`Fetching transactions for ${account.name}`);

    // Create request body
    const request: TransactionsGetRequest = {
      access_token: account.access_token,
      start_date: startDate,
      end_date: endDate,
      options: {
        // This is the max number of transactions to get in this time range. Default is 100.
        // This is set to the max to get all transactions.
        count: 500,
      },
    };

    // Issue request to get transactions
    const response = await this.client.transactionsGet(request);
    const { total_transactions, transactions } = response.data;

    Logger.info(`Received ${total_transactions} transactions. Filtering based on configuration.`);
    const dateFiltered = transactions.filter((t) => t.date >= startDate);
    Logger.debug(`${dateFiltered.length} transactions after the date filter`);
    return dateFiltered.filter((t) => t.amount <= config.maxValueToInclude || t.amount >= 1000);
  };
}
