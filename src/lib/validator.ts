/*
 * @Description: 表单验证器
 * @Author: MADAO
 * @Date: 2023-03-29 15:50:31
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-29 15:50:52
 */
export type DataSource<T = Record<string, unknown>> = T;

export type Rules<T = DataSource> = Array<{
  key: keyof T;
  message: string;
  required: boolean | ((value: T[keyof T]) => boolean)
}>;

export type Errors<T = DataSource> = Partial<Record<keyof T, string[]>>;

export const validator = <T extends Record<string, unknown>>(dataSource: DataSource<T>, rules: Rules<DataSource<T>>): Errors<DataSource<T>> => {
  const errors: Errors<DataSource<T>> = {};

  rules.forEach(rule => {
    const value = dataSource[rule.key];
    let passed = false;
    if (typeof rule.required === 'boolean') {
      passed = Boolean(value);
    } else {
      passed = rule.required(value);
    }

    if (!passed) {
      errors[rule.key] = errors[rule.key] ?? [];
      errors[rule.key]?.push(rule.message);
    }
  });

  return errors;
};