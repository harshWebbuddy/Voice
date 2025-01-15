import { token } from "@/lib/constants";

import { useEffect, useState } from "react";
import { FiPhone, FiUsers, FiCopy, FiTrash } from "react-icons/fi";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
}> = ({ phoneNumbers, onSelectPhone }) => {
  return (
    <div className="w-full max-w-64 p-8 bg-gray-900 h-screen   border-r border-gray-800">
      <div className="flex gap-2 mb-4">
      <button className="bg-teal-600 font-bold text-white px-3 w-full max-w-[100px] gap-2 items-center flex py-1.5 rounded text-sm hover:bg-teal-700 transition-all duration-200">
          Import
          <PlusIcon className="text-[5px] rounded-xl bg-teal-200" />
        </button>
      </div>
      <p className="text-yellow-500 text-xs mb-4">
        Please add Card Details to Buy a Number
      </p>
      <div className="space-y-3">
        {phoneNumbers.map((phone) => (
          <div
            key={phone.id}
            className="cursor-pointer hover:bg-gray-800 p-2 rounded transition-all duration-200"
            onClick={() => onSelectPhone(phone)}
          >
            <PhoneNumberItem number={phone.number} name={phone.name} />
          </div>
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
    <div className="p-2 hover:bg-gray-800 rounded cursor-pointer group transition-all duration-200">
      <div className="text-sm text-gray-300">{number}</div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">{name}</span>
        {isDuplicate && (
          <span className="text-[10px] text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded">
            Duplicate
          </span>
        )}
      </div>
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to initiate call");
      }

      toast.success("Call initiated successfully!");
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
      <p className="text-gray-400 text-center">Loading phone details...</p>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }
  const toggleInboundSettings = () => {
    setIsInboundSettingsOpen((prevState) => !prevState);
  };
  const toggleOutboundForm = () => {
    setIsOutboundFormOpen((prevState) => !prevState);
  };
  return (
    <div className="max-w-full p-10  w-full text-gray-200">
      <div className="mb-6">
        <div className="flex flex-row items-start w-full justify-between">
          <div className="mb-8">
            <h1 className="text-2xl mb-1">{selectedPhone.number}</h1>
            <p className="text-sm text-gray-400">{selectedPhone.name}</p>
          </div>
          <button
            onClick={handleDelete}
            className="top-2 right-2 text-red-500 hover:text-red-400"
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 2">
          <code className="bg-gray-800 px-2 py-1 rounded">
            {selectedPhone.id}
          </code>
          <button
            onClick={() => {
              navigator.clipboard
                .writeText(selectedPhone.id)
                .then(() => toast.success("ID copied to clipboard!"))
                .catch(() => toast.error("Failed to copy ID"));
            }}
            className="hover:text-gray-300 transition-colors"
            title="Copy ID"
          >
            <FiCopy />
          </button>
        </div>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
        <h2 className="text-xl mb-2">Inbound Settings</h2>
        <p className="text-sm text-gray-400 mb-6">
          You can assign an assistant to the Phone number so that whenever
          someone calls this phone number, the assistant will automatically be
          assigned to the call.
        </p>
        <button
          onClick={toggleInboundSettings}
          className="text-teal-400 hover:underline"
        >
          {isInboundSettingsOpen
            ? "Hide Inbound Settings"
            : "Show Inbound Settings"}
        </button>

        {isInboundSettingsOpen && (
          <div className="space-y-6 mt-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Inbound Phone Number
              </label>
              <input
                type="text"
                value={selectedPhone.number}
                readOnly
                className="bg-gray-900/70 w-full p-3 rounded border border-gray-700 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Assistant
              </label>
              <select
                className="bg-gray-900/70 w-full p-3 rounded border border-gray-700 focus:border-teal-500 focus:outline-none"
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
              <label className="text-sm text-gray-400 block mb-2">
                Fallback Destination
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Set a fallback destination for inbound calls when the assistant
                or squad is not available.
              </p>
              <div className="flex gap-2">
                <div className="flex flex-1">
                  <select
                    className="bg-gray-900/70 w-32 p-3 rounded-l border border-r-0 border-gray-700"
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
                    className="bg-gray-900/70 flex-1 p-3 rounded-r border border-gray-700 focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleFallbackUpdate}
                  className="bg-teal-600 px-4 rounded hover:bg-teal-700 transition-colors"
                >
                  Save
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Format: +1234567890 (include country code)
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6">
        <h2 className="text-xl mb-2">Outbound Form</h2>
        <p className="text-sm text-gray-400 mb-6">
          You can assign an outbound phone number and assistant to make calls.
        </p>
        <button
          onClick={toggleOutboundForm}
          className="text-teal-400 hover:underline"
        >
          {isOutboundFormOpen ? "Hide Outbound Form" : "Show Outbound Form"}
        </button>

        {isOutboundFormOpen && (
          <div className="space-y-6 mt-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Outbound Phone Number
              </label>
              <div className="flex">
                <select
                  className="bg-gray-900/70 w-32 p-3 rounded-l border border-r-0 border-gray-700"
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
                  className="bg-gray-900/70 flex-1 p-3 rounded-r border border-gray-700 focus:border-teal-500 focus:outline-none"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Format: +1234567890 (include country code)
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Assistant
              </label>
              <select
                className="bg-gray-900/70 w-full p-3 rounded border border-gray-700 focus:border-teal-500 focus:outline-none"
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
              className={`flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors w-full ${
                isCallLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isCallLoading ? (
                <span>Initiating call...</span>
              ) : (
                <>
                  <FiPhone />
                  Make Outbound Call
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-teal-500 p-6 text-black rounded shadow-lg">
            <p>Are you sure you want to delete this phone number?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <main className="flex min-h-screen bg-gray-900">
      <Sidebar phoneNumbers={phoneNumbers} onSelectPhone={setSelectedPhone} />
      <div className="flex w-full ">
        {selectedPhone ? (
          <PhoneSettings selectedPhone={selectedPhone} />
        ) : phoneNumbers.length > 0 ? (
          <PhoneSettings selectedPhone={phoneNumbers[0]} />
        ) : (
          <p className="text-gray-500 p-4">No phone numbers available</p>
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
    </main>
  );
};

export default MainPhone;
