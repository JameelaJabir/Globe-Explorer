import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { useAuth } from "../context/AuthContext";

const CountryCard = ({ country }) => {
  const { currentUser } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/country/${country.cca3}`}>
        <div className="h-40 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          {country.flags.svg ? (
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">No flag available</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex justify-between items-start">
          <Link to={`/country/${country.cca3}`}>
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white hover:text-blue-500 transition-colors duration-200">
              {country.name.common}
            </h2>
          </Link>
          {currentUser && <FavoriteButton country={country} />}
        </div>

        <div className="mt-4">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Region:</span> {country.region}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Capital:</span>{" "}
            {country.capital ? country.capital[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
