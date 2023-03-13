import styled from 'styled-components';

interface HighlightContainerProps {
  highlight: boolean;
}

export const TextWithHighlightContainer = styled.span`
  font-weight: 'light';
`;

export const HighlightContainer = styled.span`
  font-weight: ${({ highlight }: HighlightContainerProps) =>
    highlight ? 'bold' : 'light'};
  color: ${({ highlight }: HighlightContainerProps) =>
    highlight ? 'blue' : 'initial'};
`;
