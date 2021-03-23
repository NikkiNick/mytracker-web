import { UnitType } from "../unittype/unit-type.model"

export class Tracker {
    id: number
    name: String
    created: Date
    color?: String
    recordLength?: number = 4
    recordPrecision?: number = 2
    unitType?: UnitType
}