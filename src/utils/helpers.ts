export function toJSON(array: any[]): any[] {
  return array.map((product) => product.toObject());
}
