/*
  Warnings:

  - You are about to drop the column `type` on the `pets` table. All the data in the column will be lost.
  - Added the required column `specie` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `energy` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('Baixo', 'Moderado', 'Alto', 'Muito Alto');

-- CreateEnum
CREATE TYPE "Specie" AS ENUM ('Cachorro', 'Gato');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "type",
ADD COLUMN     "specie" "Specie" NOT NULL,
DROP COLUMN "energy",
ADD COLUMN     "energy" "Energy" NOT NULL;

-- DropEnum
DROP TYPE "Type";
