export async function wrapApi(promise) {
  return Promise.allSettled([promise]).then(function ([{ value, reason }]) {
    return [value, reason];
  });
}
