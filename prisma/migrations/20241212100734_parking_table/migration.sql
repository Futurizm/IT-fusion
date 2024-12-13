-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PAID', 'FREE');

-- CreateTable
CREATE TABLE "Parking" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "spots" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "guarded" BOOLEAN NOT NULL,

    CONSTRAINT "Parking_pkey" PRIMARY KEY ("id")
);
