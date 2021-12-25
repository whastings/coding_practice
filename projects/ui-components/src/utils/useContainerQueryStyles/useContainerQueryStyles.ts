interface MaxWidthBreakpoint {
  value: number;
  width: number;
}

function useContainerQueryStyles(breakpoint: MaxWidthBreakpoint) {
  return {
    width: `clamp(
      ${breakpoint.width}px,
      calc((100% - ${breakpoint.value}px) * 9999),
      100%
    )`,
  };
}

export default useContainerQueryStyles;
