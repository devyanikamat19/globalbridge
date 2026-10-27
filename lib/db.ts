import { applications } from './mock-data';
import { Application } from './types';

// In-Memory Data Store (Assignment Requirement)
// We use let so we can reassign or mutate the array in memory during the server lifecycle
export let applicationsDb: Application[] = [...applications];
