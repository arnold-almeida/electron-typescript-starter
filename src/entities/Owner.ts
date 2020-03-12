import { Car } from './Car'

export class Owner {
  public static schema: Realm.ObjectSchema = {
    name: 'Owner',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      cars: 'Car[]',
    },
  }

  public id: string = ''
  public name: string = ''
  public cars: Car[] = []
}
