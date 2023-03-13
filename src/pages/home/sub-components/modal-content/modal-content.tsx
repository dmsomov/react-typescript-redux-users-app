import { FC, memo } from 'react';

import { Address, Company } from '../../../../types';

import { Wrapper, Text } from './modal-content.styles';

interface Props {
  data: {
    address: Address;
    company: Company;
  };
}

export const ModalContent: FC<Props> = memo(({ data }) => (
  <Wrapper>
    <Text>
      Address:
      {data.address.city}, {data.address.street}, {data.address.suite},{' '}
      {data.address.zipcode}
    </Text>
    <Text>Company: {data.company.name}</Text>
  </Wrapper>
));
