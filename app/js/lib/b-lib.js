function ascendindfdgComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}