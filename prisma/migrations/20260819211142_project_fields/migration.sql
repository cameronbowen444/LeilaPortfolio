/*
  Warnings:

  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "gallery" TEXT[],
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "Experience";
