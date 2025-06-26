"use client";

import { useTransition, animated } from "@react-spring/web";
import { useEffect, useState } from "react";
import { Country } from "@/app/db/types/country";
import { CountryRow } from "./CountryRow";

interface CountriesListProps {
  countries: Country[];
  onRemove: (isoCode3: string) => Promise<void>;
}

export function CountriesList({ countries, onRemove }: CountriesListProps) {
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    setIsInitialMount(false);
  }, []);

  const transitions = useTransition(countries, {
    key: (country: Country) => country.isoCode3,
    from: {
      opacity: 1,
      height: 0,
      transform: "translateX(0px)",
    },
    enter: {
      opacity: 1,
      height: 80,
      transform: "translateX(0px)",
    },
    leave: {
      opacity: 0,
      height: 0,
      transform: "translateX(100px)",
    },
    config: {
      tension: 280,
      friction: 60,
    },
    immediate: isInitialMount,
  });

  return (
    <div>
      {transitions((style, country) => (
        <animated.div className="overflow-hidden" style={style}>
          <CountryRow country={country} onRemove={onRemove} />
        </animated.div>
      ))}
    </div>
  );
}
