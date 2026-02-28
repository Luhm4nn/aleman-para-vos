-- CreateTable
CREATE TABLE "materiales" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "docUrl" TEXT NOT NULL,
    "docPublicId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "materiales_pkey" PRIMARY KEY ("id")
);
