"use client";

import {
  SearchBoxCore,
  SearchBoxSuggestion,
  SessionToken,
} from "@mapbox/search-js-core";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const MapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const fetchSearchSuggestions = async (
  search: SearchBoxCore,
  sessionToken: SessionToken,
  searchTerm: string
) => {
  try {
    const results = await search.suggest(searchTerm, {
      sessionToken: sessionToken,
      limit: 5,
    });
    if (results) {
      return results.suggestions;
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

type searchLocation = "origin" | "destination" | "stop";

interface SearchInputProps {
  selectedSuggestion: SearchBoxSuggestion | null;
  searchType?: searchLocation;
  label?: string;
  setSelectedSuggestion: React.Dispatch<
    React.SetStateAction<SearchBoxSuggestion | null>
  >;
}

function SearchInput({
  className,
  selectedSuggestion,
  searchType,
  label,
  setSelectedSuggestion,
  ...props
}: React.ComponentProps<"input"> & SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<
    SearchBoxSuggestion[]
  >([]);
  const debounced = useDebounce(searchTerm, 300);

  const search = new SearchBoxCore({
    accessToken: MapboxAccessToken,
  });
  const sessionToken = new SessionToken();

  useEffect(() => {
    if (debounced) {
      fetchSearchSuggestions(search, sessionToken, debounced).then(
        (results) => {
          if (results) {
            setSearchSuggestions(results);
          }
        }
      );
    } else {
      setSearchSuggestions([]);
    }
  }, [debounced]);

  const renderLocationSelection = (searchType: searchLocation | undefined) => {
    switch (searchType) {
      case "origin":
        return "Enter starting location";
      case "destination":
        return "Enter Destination";
      case "stop":
        return "Enter Stop";
      default:
        return "Text";
    }
  };

  return (
    <Field>
      {label && <Label>{Label}</Label>}
      <Combobox
        value={selectedSuggestion}
        onChange={setSelectedSuggestion}
        onClose={() => setSearchSuggestions([])}
      >
        <ComboboxInput
          className="border border-gray-800 rounded-md p-2 w-full"
          placeholder={renderLocationSelection(searchType)}
          displayValue={(suggestion: SearchBoxSuggestion | null) =>
            suggestion ? suggestion.full_address : ""
          }
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <ComboboxOptions anchor="bottom" className="border">
          {searchSuggestions.map((suggestion) => (
            <ComboboxOption
              key={suggestion.mapbox_id}
              value={suggestion}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion.full_address}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}

export default SearchInput;
