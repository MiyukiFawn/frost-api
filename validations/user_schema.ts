import z from "zod";

const user_schema = z
  .object({
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string().min(3),
    password_confirm: z.string().min(3),
  })
  .strict()
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords do not match",
  });

type user_type = z.infer<typeof user_schema>;

export { user_schema, user_type};
