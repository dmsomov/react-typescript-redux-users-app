import { useCallback } from 'react';
import {
  GridActionsCellItem,
  GridRowParams,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

import { TextWithHighlight } from '../../../components';
// *** Due to fake api server the delete hook won't be working
// import { useDeleteUserMutation } from '../../../api/users';

// *** Fake argument
export const useGetUserColumns = (setFakeDeleteUsers: any) => {
  // *** Due to fake api server the delete function won't be working
  // const [deleteUser] = useDeleteUserMutation();

  // const deleteHandler = useCallback(
  //   async (id: number) => {
  //     try {
  //       await deleteUser(id);
  //     } catch (err) {
  //       console.error(err || 'Something went wrong.');
  //     }
  //   },
  //   [deleteUser],
  // );

  // *** Fake handler
  const deleteHandler = useCallback(
    (id: number) => {
      setFakeDeleteUsers((prev: number[]) => [...prev, id]);
    },
    [setFakeDeleteUsers],
  );

  const getColumns = useCallback(
    (searchValue: string): GridColDef[] => [
      {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        type: 'string',
        renderCell: ({ value }: GridRenderCellParams<String>) => (
          <TextWithHighlight text={value} highlightedText={searchValue} />
        ),
      },
      {
        field: 'username',
        headerName: 'User Name',
        flex: 1,
        type: 'string',
        renderCell: ({ value }: GridRenderCellParams<String>) => (
          <TextWithHighlight text={value} highlightedText={searchValue} />
        ),
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        type: 'string',
        renderCell: ({ value }: GridRenderCellParams<String>) => (
          <TextWithHighlight text={value} highlightedText={searchValue} />
        ),
      },
      {
        field: 'actions',
        type: 'actions',
        flex: 1,
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => deleteHandler(params.row.id)}
            label="Delete"
          />,
        ],
      },
    ],
    [],
  );

  return getColumns;
};
