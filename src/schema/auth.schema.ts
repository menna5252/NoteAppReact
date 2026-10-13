import * as z from "zod";

export const BaseSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z.email('invalid email').nonempty("Email is required"),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
  ),
  rePassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
  ),
  gender: z.enum(["male", "female"], "Gender is required"),
//   age:z.number().min(18,'You must be 18 or older to register'),
age:z.number().refine((value) => {
          return value >= 18? true : false
      }, "You must be 18 or older to register"),

  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid egypt phone number"),
});

export const RegisterSchema = BaseSchema.refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
})

export const LoginSchema = BaseSchema.pick({ email: true, password: true });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type LoginSchemaType = Pick<RegisterSchemaType, "email" | "password">;
