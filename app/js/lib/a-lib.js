function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}