import { ucFirst } from './ucFirst';

export const formatToObj = (v) =>
  v.map((i) => ({
    label: ucFirst(i),
    value: i,
  }));
