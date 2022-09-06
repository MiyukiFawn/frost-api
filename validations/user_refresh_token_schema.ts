import z from "zod";

const user_refresh_token_schema = z
  .object({
    refresh_token: z.string().max(350),
  })
  .strict();

type user_refresh_token_type = z.infer<typeof user_refresh_token_schema>;

export { user_refresh_token_schema, user_refresh_token_type };
