import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class DbService implements InMemoryDbService {

    constructor() { }

    createDb() {
        const instruments = [
            { security: 'Security 1', minVol: 100 },
            { security: 'Security 2', minVol: 200 },
            { security: 'Security 3', minVol: 300 },
            { security: 'Security 4', minVol: 400 },
            { security: 'Security 5', minVol: 500 }
        ];
        return { instruments };
    }
}