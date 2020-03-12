import Realm from 'realm'

import { Owner, Car } from '../entities'

const schema = [Owner.schema, Car.schema]

const mockData = (db: Realm) => {
  db.write(() => {
    // OWNERS
    const owner1: Owner = db.create(
      'Owner',
      { id: 'o1', name: 'Ben', cars: [] },
      true
    )
    const owner2: Owner = db.create(
      'Owner',
      { id: 'o2', name: 'Sam', cars: [] },
      true
    )

    // Cars
    const car1: Car = db.create('Car', { id: 'c1', name: 'Peugeot' }, true)
    const car2: Car = db.create('Car', { id: 'c2', name: 'Volvo' }, true)

    owner1.cars.push(car2)
    owner2.cars.push(car1)
  })
}

export const initialise = () => {
  const realm = new Realm({ schema, path: './src/data/test.realm' })
  const stuff = realm.objects('Owner')
  if (stuff.length === 0) {
    mockData(realm)
  }
  return realm
}
