import { Country } from "./types/country";

interface CountryApiResponse {
  flag_url: string;
  name_ru: string;
  iso_code2: string;
  iso_code3: string;
}

function transformCountry(apiCountry: CountryApiResponse): Country {
  return {
    flagUrl: apiCountry.flag_url,
    nameRu: apiCountry.name_ru,
    isoCode2: apiCountry.iso_code2,
    isoCode3: apiCountry.iso_code3,
  };
}

class CountriesDB {
  private countries: Country[] = [];
  private initialized: boolean = false;

  async list(): Promise<Country[]> {
    await this.initialize();
    return this.countries;
  }

  async remove(isoCode3: string): Promise<boolean> {
    await this.initialize();

    const initialLength = this.countries.length;

    this.countries = this.countries.filter(
      (country) => country.isoCode3 !== isoCode3
    );

    return this.countries.length < initialLength;
  }

  private async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json",
        { cache: "force-cache" }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch countries: ${response.status} ${response.statusText}`
        );
      }

      const apiData: CountryApiResponse[] = await response.json();
      this.countries = apiData.map(transformCountry);
      this.initialized = true;
    } catch (error) {
      console.error("Error initializing countries database:", error);
    }
  }
}

export const countriesDB = new CountriesDB();
