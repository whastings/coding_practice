interface MaxWidthBreakpoint {
  value: number;
  width: number;
}

function useContainerQueryStyles(breakpoints: MaxWidthBreakpoint[]) {
  const breakpointStrings = breakpoints.map(
    (breakpoint) => `
    max(
      ${breakpoint.width}px,
      calc((100% - ${breakpoint.value}px) * 9999)
    )
  `,
  );
  return {
    width: `min(
      ${breakpointStrings.join(',')},
      100%
    )`,
  };
}

export default useContainerQueryStyles;
