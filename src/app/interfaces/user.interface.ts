export type TUserRole = "user" | "admin";

export type TUser = {
  fullName: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  password: string;
  role: TUserRole;
};
