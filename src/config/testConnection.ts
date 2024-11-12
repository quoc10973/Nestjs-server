import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TestConnectionService {
    private readonly logger = new Logger(TestConnectionService.name);

    constructor(private connection: DataSource) { }

    async testConnection(): Promise<void> {
        try {
            await this.connection.query('SELECT 1');
            this.logger.log('Database connection is successful');
        } catch (error) {
            this.logger.error('Database connection failed', error);
        }
    }
}