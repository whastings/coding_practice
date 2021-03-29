const classNames = (...classes: Array<string | false>): string => {
  return classes.filter(Boolean).join(' ');
};

export default classNames;
