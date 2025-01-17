"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { publictoken, token } from "../lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RiAddLine,
  RiPhoneLine,
  RiMoreLine,
  RiTimeLine,
  RiFileCopyLine,
  RiDeleteBinLine,
  RiQuestionLine,
  RiCheckLine,
  RiSearchLine,
  RiStarLine,
  RiArrowDownSLine,
  RiFolderLine,
  RiFileTextLine,
  RiCustomerService2Line,
  RiGamepadLine,
  RiCloseLine,
} from "react-icons/ri";
import Vapi from "@vapi-ai/web";
import SidebarAssistant from "./SidebarAssistant";
import DashboardLayout from "./DashboardLayout";
import "../styles/scrollbar.css";
import ActiveCallDetail from "./ui/ActiveCallDetail";
import ButtonVapi from "./ui/ButtonVapi";
import { Link } from "react-router-dom";

const usePublicKeyInvalid = () => {
  const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] =
    useState(false);

  useEffect(() => {
    if (showPublicKeyInvalidMessage) {
      setTimeout(() => {
        setShowPublicKeyInvalidMessage(false);
      }, 3000);
    }
  }, [showPublicKeyInvalidMessage]);

  return {
    showPublicKeyInvalidMessage,
    setShowPublicKeyInvalidMessage,
  };
};

