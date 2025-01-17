import { token } from "@/lib/constants";

import { useEffect, useState } from "react";
import { FiPhone, FiUsers, FiCopy, FiTrash } from "react-icons/fi";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import {
  RiArrowRightLine,
  RiAddLine,
  RiAlertLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiPhoneLine,
} from "react-icons/ri";
import PhoneNumbersModal from "@/components/PhoneNumbersModal";
import DashboardLayout from "@/components/DashboardLayout";

interface PhoneNumber {
  id: string;
  name: string;
  provider: string;
  number: string;
}

interface Assistant {
  id: string;
  name: string;
}

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

const Sidebar: React.FC<{
  phoneNumbers: PhoneNumber[];
  onSelectPhone: (phone: PhoneNumber) => void;
  setShowImportModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ phoneNumbers, onSelectPhone, setShowImportModal }) => {
  return (
    <div className="w-full max-w-64 p-8 bg-gray-50 min-h-screen border-r border-black">
      <div className="mb-6">
        <button
          onClick={() => setShowImportModal(true)}
          className="w-full bg-teal-500 text-white px-5 py-3 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-all font-medium"
        >
          <RiAddLine className="mr-3" />
          <span className="font-semibold">Import Number</span>
        </button>
      </div>

      {/* <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <RiAlertLine className="w-5 h-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-amber-800 mb-1">
              Action Required
            </h3>
            <p className="text-sm text-amber-600">
              Please add Card Details to Buy a Number
            </p>
          </div>
        </div>
      </div> */}

      <div className="space-y-3">
        {phoneNumbers.map((phone) => (
          <PhoneNumberItem
            key={phone.id}
            number={phone.number}
            name={phone.name}
            isDuplicate={false}
          />
        ))}
      </div>
    </div>
  );
};

function PhoneNumberItem({
  number,
  name,
  isDuplicate = false,
}: {
  number: string;
  name: string;
  isDuplicate?: boolean;
}) {
  return (
    <div className="p-4 mb-2 bg-white rounded-lg border border-gray-100 transition-all hover:scale-[1.02] hover:bg-gray-50 flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center shadow-sm">
          <FiPhone className="text-teal-600 w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-800 font-medium text-sm group-hover:text-teal-600 transition-colors">
            {number}
          </span>
          <span className="text-gray-400 text-xs">{name}</span>
          {isDuplicate && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-1 inline-flex items-center w-fit">
              <RiAlertLine className="w-3 h-3 mr-1" />
              Duplicate
            </span>
          )}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <RiArrowRightLine className="w-4 h-4" />
      </motion.div>
    </div>
  );
}

