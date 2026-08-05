-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paid_method" TEXT NOT NULL DEFAULT '';
