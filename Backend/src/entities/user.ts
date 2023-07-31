export const user = (
  name: string,
  username: string,
  number: string,
  email: string,
  password: string
) => {
  return {
    getName: () => name,
    getUsername: () => username,
    getNumber: () => number,
    getEmail: () => email,
    getPassword: () => password,
  };
};
