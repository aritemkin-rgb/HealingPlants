"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CategorySelector } from "@/components/CategorySelector";
import { IssueSelector } from "@/components/IssueSelector";
import { PlantPortrait } from "@/components/PlantPortrait";
import { PrairieSageGuide } from "@/components/PrairieSageGuide";
import { SafetyNote } from "@/components/SafetyNote";
import {
  buildGuidePath,
  getCategory,
  getRecommendations,
  healingCategories,
  isPlantConcern,
  parseIdList,
} from "@/lib/recommendationEngine";
import type { Plant, PlantConcern } from "@/lib/types";

type GuideSelection = {
  concerns: PlantConcern[];
  issues: string[];
  intensity: number;
};

type PlantTab = "benefits" | "precautions" | "dosage" | "prepare" | "grow";

const plantTabs: { id: PlantTab; label: string }[] = [
  { id: "benefits", label: "Benefits" },
  { id: "precautions", label: "Precautions" },
  { id: "dosage", label: "Dosage" },
  { id: "prepare", label: "Prepare" },
  { id: "grow", label: "Grow" },
];

function listLabels(labels: string[]) {
  if (labels.length === 0) return "";
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}

function fingerprint(selection: GuideSelection) {
  return `${selection.concerns.join(",")}|${selection.issues.join(",")}|${selection.intensity}`;
}

function selectionFromSearch(searchParams: URLSearchParams): GuideSelection {
  const intensityValue = Number(searchParams.get("intensity") ?? "3");
  return {
    concerns: parseIdList(
      searchParams.get("concerns"),
      searchParams.get("concern"),
    ).filter(isPlantConcern),
    issues: parseIdList(searchParams.get("issues"), searchParams.get("issue")),
    intensity: Number.isFinite(intensityValue) ? intensityValue : 3,
  };
}

