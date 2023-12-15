/*
  Warnings:

  - Changed the type of `indepence` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Indepence" AS ENUM ('Baixo (precisa de companhia sempre)', 'Médio', 'Alto');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "indepence",
ADD COLUMN     "indepence" "Indepence" NOT NULL;

-- DropEnum
DROP TYPE "Independence";
