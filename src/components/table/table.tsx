import { memo, useCallback } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

import { useTableState } from './hooks/useTableState';
import { GetColumnsType } from './types';

import { Wrapper, ToolbarWrapper } from './table.styles';

interface Props<T> {
  items: T[];
  isLoading: boolean;
  selectHandler: (el: GridRowParams) => void;
  getColumns: GetColumnsType;
  aditionalReset: () => void;
}

export const Table = memo(
  <T extends unknown>({
    items,
    isLoading,
    selectHandler,
    getColumns,
    aditionalReset,
  }: Props<T>) => {
    const { rows, searchValue, searchHandler, clearSearchValue } =
      useTableState(items, getColumns);

    const resetHandler = useCallback(() => {
      clearSearchValue();
      aditionalReset();
    }, [clearSearchValue, aditionalReset]);

    return (
      <Wrapper>
        <ToolbarWrapper>
          <TextField
            label="Search field"
            type="search"
            value={searchValue}
            onChange={searchHandler}
          />
          <Button variant="outlined" onClick={resetHandler}>
            Reset
          </Button>
        </ToolbarWrapper>
        <DataGrid
          rows={rows}
          columns={getColumns(searchValue)}
          onRowClick={selectHandler}
          loading={isLoading}
          autoHeight
          hideFooter
        />
      </Wrapper>
    );
  },
);
