export const stringSort = dataIndex => (a, b) => {
  if ((a[dataIndex] && a[dataIndex] !== '-') && (b[dataIndex]) && b[dataIndex] !== '-') {
    return String(a[dataIndex]).localeCompare(String(b[dataIndex]), 'zh-CH');
  }
  if (!a[dataIndex] && b[dataIndex]) {
    return -1;
  }
  if (!a[dataIndex] && !b[dataIndex]) {
    return 0
  }
  if (a[dataIndex] === '-' && b[dataIndex]) {
    return -1
  }
  if (a[dataIndex] === '-' && b[dataIndex] === '-') {
    return 0
  }
  return 1
}


export const numberSort = dataIndex => (a, b) => {
  if (a[dataIndex] && b[dataIndex]) {
    return a[dataIndex] - b[dataIndex];
  }
  if (!a[dataIndex] && b[dataIndex]) {
    return -1;
  }
  if (!a[dataIndex] && !b[dataIndex]) {
    return 0;
  }
  return 1
}