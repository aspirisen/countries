"use server";

import { countriesDB } from "../db/countries";
import { revalidatePath } from "next/cache";

export async function removeCountry(isoCode3: string) {
  const success = await countriesDB.remove(isoCode3);

  if (success) {
    revalidatePath("/");
  }
}
