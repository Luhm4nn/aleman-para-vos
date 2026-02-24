-- CreateTable
CREATE TABLE "datos_transferencia" (
    "id" SERIAL NOT NULL,
    "alias" TEXT NOT NULL,
    "cvu" TEXT NOT NULL,
    "nombreCuenta" TEXT NOT NULL,

    CONSTRAINT "datos_transferencia_pkey" PRIMARY KEY ("id")
);
