import { notFound } from "next/navigation";
import { PlantProfile } from "@/components/PlantProfile";
import { getPlant, plants } from "@/lib/plants";

export function generateStaticParams() {
  return plants.map((plant) => ({ slug: plant.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plant = getPlant(slug);
  if (!plant) return { title: "Plant" };
  return { title: plant.name };
}

export default async function PlantProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plant = getPlant(slug);
  if (!plant) notFound();
  return (
    <div className="library-ground">
      <PlantProfile plant={plant} />
    </div>
  );
}
