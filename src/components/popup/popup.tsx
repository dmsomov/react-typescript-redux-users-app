import {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  ReactElement,
} from 'react';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { Wrapper, ActionsWrapper } from './popup.styles';

interface Props {
  children: ReactElement | null;
}

export interface CountdownHandleProps {
  open: () => void;
  close: () => void;
}

export const Popup = forwardRef<CountdownHandleProps, Props>(
  ({ children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const close = useCallback(() => {
      setIsOpen(false);
    }, []);

    const open = useCallback(() => {
      setIsOpen(true);
    }, []);

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    return (
      <Modal open={isOpen} onClose={close}>
        <Wrapper>
          {children}
          <ActionsWrapper>
            <Button variant="outlined" onClick={close}>
              Close
            </Button>
          </ActionsWrapper>
        </Wrapper>
      </Modal>
    );
  },
);
