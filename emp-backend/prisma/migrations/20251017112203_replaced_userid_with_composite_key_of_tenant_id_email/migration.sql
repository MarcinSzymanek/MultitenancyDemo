/*
  Warnings:

  - You are about to drop the column `userId` on the `schedules` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - Added the required column `tenantId` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."schedules" DROP CONSTRAINT "schedules_userId_fkey";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "userId",
ADD COLUMN     "tenantId" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("email", "tenantId");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_userEmail_tenantId_fkey" FOREIGN KEY ("userEmail", "tenantId") REFERENCES "users"("email", "tenantId") ON DELETE RESTRICT ON UPDATE CASCADE;
