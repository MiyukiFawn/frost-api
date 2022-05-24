interface User {
  id?: number,
  username: string;
  email: string;
  password?: string;
}

interface DBUser {
  id: number;
  username: string;
  email: string;
  password: string;
  creationDate: string;
}

export { User, DBUser };
