import { DBUser, User } from "interfaces/user";

function DBtoUser(DBuser: DBUser): User {
  const user: User = {
    id: DBuser.id,
    username: DBuser.username,
    email: DBuser.email,
  };

  return user;
}

export { DBtoUser };
