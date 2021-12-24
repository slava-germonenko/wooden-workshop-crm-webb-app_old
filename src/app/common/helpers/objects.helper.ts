export class ObjectsHelper {
  public static createClean(obj: any): any {
    return Object.getOwnPropertyNames(obj)
      .filter((propName) => obj[propName] !== undefined && obj[propName] !== null)
      .reduce(
        (result: any, propName) => {
          // eslint-disable-next-line no-param-reassign
          result[propName] = obj[propName];
          return result;
        },
        {},
      );
  }
}
