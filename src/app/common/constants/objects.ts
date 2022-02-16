/*
  The idea here is to use at components' getters
  When you need to return empty object
  So instead of creating a new empty array/object/strings
  The runtime can use these objects.
*/

const EMPTY_ARRAY: any[] = [];
Object.freeze(EMPTY_ARRAY);

const EMPTY_OBJECT: object = {};
Object.freeze(EMPTY_OBJECT);

const EMPTY_STRING: string = '';
Object.freeze(EMPTY_STRING);

export { EMPTY_ARRAY, EMPTY_OBJECT, EMPTY_STRING };
