export type UserType = {
  username: string;
  avatar?: string;
  address: string;
  cover?: string;
  bio?: string;
};

export type UserUpdateType = {
  address: string;
  username?: string;
  bio?: string;
  avatar?: string;
  cover?: string;
};
