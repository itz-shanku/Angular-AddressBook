import { ContactOperation } from './contcat-operation.enum';

export class UpdateDetails {
  operationType: ContactOperation;
  id: any;

  constructor(newUpdate: any) {
    this.operationType = newUpdate.operationType;
    this.id = newUpdate.id;
  }
}
