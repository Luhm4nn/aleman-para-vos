-- CreateTable
CREATE TABLE "correos_enviados" (
    "id" SERIAL NOT NULL,
    "destinatarios" TEXT[],
    "asunto" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "correos_enviados_pkey" PRIMARY KEY ("id")
);
