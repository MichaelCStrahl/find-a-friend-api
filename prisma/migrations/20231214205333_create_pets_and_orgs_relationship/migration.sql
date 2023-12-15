/*
  Warnings:

  - You are about to drop the column `specie` on the `pets` table. All the data in the column will be lost.
  - Added the required column `type` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Cachorro', 'Gato');

-- AlterEnum
ALTER TYPE "Age" ADD VALUE 'Idoso';

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "specie",
ADD COLUMN     "type" "Type" NOT NULL;

-- DropEnum
DROP TYPE "Specie";