const PhoneSettings: React.FC<{ selectedPhone: PhoneNumber }> = ({
  selectedPhone,
}) => {
  const [phoneDetails, setPhoneDetails] = useState<null | Record<string, any>>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInboundSettingsOpen, setIsInboundSettingsOpen] = useState(false);
  const [isOutboundFormOpen, setIsOutboundFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [selectedAssistantId, setSelectedAssistantId] = useState<string>("");
  const [fallbackNumber, setFallbackNumber] = useState("");
  const [outboundNumber, setOutboundNumber] = useState("");
  const [outboundAssistantId, setOutboundAssistantId] = useState("");
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [fallbackCountryCode, setFallbackCountryCode] = useState("+1");
  const [outboundCountryCode, setOutboundCountryCode] = useState("+1");
  const [countries, setCountries] = useState<Country[]>([]);
  const [twilioCredentials, setTwilioCredentials] = useState({
    accountSid: "",
    authToken: "",
    phoneNumber: "",
  });

  const handleDelete = async () => {
    if (!selectedPhone?.id) return;

    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://api.vapi.ai/phone-number/${selectedPhone.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error deleting phone number: ${response.statusText}`);
      }

      toast.success("Phone number deleted successfully!");
      setPhoneDetails(null);
    } catch (err: any) {
      alert("Failed to delete phone number: " + err.message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  useEffect(() => {
    if (!selectedPhone?.id) return;

    const fetchPhoneDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.vapi.ai/phone-number/${selectedPhone.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching phone details: ${response.statusText}`
          );
        }

        const data = await response.json();
        setPhoneDetails(data);
        setTwilioCredentials({
          accountSid: data.twilioAccountSid || "",
          authToken: data.twilioAuthToken || "",
          phoneNumber: selectedPhone.number,
        });
      } catch (err: any) {
        setError(err.message || "Failed to fetch phone details");
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneDetails();
  }, [selectedPhone]);

  useEffect(() => {
    const fetchAssistants = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://api.vapi.ai/assistant", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Response", response.data);
        if (Array.isArray(response.data)) {
          setAssistants(response.data);
        } else {
          setError("Invalid data structure");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch assistants");
      } finally {
        setLoading(false);
      }
    };

    fetchAssistants();
  }, []);

  const handleAssistantChange = async (assistantId: string) => {
    try {
      const response = await fetch(
        `https://api.vapi.ai/phone-number/${selectedPhone.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assistantId: assistantId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update phone number");
      }

      setSelectedAssistantId(assistantId);
      toast.success("Assistant updated successfully");
    } catch (err) {
      console.error("Error updating assistant:", err);
      toast.error("Failed to update assistant");
    }
  };

  const handleFallbackUpdate = async () => {
    try {
      const fullNumber = `${fallbackCountryCode}${fallbackNumber.trim()}`;
      const response = await fetch(
        `https://api.vapi.ai/phone-number/${selectedPhone.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fallbackDestination: fallbackNumber.trim()
              ? {
                  type: "number",
                  number: fullNumber,
                }
              : null,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update fallback");
      }

      toast.success("Fallback destination updated successfully");
    } catch (err) {
      console.error("Error updating fallback:", err);
      toast.error("Failed to update fallback destination");
    }
  };

  const handleOutboundCall = async () => {
    if (!outboundNumber.trim()) {
      toast.error("Please enter a phone number");
      return;
    }

    if (!outboundAssistantId) {
      toast.error("Please select an assistant");
      return;
    }

    setIsCallLoading(true);
    try {
      const fullNumber = `${outboundCountryCode}${outboundNumber.trim()}`;
      const response = await fetch("https://api.vapi.ai/call", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "outboundPhoneCall",
          assistantId: outboundAssistantId,
          phoneNumber: {
            twilioAccountSid: twilioCredentials.accountSid,
            twilioAuthToken: twilioCredentials.authToken,
            twilioPhoneNumber: twilioCredentials.phoneNumber,
          },
          customer: {
            number: fullNumber,
            numberE164CheckEnabled: true,
          },
        }),
      });

      const data = await response.json();

      if (data) {
        console.log(data.id);
        toast.success("Call initiated successfully!");
      } else {
        toast.error("Failed to initiate call - no ID returned");
      }
    } catch (err) {
      console.error("Error making outbound call:", err);
      toast.error("Failed to make call");
    } finally {
      setIsCallLoading(false);
    }
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

  const getCountryCode = (country: Country) => {
    if (country.idd.root && country.idd.suffixes?.[0]) {
      return `${country.idd.root}${country.idd.suffixes[0]}`;
    }
    return country.idd.root || "";
  };

  if (loading) {
    return (
      <div className="flex items-center mx-auto justify-center min-h-screen bg-gray-50 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl w-[400px] p-8 shadow-xl border border-gray-100"
        >
          {/* Loading Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute inset-0 rounded-full border-4 border-teal-500/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-t-teal-500 border-r-transparent border-b-transparent border-l-transparent"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 0.9, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <RiPhoneLine className="w-8 h-8 text-teal-500" />
              </motion.div>
            </div>
          </div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Setting Up Phone System
            </h3>
            <p className="text-gray-500 mb-6">
              Please wait while we configure your phone management...
            </p>

            {/* Loading Progress */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: "100%",
                  transition: { duration: 1.5, repeat: Infinity },
                }}
                className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
              />
            </div>

            {/* Loading Steps */}
            <div className="mt-6 flex justify-center gap-3">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                className="w-2 h-2 rounded-full bg-teal-500"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="w-2 h-2 rounded-full bg-teal-500"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                className="w-2 h-2 rounded-full bg-teal-500"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl border border-black shadow-sm max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <RiAlertLine className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading System
          </h3>
          <p className="text-sm text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center gap-2 font-medium"
          >
            <RiArrowRightLine className="w-5 h-5" />
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  const toggleInboundSettings = () => {
    setIsInboundSettingsOpen((prevState) => !prevState);
  };
  const toggleOutboundForm = () => {
    setIsOutboundFormOpen((prevState) => !prevState);
  };
  return (
    <div className="max-w-full p-10 w-full bg-gray-50">
      <div className="mb-8 bg-white rounded-xl border border-black p-6 shadow-sm">
        <div className="flex flex-row items-start w-full justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {selectedPhone.number}
            </h1>
            <p className="text-sm text-gray-500">{selectedPhone.name}</p>
          </div>
          <button
            onClick={handleDelete}
            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <code className="bg-gray-100 px-3 py-1.5 rounded-lg text-sm text-gray-600 font-mono border border-gray-200">
            {selectedPhone.id}
          </code>
          <button
            onClick={() => {
              navigator.clipboard
                .writeText(selectedPhone.id)
                .then(() => toast.success("ID copied to clipboard!"))
                .catch(() => toast.error("Failed to copy ID"));
            }}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            title="Copy ID"
          >
            <FiCopy size={16} />
          </button>
        </div>
      </div>

      <div className="mb-6 bg-white rounded-xl border border-black p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Inbound Settings
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          You can assign an assistant to the Phone number so that whenever
          someone calls this phone number, the assistant will automatically be
          assigned to the call.
        </p>
        <button
          onClick={toggleInboundSettings}
          className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
        >
          {isInboundSettingsOpen ? (
            <>
              <RiArrowUpSLine className="w-5 h-5" />
              Hide Inbound Settings
            </>
          ) : (
            <>
              <RiArrowDownSLine className="w-5 h-5" />
              Show Inbound Settings
            </>
          )}
        </button>

        {isInboundSettingsOpen && (
          <div className="space-y-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inbound Phone Number
              </label>
              <input
                type="text"
                value={selectedPhone.number}
                readOnly
                className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assistant
              </label>
              <select
                className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={selectedAssistantId}
                onChange={(e) => handleAssistantChange(e.target.value)}
              >
                <option value="">Select Assistant...</option>
                {assistants.map((assistant) => (
                  <option key={assistant.id} value={assistant.id}>
                    {assistant.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fallback Destination
              </label>
              <p className="text-sm text-gray-500 mb-4">
                Set a fallback destination for inbound calls when the assistant
                is not available.
              </p>
              <div className="flex gap-2">
                <div className="flex flex-1">
                  <select
                    className="w-32 bg-white text-gray-900 rounded-l-lg px-4 py-2.5 border border-r-0 border-gray-200"
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
                    placeholder="Enter a phone number"
                    value={fallbackNumber}
                    onChange={(e) => setFallbackNumber(e.target.value)}
                    className="flex-1 bg-white text-gray-900 rounded-r-lg px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleFallbackUpdate}
                  className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
                >
                  Save
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Format: +1234567890 (include country code)
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-black p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Outbound Form
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          You can assign an outbound phone number and assistant to make calls.
        </p>
        <button
          onClick={toggleOutboundForm}
          className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
        >
          {isOutboundFormOpen ? (
            <>
              <RiArrowUpSLine className="w-5 h-5" />
              Hide Outbound Form
            </>
          ) : (
            <>
              <RiArrowDownSLine className="w-5 h-5" />
              Show Outbound Form
            </>
          )}
        </button>

        {isOutboundFormOpen && (
          <div className="space-y-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Outbound Phone Number
              </label>
              <div className="flex gap-2">
                <select
                  className="w-32 bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200"
                  value={outboundCountryCode}
                  onChange={(e) => setOutboundCountryCode(e.target.value)}
                >
                  {countries.map((country) => (
                    <option key={country.cca2} value={getCountryCode(country)}>
                      {country.cca2} {getCountryCode(country)}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Enter a phone number"
                  value={outboundNumber}
                  onChange={(e) => setOutboundNumber(e.target.value)}
                  className="flex-1 bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assistant
              </label>
              <select
                className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={outboundAssistantId}
                onChange={(e) => setOutboundAssistantId(e.target.value)}
              >
                <option value="">Select Assistant...</option>
                {assistants.map((assistant) => (
                  <option key={assistant.id} value={assistant.id}>
                    {assistant.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleOutboundCall}
              disabled={isCallLoading}
              className={`w-full flex items-center justify-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium ${
                isCallLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isCallLoading ? (
                <span>Initiating call...</span>
              ) : (
                <>
                  <FiPhone className="w-5 h-5" />
                  Make Outbound Call
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl border border-black shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Delete Phone Number
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this phone number? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MainPhone: React.FC = () => {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhone, setSelectedPhone] = useState<PhoneNumber | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      try {
        const response = await axios.get("https://api.vapi.ai/phone-number", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPhoneNumbers(response.data as PhoneNumber[]);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPhoneNumbers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#38b2ac]/0 via-[#38b2ac] to-[#319795]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-black/30 backdrop-blur-xl rounded-3xl w-[400px] p-8 border border-white/10 shadow-2xl"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, #38b2ac 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, #319795 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 100%, #38b2ac 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 0%, #319795 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 0%, #38b2ac 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Loading Icon */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
                borderRadius: ["30%", "50%", "30%"],
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                borderRadius: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute inset-0 bg-gradient-to-r from-[#38b2ac] to-[#319795] opacity-30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-2xl border-4 border-t-[#38b2ac] border-r-[#319795] border-b-transparent border-l-transparent"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 0.8, 1],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <RiPhoneLine className="w-10 h-10 text-white" />
              </motion.div>
            </div>
          </div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center relative z-10"
          >
            <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-[#38b2ac] to-[#319795] bg-clip-text text-transparent">
              Loading Your Settings
            </h3>
            <p className="text-gray-400 mb-6 text-sm">
              Getting everything ready for you...
            </p>

            {/* Loading Progress */}
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{
                  x: "100%",
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-full w-1/3 bg-gradient-to-r from-[#38b2ac] to-[#319795] rounded-full"
              />
            </div>

            {/* Animated Dots */}
            <div className="mt-6 flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-[#38b2ac] to-[#319795]"
                />
              ))}
            </div>
          </motion.div>

          {/* Floating Elements */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-[#38b2ac] to-[#319795] opacity-20"
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10, 0],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <DashboardLayout>
      <main className="flex min-h-screen bg-gray-50">
        <Sidebar
          phoneNumbers={phoneNumbers}
          onSelectPhone={setSelectedPhone}
          setShowImportModal={setShowImportModal}
        />
        <div className="flex w-full">
          {selectedPhone ? (
            <PhoneSettings selectedPhone={selectedPhone} />
          ) : phoneNumbers.length > 0 ? (
            <PhoneSettings selectedPhone={phoneNumbers[0]} />
          ) : (
            <div className="flex items-center justify-center w-full p-8">
              <div className="bg-white p-8 rounded-xl border border-black shadow-sm max-w-md w-full text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RiArrowRightLine className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Select a Phone Number
                </h3>
                <p className="text-sm text-gray-500">
                  Choose a phone number from the sidebar to view its details.
                </p>
              </div>
            </div>
          )}
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        {showImportModal && (
          <PhoneNumbersModal
            showImportModal={showImportModal}
            setShowImportModal={setShowImportModal}
          />
        )}
      </main>
    </DashboardLayout>
  );
};

export default MainPhone;
