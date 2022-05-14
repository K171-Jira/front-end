export default class RecyclingPoint {
  _id: string;
  address: string;
  maxCapacity?: number;
  filledCapacity?: number;
  lat: number;
  lng: number;

  constructor(dto: any) {
    this._id = dto._id;
    this.address = dto.address;
    this.maxCapacity = dto.maxCapacity || null;
    this.filledCapacity = dto.filledCapacity || null;
    this.lat = dto.lat;
    this.lng = dto.lng;
  }
}
