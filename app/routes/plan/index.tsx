"use client";
import { createFileRoute } from "@tanstack/react-router";
import { MapComponent } from "components/Map/Map";
import SearchInput from "components/Map/SearchInput";
import { SearchBoxSuggestion } from "@mapbox/search-js-core";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute } from "@fortawesome/free-solid-svg-icons";

export const Route = createFileRoute("/plan/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [origin, setOrigin] = useState<SearchBoxSuggestion | null>(null);

  return (
    <main className="flex flex-col h-screen w-screen">
      <section className="flex flex-row h-full w-screen">
        <section>
          {/* <SearchInput
        selectedSuggestion={origin}
        setSelectedSuggestion={setOrigin}
        /> */}
        </section>
        <section className="flex flex-col w-1/2 h-full"></section>
        <MapComponent size="fill" />
      </section>
    </main>
  );
}
