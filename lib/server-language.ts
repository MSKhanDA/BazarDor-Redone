import { cookies } from "next/headers";
import { Language } from "@/lib/i18n";

export async function getServerLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  return cookieStore.get("bazar-language")?.value === "en" ? "en" : "bn";
}
