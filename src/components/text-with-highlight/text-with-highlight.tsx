import { useCallback, useMemo, memo, FC } from 'react';

import {
  TextWithHighlightContainer,
  HighlightContainer,
} from './text-with-highlight.styles';

interface Props {
  text: string;
  highlightedText: string;
}

export const TextWithHighlight: FC<Props> = memo(
  ({ text, highlightedText }) => {
    const parts = useMemo(
      () => text.split(new RegExp(`(${highlightedText})`, 'gi')),
      [highlightedText, text],
    );

    const isHighlighted = useCallback(
      (part: string) => part.toLowerCase() === highlightedText.toLowerCase(),
      [highlightedText],
    );

    return (
      <TextWithHighlightContainer>
        {parts.map((part: string, i: number) => (
          <HighlightContainer key={i} highlight={isHighlighted(part)}>
            {part}
          </HighlightContainer>
        ))}
      </TextWithHighlightContainer>
    );
  },
);