const AssistantPage = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [provider2, setProvider2] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [addVoiceManually, setAddVoiceManually] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Model");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateAssistant, setShowCreateAssistant] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [assistantName, setAssistantName] = useState("");
  const [providerOpen, setProviderOpen] = useState(false);
  const [Providerid, setProviderid] = useState<string[]>([null]);
  const [assistants, setAssistants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  const [currentAssistant, setCurrentAssistant] = useState<any>(null);
  const [assistantId, setAssistantId] = useState("");
  const [modelfetcher, setmodelfetcher] = useState<any>(null);
  const [providerfetcher, setproviderfetcher] = useState<any>(null);
  const [ClientMessages, setClientMessages] = useState([
    "conversation-update",
    "model-output",
  ]);
  const [firstMessage, setFirstMessage] = useState(
    "Hello, how can I assist you today?"
  );
  const [systemMessage, setSystemMessage] = useState(
    "This is a blank template with minimal defaults, you can change the model, temperature, and messages."
  );
  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } =
    usePublicKeyInvalid();
  const [idLoading, setidLoading] = useState(false);
  const [assistantDetails, setAssistantDetails] = useState<any>(null);
  const vapi = new Vapi(publictoken);
  const [assistantCreated, setAssistantCreated] = useState(false);
  const [assistantDeleted, setAssistantDeleted] = useState(false);

  useEffect(() => {
    vapi.on("call-start", () => {
      setConnecting(false);
      setConnected(true);
      setShowPublicKeyInvalidMessage(false);
    });

    vapi.on("call-end", () => {
      setConnecting(false);
      setConnected(false);
      setShowPublicKeyInvalidMessage(false);
    });

    vapi.on("speech-start", () => {
      console.log("Speech started");
      setAssistantIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      console.log("Speech ended");
      setAssistantIsSpeaking(false);
    });

    vapi.on("volume-level", (level) => {
      console.log("Volume level:", level);
      setVolumeLevel(level);
    });

    vapi.on("error", (error) => {
      console.error(error);
      setConnecting(false);
    });
  }, []);

  const endCall = () => {
    try {
      vapi.stop();
      setConnected(false);
      setAssistantIsSpeaking(false);
      toast.success("Call ended successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error ending call:", error);
      toast.error("Failed to end the call");
    }
  };

  const startCallInline = () => {
    if (Providerid.includes(assistantId)) {
      setConnecting(true);
      vapi
        .start({
          name: `Hello my name is ${selectedAssistant.name}`,
          firstMessage: firstMessage,
          transcriber: {
            provider: "deepgram",
            model: "nova-2",
            language: "en-US",
          },
          model: {
            provider: "openai",
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: systemMessage,
              },
            ],
          },
          voice: {
            provider: "11labs",
            voiceId: "burt",
          },
        })
        .then(() => {
          setConnected(true);
          setConnecting(false);
          toast.success("Call started successfully");
        })
        .catch((error) => {
          console.error("Error starting call:", error);
          setConnecting(false);
        });
    } else {
      toast.error("Please publish the assistant to start the call");
    }
  };

  const fetchAssistants = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.vapi.ai/assistant", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (Array.isArray(response.data)) {
        setAssistants(response.data);
        // Automatically select the first assistant
        if (response.data.length > 0) {
          handleAssistantClick(response.data[0].id);
        }
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
  const fetchRecentFiles = async () => {
    try {
      const response = await axios.get("https://api.vapi.ai/file", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadedFiles(response.data as any[]);
    } catch (err) {
      console.error("Error fetching files:", err);
      setError("Failed to fetch recent files. Please try again.");
    }
  };

  useEffect(() => {
    fetchAssistants();
    fetchRecentFiles();
  }, []);

  useEffect(() => {
    if (assistantCreated || assistantDeleted) {
      fetchAssistants();
      setAssistantCreated(false);
      setAssistantDeleted(false);
    }
  }, [assistantCreated, assistantDeleted]);

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
  };

  const handleCreateAssistant = async () => {
    setLoading(true);
    const payload = {
      transcriber: {
        provider: "deepgram",
        language: "en",
      },
      name: assistantName,
      model: {
        model: "gpt-3.5-turbo",
        provider: "openai",
      },
      voice: {
        voiceId: " ",
        provider: "11labs",
      },
      firstMessage: firstMessage,
      firstMessageMode: "assistant-speaks-first",
      hipaaEnabled: false,
      clientMessages: ["conversation-update", "model-output"],
      serverMessages: ["conversation-update", "end-of-call-report"],
      silenceTimeoutSeconds: 30,
      maxDurationSeconds: 600,
      backgroundSound: "off",
      backgroundDenoisingEnabled: false,
      modelOutputInMessagesEnabled: false,
      transportConfigurations: [],
      voicemailDetection: {
        enabled: false,
        provider: "twilio",
      },
      voicemailMessage: "This is the voicemail message",
      endCallMessage: "Ending the call now.",
      metadata: {
        assistantName: assistantName,
        createdBy: "UserName",
      },
    };
    try {
    if (assistantName) {
      const response = await axios.post(
        "https://api.vapi.ai/assistant",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newAssistant = response.data; // Assuming the response contains the new assistant data

      // Prepend the new assistant to the list
      setAssistants((prevAssistants) => [newAssistant, ...prevAssistants]);

      // Optionally set the new assistant as the selected one
      setSelectedAssistant(newAssistant);

      setShowCreateAssistant(false);

      setSelectedTemplate("");
      setAssistantCreated(true);
      toast.success(`Assistant ${assistantName} created successfully`);
    } else {
      toast.error("Please enter the Assistant name");
    }
    } catch (error) {
      console.error("Error creating assistant:", error);
      toast.error("Failed to create assistant");
    } finally {
      setLoading(false);
    }
  };

  const handleAssistantClick = async (id: string) => {
    setidLoading(true);
    setAssistantDetails(true);
    try {
      interface AssistantDetails {
        model: string;
        provider: string;
        temperature: number;
        messages: any[];
      }

      const response = await axios.get<AssistantDetails>(
        `https://api.vapi.ai/assistant/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Assistant Details:", {
        model: response.data.model,
        provider: response.data.provider,
        temperature: response.data.temperature,
        messages: response.data.messages,
      });
      setmodelfetcher(response?.data?.model);
      setproviderfetcher(response?.data?.provider);

      setSelectedAssistant(response.data);
      setAssistantId(id);
      setidLoading(false);
      setAssistantDetails(false);
    } catch (error) {
      console.error("Error fetching assistant details:", error);
    }
  };

  const handleUpdateAssistant = async (key: string, value: any) => {
    console.log("Updating key:", key, "with value:", value);
    try {
      const currentAssistant = selectedAssistant
        ? { ...selectedAssistant }
        : {};

      // Update immediately for real-time UI feedback
      if (key === "model") {
        currentAssistant.model = {
          ...currentAssistant.model,
          model: value,
        };
        setmodelfetcher({ ...modelfetcher, model: value });
        setCurrentAssistant(currentAssistant);
      } else if (key === "provider") {
        currentAssistant.model = {
          ...currentAssistant.model,
          provider: value,
        };
        setproviderfetcher(value);
        setCurrentAssistant(currentAssistant);
      } else if (key === "voiceProvider") {
        // Update the voice provider in the current assistant
        currentAssistant.voice = {
          ...currentAssistant.voice,
          provider: value,
        };
        // Update the selected assistant state to reflect the change immediately
        setSelectedAssistant({
          ...selectedAssistant,
          voice: {
            ...selectedAssistant?.voice,
            provider: value,
          },
        });
      }

      const payload = {
        transcriber: {
          provider: "deepgram",
          language: "en-US",
        },
        name: assistantName,
        model: {
          model: currentAssistant.model?.model || "gpt-3.5-turbo",
          provider: currentAssistant.model?.provider || "azure-openai",
        },
        voice: {
          voiceId: currentAssistant.voice?.voiceId || "burt",
          provider:
            key === "voiceProvider"
              ? value
              : currentAssistant.voice?.provider || "11labs",
        },
        firstMessage: "Hello, how can I assist you today?",
        firstMessageMode: "assistant-speaks-first",
        hipaaEnabled: false,
        clientMessages: ["conversation-update", "model-output"],
        serverMessages: ["conversation-update", "end-of-call-report"],
        silenceTimeoutSeconds: 30,
        maxDurationSeconds: 600,
        backgroundSound: "off",
        backgroundDenoisingEnabled: false,
        modelOutputInMessagesEnabled: false,
        transportConfigurations: [],
        voicemailDetection: {
          enabled: false,
          provider: "twilio",
        },
        voicemailMessage: "This is the voicemail message",
        endCallMessage: "Ending the call now.",
        metadata: {
          assistantName: assistantName,
          createdBy: "UserName",
        },
      };

      // Make API call to update
      await axios.put(`https://api.vapi.ai/assistant/${assistantId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Update all relevant state after successful API call
      setSelectedAssistant(currentAssistant);
      setModelOpen(false);

      // Show success message
      toast.success("Voice provider updated successfully");
    } catch (error) {
      console.error("Error updating assistant details:", error);
      toast.error("Failed to update voice provider");
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(assistantId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000); // Reset after 2 seconds
  };

  const handleUpdateKnowledgeBase = async () => {
    try {
      const selectedFileIds = uploadedFiles
        .filter((f) => f.selected)
        .map((f) => f.id);

      const payload = {
        transcriber: {
          provider: "deepgram",
          language: "en",
        },
        name: assistantName,
        model: {
          model: modelfetcher?.model || "gpt-3.5-turbo",
          provider: providerfetcher || "azure-openai",
          knowledgeBase: {
            topK: 2,
            fileIds: selectedFileIds,
            provider: "canonical",
          },
        },
        voice: {
          voiceId: " ",
          provider: "11labs",
        },
        firstMessage: "Hello, how can I assist you today?",
        firstMessageMode: "assistant-speaks-first",
        hipaaEnabled: false,
        clientMessages: ["conversation-update", "model-output"],
        serverMessages: ["conversation-update", "end-of-call-report"],
        silenceTimeoutSeconds: 30,
        maxDurationSeconds: 600,
        backgroundSound: "off",
        backgroundDenoisingEnabled: false,
        modelOutputInMessagesEnabled: false,
        transportConfigurations: [],
        voicemailDetection: {
          enabled: false,
          provider: "twilio",
        },
        voicemailMessage: "This is the voicemail message",
        endCallMessage: "Ending the call now.",
        metadata: {
          assistantName: assistantName,
          createdBy: "UserName",
        },
      };

      const response = await axios.put<{ id: string[] }>(
        `https://api.vapi.ai/assistant/${assistantId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("responseUrl", response.data.id);
      setProviderid(response.data.id);
      setClientMessages(response.data.id);
      toast.success("Publish complete: Your AI assistant is live");
      // setClientMessages(response.data.clientMessages);
      console.log("Updated Knowledge Base with files:", selectedFileIds);
    } catch (error) {
      console.error("Error updating knowledge base:", error);
    }
  };

  const deleteAssistant = async (assistantId) => {
    try {
      await axios.delete(`https://api.vapi.ai/assistant/${assistantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Assistant deleted successfully");
      setAssistantDeleted(true);
    } catch (error) {
      console.error("Error deleting assistant:", error);
      toast.error("Failed to delete assistant");
    }
  };

  // Define a custom event
  const endCallEvent = new Event("endCall");

  // Listen for the custom event
  document.addEventListener("endCall", () => {
    vapi.stop();
    setConnected(false);
    setAssistantIsSpeaking(false);
    toast.success("Call ended successfully");
  });

  // Dispatch the custom event when needed
  const triggerEndCall = () => {
    document.dispatchEvent(endCallEvent);
  };

  const handleLogs = () => {
    window.location.href = "/call-logs";
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen  bg-white  text-gray-900 flex">
        <AnimatePresence>
          {showCreateAssistant && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setShowCreateAssistant(false)}
              />

              {/* Slide Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed left-0 top-0 border-black   border-r-2  h-full w-1/3 bg-white z-50 overflow-y-auto"
              >
                <div className="p-6 pb-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <RiAddLine className="w-5 h-5 text-teal-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Create Assistant
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Choose Template Section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Choose a template
                      </h3>
                      <p className="text-gray-500 text-sm mb-6">
                        Here's a few templates to get you started, or you can
                        create your own template and use it to create a new
                        assistant.
                      </p>

                      {/* Assistant Name */}
                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Assistant Name{" "}
                          <span className="text-amber-500 ml-1">
                            (This can be adjusted at any time after creation.)
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="test b1"
                          value={assistantName}
                          onChange={(e) => setAssistantName(e.target.value)}
                          className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400"
                        />
                      </div>

                       <div
                        className={`bg-white rounded-lg border ${
                          selectedTemplate === "blank"
                            ? "border-teal-500"
                            : "border-gray-200"
                        } p-4 cursor-pointer hover:bg-gray-50 transition-colors mb-6`}
                        onClick={() => handleTemplateSelect("blank")}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <RiAddLine className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <h4 className="text-gray-900 font-medium mb-1">
                              Blank Template
                            </h4>
                            <p className="text-gray-500 text-sm">
                              This blank slate template with minimal
                              configurations. It's a starting point for creating
                              your custom assistant.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fixed bottom-0 left-0 w-1/3 p-6 bg-white border-black   border-r-2  ">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => {
                          setAssistantName("");
                          setSelectedTemplate("");
                        }}
                        className="px-4 opacity-0 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Close
                      </button>
                      <button
                        onClick={handleCreateAssistant}
                        className={`px-6 py-2 bg-teal-500 text-white rounded-lg transition-colors font-medium ${
                          loading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-teal-600"
                        }`}
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin h-5 w-5 mr-3 text-white"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Creating...
                          </div>
                        ) : (
                          "Create Assistant"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="w-[320px] border-r border-gray-200 flex flex-col bg-gray-50">
          <SidebarAssistant
            showCreateAssistant={showCreateAssistant}
            setShowCreateAssistant={setShowCreateAssistant}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            assistants={assistants}
            handleAssistantClick={handleAssistantClick}
          />
        </div>

        <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="flex justify-between items-center px-6 py-4 border-b border-black bg-gay-50 shadow-md">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedAssistant?.name || "New Assistant"}
              </h1>
              <button className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors">
                <RiStarLine className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startCallInline}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-teal-600 transition-all font-medium shadow-lg"
              >
                <RiPhoneLine className="mr-2" />
                {!connected ? (
                  <ButtonVapi
                    label="Talk with Assistant"
                    onClick={startCallInline}
                    isLoading={connecting}
                  />
                ) : (
                  <ActiveCallDetail
                    assistantIsSpeaking={assistantIsSpeaking}
                    volumeLevel={volumeLevel}
                    onEndCallClick={endCall}
                  />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpdateKnowledgeBase}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-teal-600 transition-all font-medium shadow-lg"
              >
                <RiCheckLine className="mr-2" />
                Publish
              </motion.button>
              <div className="relative">
                <button
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <RiMoreLine className="w-5 h-5 text-gray-500" />
                </button>
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                    >
                      <button
                        onClick={handleLogs}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center"
                      >
                        <RiTimeLine className="mr-2 text-gray-400" />
                        Call Logs
                      </button>

                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center"
                        onClick={() => deleteAssistant(assistantId)}
                      >
                        <RiDeleteBinLine className="mr-2" />
                        Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex-1    p-6 bg-gray-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl  border-black shadow-md border   p-6 bg-white"
            >
              <div className="flex flex-row justify-between w-full">
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">
                    Model Configuration
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Configure the model settings for the assistant.
                  </p>
                </div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-gray-500">Assistant ID</span>
                  <div className="bg-gray-100 px-3 py-1.5 rounded-lg flex items-center border border-gray-200">
                    {assistantDetails ? (
                      <span className="text-sm text-gray-600 mr-2 font-mono">
                        Loading...
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600 mr-2 font-mono">
                        {assistantId || "8431b24b-03fc-4324-a05e-e0eb2fad65b7"}
                      </span>
                    )}
                    <motion.button
                      onClick={handleCopyId}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-gray-600 transition-colors relative"
                    >
                      {copiedId ? (
                        <RiCheckLine className="w-4 h-4 text-teal-500" />
                      ) : (
                        <RiFileCopyLine className="w-4 h-4" />
                      )}
                      {copiedId && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: -30 }}
                          exit={{ opacity: 0 }}
                          className="absolute left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded"
                        >
                          Copied!
                        </motion.div>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
              {idLoading ? (
                <div className="text-center py-4 text-gray-500">
                  Fetching Values...
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="h-1 bg-teal-500 mt-2"
                  />
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="pt-8"
                  >
                    <div className="grid grid-cols-12 gap-8">
                      <div className="col-span-8 space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="text-gray-700 font-medium">
                              First Message
                            </label>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="relative ml-2 cursor-help"
                            >
                              <RiQuestionLine className="text-gray-400 w-4 h-4" />
                            </motion.div>
                          </div>
                          <textarea
                            className="w-full h-32 bg-white text-gray-900 rounded-lg p-4 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none hover:border-gray-300 transition-colors"
                            placeholder="Enter first message"
                            onChange={(e) => setFirstMessage(e.target.value)}
                            value={firstMessage}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="text-gray-700 font-medium">
                              System Prompt
                            </label>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="relative ml-2 cursor-help"
                            >
                              <RiQuestionLine className="text-gray-400 w-4 h-4" />
                            </motion.div>
                          </div>
                          <textarea
                            className="w-full h-32 bg-white text-gray-900 rounded-lg p-4 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none hover:border-gray-300 transition-colors"
                            placeholder="Enter system prompt"
                            onChange={(e) => setSystemMessage(e.target.value)}
                            value={systemMessage}
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold mb-2 text-gray-900">
                            Voice Configuration
                          </h2>
                          <p className="text-gray-500 mb-6">
                            Choose from the list of voices, or sync your voice
                            library if you aren't able to find your voice in the
                            dropdown. If you are still facing any error, you can
                            enable custom voice and add a voice ID manually.
                          </p>

                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="block text-gray-700 font-medium">
                                  Provider
                                </label>
                                <div className="relative">
                                  <select
                                    className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 appearance-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer hover:border-gray-300 transition-colors"
                                    value={
                                      selectedAssistant?.voice?.provider || ""
                                    }
                                    onChange={(e) =>
                                      handleUpdateAssistant(
                                        "voiceProvider",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="11labs">11labs</option>
                                    <option value="azure">azure</option>
                                    <option value="cartesia">cartesia</option>

                                    <option value="deepgram">deepgram</option>
                                    <option value="lmnt">lmnt</option>
                                    <option value="neets">neets</option>
                                    <option value="openai">openai</option>
                                    <option value="playht">playht</option>
                                    <option value="rime-ai">rime-ai</option>
                                    <option value="smallest-ai">
                                      smallest-ai
                                    </option>
                                    <option value="tavus">tavus</option>
                                  </select>
                                  <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="block text-gray-700 font-medium">
                                  Voice
                                </label>
                                <div className="relative">
                                  <select
                                    className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 appearance-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer hover:border-gray-300 transition-colors"
                                    value={
                                      selectedAssistant?.voice?.voiceId || ""
                                    }
                                    onChange={(e) =>
                                      handleUpdateAssistant(
                                        "voiceId",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="burt">Burt</option>
                                    <option value="emma">Emma</option>
                                    <option value="john">John</option>
                                  </select>
                                  <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-4 space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="text-gray-700 font-medium">
                              Provider
                            </label>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="relative ml-2 cursor-help"
                            >
                              <RiQuestionLine className="text-gray-400 w-4 h-4" />
                            </motion.div>
                          </div>
                          <div className="relative">
                            <button
                              onClick={() => setProvider2(!provider2)}
                              className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none hover:border-gray-300 transition-colors flex items-center justify-between"
                            >
                              <span className="flex items-center">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                <span>
                                  {currentAssistant?.model?.provider ||
                                  selectedAssistant?.model?.provider
                                    ? selectedAssistant.model.provider
                                    : "open-ai"}
                                </span>
                              </span>
                              <RiArrowDownSLine
                                className={`transform transition-transform ${
                                  provider2 ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            <AnimatePresence>
                              {provider2 && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10 py-1 max-h-60 overflow-y-auto"
                                >
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant("provider", "vapi");
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <span>vapi</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "openai"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <span>openai</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "azure-openai"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    <span>azure-openai</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "together-ai"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    <span>together-ai</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "anyscale"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                    <span>anyscale</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "openrouter"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                    <span>openrouter</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "perplexity-ai"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                    <span>perplexity-ai</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "deepinfra"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                                    <span>deepinfra</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "custom-llm"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                                    <span>custom-llm</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "runpod"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                                    <span>runpod</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant("provider", "groq");
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                    <span>groq</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant("provider", "vapi");
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                                    <span>vapi</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "anthropic"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-lime-500 rounded-full mr-2"></span>
                                    <span>anthropic</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "google"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    <span>google</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant("provider", "xai");
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-violet-500 rounded-full mr-2"></span>
                                    <span>xai</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "inflection-ai"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
                                    <span>inflection-ai</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "cerebras"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                                    <span>cerebras</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "provider",
                                        "deep-seek"
                                      );
                                      setProvider2(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                                    <span>deep-seek</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="text-gray-700 font-medium">
                              Model
                            </label>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="relative ml-2 cursor-help"
                            >
                              <RiQuestionLine className="text-gray-400 w-4 h-4" />
                            </motion.div>
                          </div>
                          <div className="relative">
                            <button
                              onClick={() => setModelOpen(!modelOpen)}
                              className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none hover:border-gray-300 transition-colors flex items-center justify-between"
                            >
                              <span className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                <span>
                                  {modelfetcher?.model ||
                                    currentAssistant?.model?.model ||
                                    (selectedAssistant?.model?.model
                                      ? selectedAssistant.model.model
                                      : "gpt-3.5-turbo")}
                                </span>
                              </span>
                              <RiArrowDownSLine
                                className={`transform transition-transform ${
                                  modelOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            <AnimatePresence>
                              {modelOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10 py-1 max-h-60 overflow-y-auto"
                                >
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant("model", "gpt-4");
                                      setModelOpen(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <span>GPT-4</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "model",
                                        "gpt-4-turbo"
                                      );
                                      setModelOpen(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    <span>GPT-4 Turbo</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "model",
                                        "gpt-3.5-turbo"
                                      );
                                      setModelOpen(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    <span>GPT-3.5 Turbo</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "model",
                                        "gpt-4-0613"
                                      );
                                      setModelOpen(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                    <span>GPT-4 (0613)</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateAssistant(
                                        "model",
                                        "gpt-3.5-turbo-16k"
                                      );
                                      setModelOpen(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center"
                                  >
                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                    <span>GPT-3.5 Turbo 16k</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-gray-700 font-medium">
                            Knowledge Base
                          </label>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                            <div className="p-4 border-b border-gray-200 bg-white">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <RiFolderLine className="text-gray-400" />
                                  <span className="text-sm text-gray-700 font-medium">
                                    Selected Files
                                  </span>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() =>
                                    (window.location.href = "/files")
                                  }
                                  className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center bg-teal-50 px-3 py-1.5 rounded-md"
                                >
                                  <RiAddLine className="mr-1" />
                                  Add a new file
                                </motion.button>
                              </div>
                            </div>

                            {uploadedFiles.length === 0 ? (
                              <div className="p-8 flex flex-col items-center justify-center text-center bg-gray-50">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                                  <RiFileTextLine className="w-6 h-6 text-gray-400" />
                                </div>
                                <p className="text-gray-600 font-medium mb-2">
                                  No files selected
                                </p>
                                <p className="text-gray-500 text-sm mb-4">
                                  Select files to enhance your assistant's
                                  knowledge
                                </p>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() =>
                                    (window.location.href = "/files")
                                  }
                                  className="text-teal-600 hover:text-teal-700 text-sm font-medium bg-white px-4 py-2 rounded-md border border-gray-200 shadow-sm flex items-center"
                                >
                                  <RiSearchLine className="mr-2" />
                                  Browse files
                                </motion.button>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div className="relative mb-4">
                                  <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                  <input
                                    type="text"
                                    placeholder="Search files..."
                                    onChange={(e) => {
                                      const searchValue =
                                        e.target.value.toLowerCase();
                                      const filteredFiles =
                                        uploadedFiles.filter((file) =>
                                          file.name
                                            .toLowerCase()
                                            .includes(searchValue)
                                        );
                                      setUploadedFiles(filteredFiles);
                                    }}
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                  />
                                </div>

                                {uploadedFiles.map((file, index) => (
                                  <div
                                    key={file.id || index}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <input
                                        type="checkbox"
                                        id={`file-${file.id}`}
                                        className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
                                        onChange={(e) => {
                                          const isChecked = e.target.checked;
                                          setUploadedFiles((files) =>
                                            files.map((f) =>
                                              f.id === file.id
                                                ? { ...f, selected: isChecked }
                                                : f
                                            )
                                          );
                                          console.log(
                                            "selectedFileIds",
                                            uploadedFiles
                                              .filter((f) => f.selected)
                                              .map((f) => f.id)
                                          );
                                        }}
                                        checked={file.selected || false}
                                      />
                                      <RiFileTextLine className="w-5 h-5 text-teal-500" />
                                      <div>
                                        <p className="font-medium text-gray-900">
                                          {file.name.length > 20
                                            ? file.name.substring(0, 20) + "..."
                                            : file.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {new Date(
                                            file.createdAt
                                          ).toLocaleString()}
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                                      onClick={async () => {
                                        try {
                                          await axios.delete(
                                            `https://api.vapi.ai/file/${file.id}`,
                                            {
                                              headers: {
                                                Authorization: `Bearer ${token}`,
                                              },
                                            }
                                          );
                                          setUploadedFiles((files) =>
                                            files.filter(
                                              (f) => f.id !== file.id
                                            )
                                          );
                                        } catch (err) {
                                          console.error(
                                            "Error deleting file:",
                                            err
                                          );
                                          setError(
                                            "Failed to delete the file. Please try again."
                                          );
                                        }
                                      }}
                                    >
                                      <RiDeleteBinLine className="w-5 h-5" />
                                    </button>
                                  </div>
                                ))}
                                <div className="mt-4 p-4 bg-teal-50 rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-teal-700">
                                      Selected Files
                                    </span>
                                    <span className="text-sm text-teal-600">
                                      {
                                        uploadedFiles.filter((f) => f.selected)
                                          .length
                                      }{" "}
                                      files
                                    </span>
                                  </div>
                                  {uploadedFiles
                                    .filter((f) => f.selected)
                                    .map((file, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between py-2"
                                      >
                                        <div className="flex items-center">
                                          <RiFileTextLine className="w-4 h-4 text-teal-500 mr-2" />
                                          <span className="text-sm text-gray-700">
                                            {file.name}
                                          </span>
                                        </div>
                                        <button
                                          onClick={() => {
                                            setUploadedFiles((files) =>
                                              files.map((f) =>
                                                f.id === file.id
                                                  ? { ...f, selected: false }
                                                  : f
                                              )
                                            );
                                            const selectedFileIds =
                                              uploadedFiles
                                                .filter(
                                                  (f) =>
                                                    f.selected &&
                                                    f.id !== file.id
                                                )
                                                .map((f) => f.id);
                                            handleUpdateAssistant(
                                              "knowledgeBase",
                                              {
                                                fileIds: selectedFileIds,
                                                topK: 2,
                                                provider: "canonical",
                                              }
                                            );
                                          }}
                                          className="text-teal-600 hover:text-teal-700"
                                        >
                                          <RiCloseLine className="w-4 h-4" />
                                        </button>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="text-gray-700 font-medium">
                              Max Tokens
                            </label>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="relative ml-2 cursor-help"
                            >
                              <RiQuestionLine className="text-gray-400 w-4 h-4" />
                            </motion.div>
                          </div>
                          <input
                            type="number"
                            defaultValue="250"
                            className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:border-gray-300 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          </div>
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
      </div>
    </DashboardLayout>
  );
};

export default AssistantPage;
