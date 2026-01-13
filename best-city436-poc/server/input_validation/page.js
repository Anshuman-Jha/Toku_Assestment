const z = require("zod");

const inputValidationSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }).max(300, { message: "Name must be at most 30 characters long" }),
    price: z.number().min(0, { message: "Price must be a non-negative number" }).max(100000000000000, { message: "Price must be at most 100000" }),
});

module.exports = { inputValidationSchema };