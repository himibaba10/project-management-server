export type TUserRole = "user" | "admin";
export type TUserStatus = "active" | "blocked" | "deleted";

export type TUser = {
  fullName: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  password: string;
  role: TUserRole;
  status: TUserStatus;
};
