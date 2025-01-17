import { useEffect, useState } from "react";
import {
  RiPhoneLine,
  RiCloseLine,
  RiAlertLine,
  RiLockLine,
} from "react-icons/ri";
import { token } from "@/lib/constants";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

interface Country {
  name: {
    common: string;
  };
  idd: {
    root: string;
    suffixes?: string[];
  };
  flags: {
    png: string;
    svg: string;
  };
  cca2: string;
}

interface PhoneNumbersModalProps {
  showImportModal: boolean;
  setShowImportModal: (show: boolean) => void;
}

const PhoneNumbersModal: React.FC<PhoneNumbersModalProps> = ({
  showImportModal,
  setShowImportModal,
}) => {
  const [selectedProvider, setSelectedProvider] = useState("Twilio");
  const [fallbackCountryCode, setFallbackCountryCode] = useState("+1");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    accountSID: "",
    authToken: "",
    label: "",
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      provider: "twilio",
      name: formData.label,
      number: formData.phoneNumber,
      twilioAccountSid: formData.accountSID,
      twilioAuthToken: formData.authToken,
    };

    try {
      const response = await axios.post(
        "https://api.vapi.ai/phone-number",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.data) {
        console.log("Success:", response.data);
        toast.success("Phone number successfully added!");
        window.location.href = "/phone-settings";
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      // Check if it's a response error or a network error
      if (error.response && error.response.status === 403) {
        toast.error("Forbidden: Please check your token and try again.");
      } else {
        toast.error(
          error.response
            ? error.response.data
            : error.message || "Something went wrong"
        );
      }
    }
  };
  const getCountryCode = (country: Country) => {
    if (country.idd.root && country.idd.suffixes?.[0]) {
      return `${country.idd.root}${country.idd.suffixes[0]}`;
    }
    return country.idd.root || "";
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>(
          "https://restcountries.com/v3.1/all"
        );
        const filteredCountries = response.data
          .filter(
            (country: Country) => country.idd?.root && country.idd?.suffixes
          )
          .sort((a: Country, b: Country) =>
            a.name.common.localeCompare(b.name.common)
          );
        setCountries(filteredCountries);
      } catch (err) {
        console.error("Error fetching countries:", err);
        toast.error("Failed to load country codes");
      }
    };

    fetchCountries();
  }, []);
  return (
    <AnimatePresence>
      {showImportModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl w-[450px] p-8 shadow-2xl border border-gray-100"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                  <RiPhoneLine className="w-5 h-5 text-teal-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Import Phone Number
                </h2>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <RiCloseLine className="w-6 h-6" />
              </button>
            </div>

            {/* Provider Selection */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Select Provider
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedProvider("Twilio")}
                  className={`flex-1 py-3 rounded-xl transition-all ${
                    selectedProvider === "Twilio"
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20 ring-2 ring-teal-500 ring-offset-2"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Twilio
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    className="w-32 bg-white text-gray-900 rounded-xl px-4 py-3 border border-gray-200 hover:border-gray-300 transition-colors focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={fallbackCountryCode}
                    onChange={(e) => setFallbackCountryCode(e.target.value)}
                  >
                    {countries.map((country) => (
                      <option
                        key={country.cca2}
                        value={getCountryCode(country)}
                      >
                        {country.cca2} {getCountryCode(country)}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="flex-1 bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 hover:border-gray-300 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Account SID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="accountSID"
                    placeholder="Enter Twilio Account SID"
                    value={formData.accountSID}
                    onChange={handleChange}
                    className="w-full bg-gray-50 text-gray-900 pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 hover:border-gray-300 transition-colors"
                  />
                  <RiLockLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Auth Token
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="authToken"
                    placeholder="Enter Twilio Auth Token"
                    value={formData.authToken}
                    onChange={handleChange}
                    className="w-full bg-gray-50 text-gray-900 pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 hover:border-gray-300 transition-colors"
                  />
                  <RiLockLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Label
                </label>
                <input
                  type="text"
                  name="label"
                  placeholder="Enter a label for this number"
                  value={formData.label}
                  onChange={handleChange}
                  className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 hover:border-gray-300 transition-colors"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowImportModal(false)}
                className="flex-1 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`flex-1 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all font-medium shadow-lg shadow-teal-500/20 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Importing...</span>
                  </div>
                ) : (
                  "Import from Twilio"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhoneNumbersModal;
