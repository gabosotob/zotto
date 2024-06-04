import { Id } from '../types/id.type';

export interface Entity extends Record<string, unknown> {
    id: Id;
}
