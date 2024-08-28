/*
  Warnings:

  - A unique constraint covering the columns `[uri]` on the table `units` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `units` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "units_uri_key" ON "units"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "units_label_key" ON "units"("label");
