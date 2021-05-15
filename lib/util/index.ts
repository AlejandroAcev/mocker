const isInArray = <T, A extends T>(
  item: T,
  array: ReadonlyArray<A>
): item is A => array.includes(item as A);

const validateEmail = (email: string) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email.toLowerCase());
}

export {
  isInArray,
  validateEmail
}