import { useState, useCallback, useMemo, ChangeEvent } from 'react';

import { GetColumnsType } from '../types';

interface Data {
  [key: string]: string;
}

export const useTableState = <T>(items: T[], getColumns: GetColumnsType) => {
  const [searchValue, setSearchValue] = useState('');

  const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  const clearSearchValue = useCallback(() => {
    setSearchValue('');
  }, []);

  const rows = useMemo(
    () =>
      items.filter((item: T) =>
        getColumns(searchValue)
          .filter(({ type }) => type === 'string')
          .map(({ field }) => field)
          .some((field: string) =>
            (item as Data)[field]
              .toLowerCase()
              .includes(searchValue.toLowerCase()),
          ),
      ),
    [items, getColumns, searchValue],
  );

  return {
    rows,
    searchValue,
    searchHandler,
    clearSearchValue,
  };
};
