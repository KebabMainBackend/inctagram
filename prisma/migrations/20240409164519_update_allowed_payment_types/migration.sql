/*
  Warnings:

  - The values [PayPal] on the enum `AllowedPaymentTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AllowedPaymentTypes_new" AS ENUM ('Paypal', 'Stripe');
ALTER TABLE "Payments" ALTER COLUMN "paymentSystem" DROP DEFAULT;
ALTER TABLE "Subscription" ALTER COLUMN "paymentSystem" DROP DEFAULT;
ALTER TABLE "Subscription" ALTER COLUMN "paymentSystem" TYPE "AllowedPaymentTypes_new" USING ("paymentSystem"::text::"AllowedPaymentTypes_new");
ALTER TABLE "Payments" ALTER COLUMN "paymentSystem" TYPE "AllowedPaymentTypes_new" USING ("paymentSystem"::text::"AllowedPaymentTypes_new");
ALTER TYPE "AllowedPaymentTypes" RENAME TO "AllowedPaymentTypes_old";
ALTER TYPE "AllowedPaymentTypes_new" RENAME TO "AllowedPaymentTypes";
DROP TYPE "AllowedPaymentTypes_old";
ALTER TABLE "Payments" ALTER COLUMN "paymentSystem" SET DEFAULT 'Paypal';
ALTER TABLE "Subscription" ALTER COLUMN "paymentSystem" SET DEFAULT 'Paypal';
COMMIT;

-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "paymentSystem" SET DEFAULT 'Paypal';

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "paymentSystem" SET DEFAULT 'Paypal';
