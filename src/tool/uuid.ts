import { v4 as uuidv4 } from 'uuid';


export const NewUUID = (): string => {
    return uuidv4();
}