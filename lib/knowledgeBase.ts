import ambassadors from "@/data/ambassadors.json";
import index from "@/data/knowledgeBaseIndex.json";
import { plants } from "@/lib/plants";

export const knowledgeBaseIndex = index;
export const ambassadorRoster = ambassadors;

export function getAmbassador(slug: string) {
  return ambassadors.find((item) => item.slug === slug);
}

export function talkingCharacters() {
  return ambassadors.filter((item) => item.talking);
}

export function visualAmbassadors() {
  return ambassadors.filter((item) => item.role === "Ambassador");
}

export function plantRecordCountPlaceholder() {
  return {
    inPrototype: plants.length,
    plannedMasterRecords: 56,
    note: "Prototype shelf only. Master records still to be sourced.",
  };
}
