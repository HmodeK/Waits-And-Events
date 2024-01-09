import { readFile } from 'fs/promises';
import { parse } from 'csv-parse/sync';

export class CsvReader {
  filePath: string;

  constructor(filePath: string) {
      this.filePath = filePath;
  }

  async readCSV(): Promise<any[]> {
      const fileContent = await readFile(this.filePath, 'utf8');
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        delimiter: ',',
        relax_column_count: true,
        relax_quotes: true,
      });
      return records;
  }
}
