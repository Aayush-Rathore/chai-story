import zod from "zod";

class BaseValidations {
  private objectIdRegex = /^[a-fA-F0-9]{24}$/;
  protected username = zod
    .string()
    .toLowerCase()
    .trim()
    .regex(/^[a-z._@]+$/, {
      message:
        "Username can only contain lowercase letters, underscores, dots, and @ symbols",
    });

  protected email = zod.string().email({ message: "Invalid email address" });

  protected password = zod
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(12, { message: "Password must be at most 12 characters long" });

  protected queryParams = zod
    .string()
    .min(3)
    .trim()
    .transform((val) => val.replace(/[<>]/g, ""));

  protected jwtTokenSchema = zod.string().refine(
    (token) => {
      const parts = token.split(".");
      return parts.length === 3;
    },
    {
      message: "Invalid JWT token format",
    }
  );

  protected objectId = zod
    .string()
    .refine((val) => this.objectIdRegex.test(val), {
      message: "Invalid id",
    });

  protected mdxContent = zod.string();

  protected storyTitle = zod.string().min(10).max(50);
  protected storyCategories = zod.string();
  protected storyContent = zod.string();
  protected fileUrl = zod.string();
}

export default BaseValidations;
