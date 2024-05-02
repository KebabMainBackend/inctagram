/*
  Warnings:

  - The values [PayPall] on the enum `AllowedPaymentTypes` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `customerId` on the `CurrentSubscription` table. All the data in the column will be lost.
  - You are about to drop the `Stripe` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AllowedPaymentTypes_new" AS ENUM ('PayPal', 'Stripe');
ALTER TABLE "Payments" ALTER COLUMN "paymentSystem" DROP DEFAULT;
ALTER TABLE "Subscription" ALTER COLUMN "paymentSystem" DROP DEFAULT;
ALTER TABLE "Subscription" ALTER COLUMN "paymentSystem" TYPE "AllowedPaymentTypes_new" USING ("paymentSystem"::text::"AllowedPaymentTypes_new");
ALTER TABLE "Payments" ALTER COLUMN "paymentSystem" TYPE "AllowedPaymentTypes_new" USING ("paymentSystem"::text::"AllowedPaymentTypes_new");
ALTER TYPE "AllowedPaymentTypes" RENAME TO "AllowedPaymentTypes_old";
ALTER TYPE "AllowedPaymentTypes_new" RENAME TO "AllowedPaymentTypes";
DROP TYPE "AllowedPaymentTypes_old";
ALTER TABLE "Payments" ALTER COLUMN "paymentSystem" SET DEFAULT 'PayPal';
ALTER TABLE "Subscription" ALTER COLUMN "paymentSystem" SET DEFAULT 'PayPal';
COMMIT;

-- AlterTable
ALTER TABLE "CurrentSubscription" DROP COLUMN "customerId",
ADD COLUMN     "paypalCustomerId" TEXT,
ADD COLUMN     "stripeCustomerId" TEXT;

-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "paypalSubscriptionId" TEXT,
ALTER COLUMN "paymentSystem" SET DEFAULT 'PayPal';

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "paypalSubscriptionId" TEXT,
ALTER COLUMN "paymentSystem" SET DEFAULT 'PayPal',
ALTER COLUMN "productPriceId" DROP NOT NULL,
ALTER COLUMN "subscriptionPriceId" DROP NOT NULL;

-- DropTable
DROP TABLE "Stripe";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "period" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "interval" "PaymentInterval",
    "productPriceId" TEXT,
    "subscriptionPriceId" TEXT,
    "paypalPlanId" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
