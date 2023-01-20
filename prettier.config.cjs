/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("prettier-plugin-organize-imports"),
    require.resolve("prettier-plugin-prisma"),
  ],
  overrides: [
    {
      files: "*.prisma",
      options: {
        parser: "prisma-parse",
        tabWidth: 4,
      },
    },
  ],
};
