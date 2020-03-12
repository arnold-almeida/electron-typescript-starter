import { Owner } from './Owner'

export class Car {
  public static schema: Realm.ObjectSchema = {
    name: 'Car',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      owner: 'Owner',
    },
  }

  public id: string = ''
  public name: string = ''
  public owner?: Owner
}
