import { countriesDB } from "./db/countries";
import { CountriesList } from "./components/CountriesList";
import { removeCountry } from "./actions/countries";

export default async function Home() {
  const countries = await countriesDB.list();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Список стран мира
          </h1>
        </div>

        <CountriesList countries={countries} onRemove={removeCountry} />
      </div>
    </main>
  );
}
