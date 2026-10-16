import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET() {
  try {
    return NextResponse.json(await getProducts());
  } catch (error) {
    console.error("Catalog product request failed:", error);
    return NextResponse.json({ message: "পণ্যের তথ্য লোড করা যায়নি। / Could not load the department information." }, { status: 502 });
  }
}
