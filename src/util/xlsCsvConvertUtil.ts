/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

export const mapSheetJsValueByType = (value: any): any => {
  if (value == undefined) {
    return undefined;
  }
  if (value.result instanceof Date) {
    return value.result;
  }
  if ((value.formula || value.sharedFormula) && typeof value.result === 'object') {
    if (value.result.error) {
      return value.result.error;
    }
    return JSON.stringify(value.result);
  }
  if (value.formula || value.sharedFormula) {
    return value.result;
  }
  return value;
};

export const csvWritingOptions = {
  formatterOptions: {
    quoteColumns: true,
  },
  map(value: any, _index: number) {
    const mappedValue: any = mapSheetJsValueByType(value);
    if (mappedValue instanceof Date) {
      return dayjs(value);
    }
    return value;
  },
};
