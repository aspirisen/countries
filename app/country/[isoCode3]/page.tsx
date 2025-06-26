import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { countriesDB } from "@/app/db/countries";
import { EMPTY_IMAGE_URL } from "@/app/consts";

interface CountryDetailPageProps {
  params: Promise<{
    isoCode3: string;
  }>;
}

export default async function CountryDetailPage({
  params,
}: CountryDetailPageProps) {
  const countries = await countriesDB.list();
  const { isoCode3 } = await params;
  const country = countries.find((c) => c.isoCode3 === isoCode3);

  if (!country) {
    notFound();
  }

  const flagSrc = country.flagUrl || EMPTY_IMAGE_URL;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ← Назад к списку стран
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-center">
            <div className="mb-6">
              <Image
                src={flagSrc}
                alt={`Флаг ${country.nameRu}`}
                width={120}
                height={84}
                className="mx-auto object-cover rounded-lg border-4 border-white shadow-lg"
                unoptimized
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {country.nameRu}
            </h1>
            <p className="text-xl text-blue-100">
              Подробная информация о стране
            </p>
          </div>

          <div className="px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Основная информация
                </h2>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-sm font-medium text-gray-600">
                        Название:
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        {country.nameRu}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-sm font-medium text-gray-600">
                        Код ISO (2 символа):
                      </span>
                      <span className="text-lg font-mono bg-blue-100 text-blue-800 px-3 py-1 rounded">
                        {country.isoCode2}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Код ISO (3 символа):
                      </span>
                      <span className="text-lg font-mono bg-green-100 text-green-800 px-3 py-1 rounded">
                        {country.isoCode3}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Государственный флаг
                </h2>

                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Image
                    src={flagSrc}
                    alt={`Флаг ${country.nameRu}`}
                    width={200}
                    height={140}
                    className="mx-auto object-cover rounded-lg border-2 border-gray-200 shadow-md"
                    unoptimized
                  />
                  <p className="mt-4 text-sm text-gray-600">
                    Официальный государственный флаг
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {country.isoCode2}
                </div>
                <p className="text-sm text-blue-800 font-medium">ISO Alpha-2</p>
                <p className="text-xs text-blue-600 mt-1">Двухбуквенный код</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {country.isoCode3}
                </div>
                <p className="text-sm text-green-800 font-medium">
                  ISO Alpha-3
                </p>
                <p className="text-xs text-green-600 mt-1">Трёхбуквенный код</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
