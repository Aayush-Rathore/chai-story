import zod from "zod";

class BaseValidations {
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

  protected title = zod.string().min(10).max(50);
  protected categories = zod.enum([
    "adventure",
    "romance",
    "mystery",
    "scienceFiction",
    "fantasy",
    "horror",
    "historical_Fiction",
    "drama",
    "comedy",
    "thriller",
  ]);
}

export default BaseValidations;
