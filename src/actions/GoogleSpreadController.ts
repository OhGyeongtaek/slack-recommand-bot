import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import AuthJson from '../config/google_sheet_key.json';

export default class GoogleSpreadController {
  private doc;

  constructor() {
    this.doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREAD_SHEET_ID);
  }

  async getRows(sheetsByIndex: number): Promise<GoogleSpreadsheetRow[]> {
    await this.doc.useServiceAccountAuth(AuthJson);
    await this.doc.loadInfo();

    const sheet = this.doc.sheetsByIndex[sheetsByIndex];

    const rows: GoogleSpreadsheetRow[] = await sheet.getRows({
      offset: 0,
      limit: sheet.rowCount,
    });

    return rows;
  }
}
