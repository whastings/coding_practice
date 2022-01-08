interface MaxWidthBreakpoint {
  value: number;
  width: number;
}

interface Options {
  maxWidth?: number | string;
}

function useContainerQueryStyles(
  breakpoints: MaxWidthBreakpoint[],
  { maxWidth = '100%' }: Options = {},
) {
  const breakpointStrings = breakpoints.map(
    (breakpoint) => `
    max(
      ${breakpoint.width}px,
      calc((100% - ${breakpoint.value}px) * 9999)
    )
  `,
  );
  const maxWidthString =
    typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`;

  return {
    width: `min(
      ${breakpointStrings.join(',')},
      ${maxWidthString}
    )`,
  };
}

export default useContainerQueryStyles;
