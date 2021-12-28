import { EqualityComparer } from '@common/types';

export class ArrayHelper {
  public static haveIntersection<T>(arr1: T[], arr2: T[], comparer?: EqualityComparer<T>): boolean {
    if (comparer) {
      return arr1.some((arr1Item) => arr2.some((arr2Item) => comparer(arr1Item, arr2Item)));
    }

    return arr1.some((arr1Item) => arr2.includes(arr1Item));
  }

  public static getIntersection<T>(arr1: T[], arr2: T[], comparer?: EqualityComparer<T>): T[] {
    if (comparer) {
      return arr1.filter((arr1Item) => arr2.some((arr2Item) => comparer(arr1Item, arr2Item)));
    }

    return arr1.filter((arr1item) => arr2.includes(arr1item));
  }

  public static extract<T>(arr1: T[], arr2: T[], comparer?: EqualityComparer<T>): T[] {
    if (comparer) {
      return arr1.filter((arr1Item) => !arr2.some((arr2Item) => comparer(arr1Item, arr2Item)));
    }

    return arr1.filter((arr1item) => !arr2.includes(arr1item));
  }
}
