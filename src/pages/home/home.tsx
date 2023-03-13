import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { GridRowParams } from '@mui/x-data-grid';

import { ModalContent } from './sub-components/modal-content';
import { Table, Popup, CountdownHandleProps } from '../../components';
import { useGetUsersQuery } from '../../api/users';
import { useGetUserColumns } from './hooks/useGetUserColumns';
import { User } from '../../types';

import { Wrapper } from './home.styles';

export const Home = memo(() => {
  const [contentData, setContentData] = useState(null);
  const [fakeDeletedUsers, setFakeDeletedUsers] = useState<number[]>([]);
  const { data: users = [], isLoading } = useGetUsersQuery();
  const getColumns = useGetUserColumns(setFakeDeletedUsers);
  const modalRef = useRef<CountdownHandleProps>(null);

  const selectHandler = useCallback(
    ({ row }: GridRowParams) => {
      setContentData(() => ({ ...row }));
      modalRef?.current?.open();
    },
    [modalRef],
  );

  // *** Fake filtering without deleted users
  const nonDeletedUsers: User[] = useMemo(
    () => users.filter((user: User) => !fakeDeletedUsers.includes(user.id)),
    [fakeDeletedUsers, users],
  );

  const resetHandler = useCallback(() => {
    // *** Fake cleaning
    // *** For better solution need to use some endpoint
    setFakeDeletedUsers([]);
  }, []);

  return (
    <Wrapper>
      <Table
        // *** Fake users. For better case need to use the "users" variable
        items={nonDeletedUsers}
        isLoading={isLoading}
        selectHandler={selectHandler}
        getColumns={getColumns}
        aditionalReset={resetHandler}
      />
      <Popup ref={modalRef}>
        {contentData ? <ModalContent data={contentData} /> : null}
      </Popup>
    </Wrapper>
  );
});
