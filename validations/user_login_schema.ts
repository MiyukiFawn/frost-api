import z from "zod";

const user_login_schema = z
  .object({
    username: z.string(),
    password: z.string().min(3),
  })
  .strict();

type user_login_type = z.infer<typeof user_login_schema>;

export { user_login_schema, user_login_type };