import { NextResponse } from "next/server";
import { getCategories } from "@/lib/products";

export async function GET() {
  try {
    return NextResponse.json(await getCategories());
  } catch (error) {
    console.error("Catalog category request failed:", error);
    return NextResponse.json({ message: "বিভাগের তথ্য লোড করা যায়নি। / Could not load the department information." }, { status: 502 });
  }
}
