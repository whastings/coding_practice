interface MaxWidthBreakpoint {
  value: number;
  width: number;
}

function useContainerQueryStyles(
  breakpoint1: MaxWidthBreakpoint,
  breakpoint2: MaxWidthBreakpoint,
) {
  return {
    width: `min(
      max(
        ${breakpoint1.width}px,
        calc((100% - ${breakpoint1.value}px) * 9999)
      ),
      max(
        ${breakpoint2.width}px,
        calc((100% - ${breakpoint2.value}px) * 9999)
      ),
      100%
    )`,
  };
}

export default useContainerQueryStyles;
