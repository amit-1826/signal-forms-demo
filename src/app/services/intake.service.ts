import { Service } from '@angular/core';

@Service()
export class IntakeApiService {
    private readonly takenCodes = new Set(['ALPHA', 'BETA', 'DEMO']);

    async isCodeTaken(code: string): Promise<boolean> {
        await this.delay(1000);
        return this.takenCodes.has(code.trim().toUpperCase());
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}