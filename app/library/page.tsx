import { redirect } from "next/navigation";

export const metadata = {
  title: "Plant Library",
};

export default function LibraryPage() {
  redirect("/#archive");
}
