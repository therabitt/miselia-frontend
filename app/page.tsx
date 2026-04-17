// Root page — redirect ke find-papers (entry point utama)
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/find-papers");
}
