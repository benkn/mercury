/** Returns the first value in the parameters which has been defined. */
export function firstDefined(x: any, y: any): any {
  return x !== undefined ? x : y;
}
