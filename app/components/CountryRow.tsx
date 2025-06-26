"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Country } from "@/app/db/types/country";
import { EMPTY_IMAGE_URL } from "@/app/consts";

interface CountryRowProps {
  country: Country;
  onRemove: (isoCode3: string) => Promise<void>;
}

export function CountryRow({ country, onRemove }: CountryRowProps) {
  const [imageSrc, setImageSrc] = useState(country.flagUrl || EMPTY_IMAGE_URL);

  async function handleRemove() {
    await onRemove(country.isoCode3);
  }

  function handleImageError() {
    setImageSrc(EMPTY_IMAGE_URL);
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <Image
        src={imageSrc}
        alt={`Флаг ${country.nameRu}`}
        width={40}
        height={28}
        className="object-cover rounded border flex-shrink-0"
        unoptimized
        onError={handleImageError}
      />
      <div className="flex-grow">
        <span className="text-lg font-medium text-gray-900">
          {country.nameRu}
        </span>
        <span className="ml-2 text-sm text-gray-500">({country.isoCode2})</span>
      </div>
      <div className="flex items-center space-x-2">
        <Link
          href={`/country/${country.isoCode3}`}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Подробнее
        </Link>
        <form action={handleRemove}>
          <button
            type="submit"
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Удалить
          </button>
        </form>
      </div>
    </div>
  );
}
