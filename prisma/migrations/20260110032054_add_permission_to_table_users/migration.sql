-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('PERMITTED', 'DENIED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "permission" "Permission" NOT NULL DEFAULT 'DENIED';
