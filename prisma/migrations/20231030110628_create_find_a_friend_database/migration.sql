-- CreateEnum
CREATE TYPE "Age" AS ENUM ('Filhote', 'Adulto');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('Pequeno', 'Médio', 'Grande');

-- CreateEnum
CREATE TYPE "Independence" AS ENUM ('Baixo (precisa de companhia sempre)', 'Médio', 'Alto');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Cachorro', 'Gato');

-- CreateEnum
CREATE TYPE "HabitatSize" AS ENUM ('Ambiente Pequeno', 'Ambiente Medio', 'Ambiente Amplo');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "energy" INTEGER NOT NULL,
    "size" "Size" NOT NULL,
    "indepence" "Independence" NOT NULL,
    "type" "Type" NOT NULL,
    "habitat_size" "HabitatSize" NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_gallery" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pet_gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoption_requirements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "adoption_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_gallery" ADD CONSTRAINT "pet_gallery_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_requirements" ADD CONSTRAINT "adoption_requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
