import z from "zod";

const example_schema = z
  .object({
    property: z.string(),
  });

type example_type = z.infer<typeof example_schema>;

export { example_schema, example_type};
