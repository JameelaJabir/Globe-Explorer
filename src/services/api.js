const BASE_URL = "/api/countries/v5";
const API_KEY = import.meta.env.VITE_COUNTRIES_API_KEY;

const getRequestOptions = () => ({
  headers: API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {},
});

// Convert v5 country object → v3.1-compatible shape used throughout the app
const toV3 = (c) => ({
  name: {
    common: c.names?.common || "",
    official: c.names?.official || "",
    nativeName: c.names?.native || {},
  },
  flags: {
    svg: c.flag?.url_svg || "",
    png: c.flag?.url_png || "",
    alt: c.flag?.description || "",
  },
  cca3: c.codes?.alpha_3 || c.uuid || "",
  population: c.population || 0,
  region: c.region || "",
  subregion: c.subregion || "",
  capital: (c.capitals || []).map((cap) => cap.name),
  area: c.area?.kilometers || 0,
  borders: c.borders || [],
  timezones: c.timezones || [],
  tld: c.tlds || [],
  continents: c.continents || [],
  landlocked: c.landlocked || false,
  currencies: (c.currencies || []).reduce((acc, curr) => {
    if (curr.code) acc[curr.code] = { name: curr.name, symbol: curr.symbol };
    return acc;
  }, {}),
  languages: (c.languages || []).reduce((acc, lang) => {
    if (lang.iso639_1) acc[lang.iso639_1] = lang.name;
    return acc;
  }, {}),
  uuid: c.uuid,
});

const parseObjects = async (response) => {
  const data = await response.json();
  const objects = data?.data?.objects;
  return Array.isArray(objects) ? objects.map(toV3) : [];
};

// Get all countries
export const getAllCountries = async () => {
  try {
    const response = await fetch(BASE_URL, getRequestOptions());
    if (!response.ok) throw new Error("Failed to fetch countries");
    return await parseObjects(response);
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

// Search countries by name
export const searchCountries = async (name) => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(name)}`,
      getRequestOptions()
    );
    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error("Failed to search countries");
    }
    return await parseObjects(response);
  } catch (error) {
    console.error("Error searching countries:", error);
    throw error;
  }
};

// Get countries by region
export const getCountriesByRegion = async (region) => {
  try {
    const response = await fetch(
      `${BASE_URL}?region=${encodeURIComponent(region)}`,
      getRequestOptions()
    );
    if (!response.ok) throw new Error("Failed to fetch countries by region");
    return await parseObjects(response);
  } catch (error) {
    console.error("Error fetching countries by region:", error);
    throw error;
  }
};

// Get country by code
export const getCountryByCode = async (code) => {
  try {
    const response = await fetch(
      `${BASE_URL}?alpha=${code}`,
      getRequestOptions()
    );
    if (!response.ok) throw new Error("Failed to fetch country details");
    return await parseObjects(response);
  } catch (error) {
    console.error("Error fetching country details:", error);
    throw error;
  }
};

// Get multiple countries by codes (for border countries)
export const getCountryBorders = async (codes) => {
  if (!codes || codes.length === 0) return [];
  try {
    const response = await fetch(
      `${BASE_URL}?alpha=${codes.join(",")}`,
      getRequestOptions()
    );
    if (!response.ok) throw new Error("Failed to fetch border countries");
    return await parseObjects(response);
  } catch (error) {
    console.error("Error fetching border countries:", error);
    throw error;
  }
};