function tabCopy(plant: Plant, tab: PlantTab) {
  if (tab === "benefits") {
    return (
      <>
        <ul className="list-disc space-y-1.5 pl-4 text-sm font-light text-[var(--ink)]">
          {plant.benefits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm font-light leading-relaxed text-[var(--ink-soft)]">
          {plant.traditionalUses}
        </p>
      </>
    );
  }
  if (tab === "precautions") {
    return (
      <ul className="list-disc space-y-1.5 pl-4 text-sm font-light text-[var(--ink)]">
        {plant.precautions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (tab === "dosage") {
    return (
      <p className="text-sm font-light leading-relaxed text-[var(--ink-soft)]">
        Dosage is not provided in this prototype. A later sourced record can sit
        here. Do not treat any number on this site as a prescription.
      </p>
    );
  }
  if (tab === "prepare") {
    return <p className="text-sm font-light leading-relaxed text-[var(--ink)]">{plant.preparation}</p>;
  }
  return (
    <>
      <p className="text-sm font-light leading-relaxed text-[var(--ink)]">{plant.grow}</p>
      {plant.gardenNotes.length > 0 ? (
        <p className="mt-3 font-condensed text-[0.68rem] uppercase tracking-[0.14em] text-[var(--guide-purple)]">
          {plant.gardenNotes.join(" · ")}
        </p>
      ) : null}
    </>
  );
}

function PlantWindow({
  topPlant,
  onChat,
}: {
  topPlant: ReturnType<typeof getRecommendations>[number] | undefined;
  onChat: () => void;
}) {
  const [tab, setTab] = useState<PlantTab>("benefits");
  const plant = topPlant?.plant;

  useEffect(() => {
    setTab("benefits");
  }, [plant?.slug]);

  if (!plant) {
    return (
      <aside className="bg-white px-2 py-4 lg:px-4">
        <p className="font-condensed text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[var(--guide-purple)]">
          Highest on this path
        </p>
        <p className="mt-6 font-display text-2xl text-[var(--ink)]">The plant lands here.</p>
        <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-[var(--ink-soft)]">
          Tap a concern and the first plant appears in place.
        </p>
      </aside>
    );
  }

  return (
    <aside className="bg-white px-2 py-4 lg:px-4">
      <p className="font-condensed text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[var(--guide-purple)]">
        Highest on this path
      </p>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <h3 className="min-w-[7rem] flex-1 font-display text-3xl leading-tight text-[var(--ink)] md:text-4xl">
          {plant.name}
        </h3>
        <PlantPortrait
          slug={plant.slug}
          name={plant.name}
          className="h-48 w-48 shrink-0 md:h-56 md:w-56"
        />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
        <nav className="flex flex-col">
          {plantTabs.map((item) => {
            const on = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`px-3 py-2.5 text-left font-condensed text-[0.68rem] uppercase tracking-[0.12em] ${
                  on
                    ? "bg-[var(--guide-purple)] text-white"
                    : "bg-[rgba(88,57,150,0.12)] text-[var(--guide-purple)]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="min-h-[12rem]">{tabCopy(plant, tab)}</div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onChat}
          className="rounded-full bg-[var(--guide-purple)] px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-white"
        >
          Chat
        </button>
        <Link
          href={`/marketplace?plant=${plant.slug}`}
          className="rounded-full border border-[var(--guide-purple)] px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--guide-purple)]"
        >
          Buy
        </Link>
        <Link
          href={`/library/${plant.slug}`}
          className="rounded-full border border-[var(--guide-purple)] px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--guide-purple)]"
        >
          Learn more
        </Link>
      </div>
    </aside>
  );
}

function guidePath(selection: GuideSelection, talkOpen: boolean) {
  const path = buildGuidePath(selection);
  if (!talkOpen) return path;
  const params = new URLSearchParams(path.split("?")[1] ?? "");
  params.set("talk", "1");
  return `/healing-guide?${params.toString()}`;
}

export function HealingGuideClient() {
  const searchParams = useSearchParams();
  const urlKey = searchParams.toString();
  const talkFromUrl = searchParams.get("talk") === "1";
  const [sageOpen, setSageOpen] = useState(talkFromUrl);
  const [selection, setSelection] = useState<GuideSelection>(() =>
    selectionFromSearch(searchParams),
  );
  const { concerns, issues, intensity } = selection;
  const results = getRecommendations({ concerns, issues, intensity });
  const selectedLabels = concerns.map((id) => getCategory(id)?.label ?? id);
  const overlapCount = results.filter((item) => item.matchedConcerns.length > 1).length;
  const topPlant = results[0];
  const morePlants = results.slice(1);
  const selectedCategories = healingCategories.filter((item) =>
    concerns.includes(item.id as PlantConcern),
  );

  useEffect(() => {
    const fromUrl = selectionFromSearch(new URLSearchParams(urlKey));
    if (fingerprint(fromUrl) === fingerprint(selection)) return;
    setSelection(fromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- compare fingerprints, not the object
  }, [urlKey]);

  useEffect(() => {
    if (talkFromUrl) setSageOpen(true);
  }, [talkFromUrl]);

  useEffect(() => {
    if (!sageOpen) return;
    document.getElementById("sage-talk")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [sageOpen]);

  function write(next: GuideSelection) {
    setSelection(next);
    window.history.replaceState(window.history.state, "", guidePath(next, sageOpen));
  }

  function openSage() {
    setSageOpen(true);
    window.history.replaceState(
      window.history.state,
      "",
      guidePath(selection, true),
    );
  }

  function closeSage() {
    setSageOpen(false);
    window.history.replaceState(
      window.history.state,
      "",
      guidePath(selection, false),
    );
  }

  function toggleConcern(id: string) {
    const nextConcerns = concerns.includes(id as PlantConcern)
      ? concerns.filter((item) => item !== id)
      : [...concerns, id as PlantConcern];
    const allowed = new Set(
      nextConcerns.flatMap(
        (concern) => getCategory(concern)?.issues.map((issue) => issue.id) ?? [],
      ),
    );
    write({
      concerns: nextConcerns,
      issues: issues.filter((issue) => allowed.has(issue)),
      intensity,
    });
  }

  function toggleIssue(id: string) {
    const nextIssues = issues.includes(id)
      ? issues.filter((item) => item !== id)
      : [...issues, id];
    write({ concerns, issues: nextIssues, intensity });
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 [overflow-anchor:none]">
        <section className="mb-6 bg-white">
          <h1 className="font-display text-4xl text-[var(--ink)] md:text-[2.75rem]">
            Choose how you feel
          </h1>
          <p className="mt-1 text-base font-light text-[var(--ink-soft)]">
            One concern or several. The first plant stays in the window.
          </p>
        </section>

        <section className="grid items-start gap-x-10 gap-y-4 bg-white lg:grid-cols-[minmax(0,0.92fr)_minmax(26rem,1.2fr)]">
          <div>
            <div className="mb-3 flex flex-wrap items-start gap-2">
              <div className="min-w-0 flex-1">
                <CategorySelector
                  selected={concerns}
                  selectedIssues={issues}
                  onToggleConcern={toggleConcern}
                  onToggleIssue={toggleIssue}
                  compact
                />
              </div>
              <button
                type="button"
                onClick={() => write({ concerns: [], issues: [], intensity: 3 })}
                className={`shrink-0 rounded-full border border-[rgba(44,36,22,0.16)] px-3 py-1.5 font-condensed text-[0.68rem] uppercase tracking-[0.12em] ${
                  concerns.length === 0 ? "invisible" : ""
                }`}
              >
                Clear
              </button>
            </div>
            <p className="mb-4 text-sm font-light text-[var(--ink-soft)]">
              {concerns.length === 0
                ? "Tap a concern. Sage is below if you want to talk."
                : concerns.length > 1
                  ? `You chose ${listLabels(selectedLabels)}. ${
                      overlapCount
                        ? "Overlap comes first on the path."
                        : "A small group for this mix."
                    }`
                  : `A small group for ${selectedLabels[0]}.`}
            </p>

            <div className="mt-4 rounded-2xl bg-[rgba(88,57,150,0.05)] p-3 md:p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="min-w-0 flex-1">
                  {selectedCategories.length === 0 ? (
                    <p className="text-sm font-light leading-relaxed text-[var(--ink-soft)]">
                      Restless sleep, bloating, sore muscle — chips wait here.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {selectedCategories.map((category) => (
                        <div key={category.id}>
                          <p className="mb-1.5 font-condensed text-[0.68rem] uppercase tracking-[0.14em] text-[var(--guide-purple)]">
                            {category.label}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {category.issues.map((issue) => {
                              const on = issues.includes(issue.id);
                              return (
                                <button
                                  key={issue.id}
                                  type="button"
                                  onClick={() => toggleIssue(issue.id)}
                                  aria-pressed={on}
                                  className={`rounded-full px-3 py-1.5 font-condensed text-[0.68rem] uppercase tracking-[0.12em] ${
                                    on
                                      ? "bg-[var(--guide-purple)] text-white"
                                      : "border border-[rgba(88,57,150,0.22)] bg-white text-[var(--ink)]"
                                  }`}
                                >
                                  {issue.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="w-full shrink-0 border-t border-[rgba(88,57,150,0.12)] pt-3 md:w-44 md:border-l md:border-t-0 md:pl-4 md:pt-0">
                  <IssueSelector
                    intensity={intensity}
                    onChange={(value) => write({ concerns, issues, intensity: value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:row-span-2">
            <PlantWindow topPlant={topPlant} onChat={openSage} />
          </div>

          <div>
            <PrairieSageGuide
              open={sageOpen}
              onOpen={openSage}
              onClose={closeSage}
              plantSlug={topPlant?.plant.slug}
              plantName={topPlant?.plant.name}
            />
            <SafetyNote compact className="mt-4" />
          </div>
        </section>
      </div>

      <section className="guide-dirt px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="inline-block rounded-sm bg-white px-3 py-1 font-display text-lg text-[var(--ink)]">
            Also on this path
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {morePlants.length === 0 ? (
              <p className="max-w-sm text-sm font-light text-[rgba(243,235,221,0.8)]">
                Choose a concern and the rest of the path gathers here.
              </p>
            ) : (
              morePlants.map((item) => (
                <Link
                  key={item.plant.slug}
                  href={`/library/${item.plant.slug}`}
                  className="flex w-28 flex-col items-center text-center"
                >
                  <PlantPortrait
                    slug={item.plant.slug}
                    name={item.plant.name}
                    size="thumb"
                    className="h-24 w-24"
                  />
                  <span className="mt-2 text-sm text-[var(--gold)]">{item.plant.name}</span>
                </Link>
              ))
            )}
          </div>
          <p className="mt-16 font-condensed text-[0.78rem] uppercase tracking-[0.16em] text-[var(--gold)]">
            Subscribe
          </p>
        </div>
      </section>
    </>
  );
}
