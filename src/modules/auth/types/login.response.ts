export type LoginResponse = {
  accessToken: string;
  user: {
    email: string;
    id: string;
  };
};
