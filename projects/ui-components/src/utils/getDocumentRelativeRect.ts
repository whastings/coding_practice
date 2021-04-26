function getDocumentRelativeRect(viewportRect: DOMRect): DOMRect {
  const { height, width, x, y } = viewportRect;
  return DOMRectReadOnly.fromRect({
    height,
    width,
    x: x + window.scrollX,
    y: y + window.scrollY,
  });
}

export default getDocumentRelativeRect;
