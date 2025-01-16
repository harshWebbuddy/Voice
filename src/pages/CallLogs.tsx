"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiPhoneLine,
  RiTimeLine,
  RiMoneyDollarCircleLine,
  RiRobot2Line,
  RiCalendarLine,
  RiDownload2Line,
  RiFilter3Line,
  RiSearchLine,
  RiArrowDownSLine,
  RiCheckLine,
  RiCloseLine,
  RiErrorWarningLine,
  RiClipboardLine,
  RiBarChartBoxLine,
  RiFileChartLine,
  RiPieChartLine,
  RiRefreshLine,
  RiPlayCircleLine,
} from "react-icons/ri";
import { token } from "@/lib/constants";
import axios from "axios";
import DashboardLayout from "@/components/DashboardLayout";

interface CallLog {
  id: string;
  type: "Web" | "Phone";
  callId: string;
  cost: number;
  endReason: string;
  assistant: string | "No Assistant Assigned";
  phoneNumber: string;
  customer: string;
  requestStartedAt: string;
  requestDurationSeconds: string;
  status: "Completed" | "Failed" | "In Progress";
  recording?: boolean;
}

const CallLogs = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("Last 7 days");
  const [showFilters, setShowFilters] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [view, setView] = useState<"list" | "analytics">("list");
  const [Loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState<CallLog[]>([]);
  const [selectedCallType, setSelectedCallType] = useState("All Types");
  const [selectedDuration, setSelectedDuration] = useState("All Durations");
  console.log("response", showResponse);

  useEffect(() => {
    const fetchAssistants = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://api.vapi.ai/logs", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setShowResponse((response.data as { results: any }).results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssistants();
  }, []);

  const dateRangeOptions = [
    "Today",
    "Yesterday",
    "Last 7 days",
    "Last 30 days",
    "This month",
    "Last month",
    "Custom range",
  ];

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  console.log("response", showResponse);

  const getDurationInSeconds = (duration: string) => {
    if (typeof duration === "string") {
      return parseInt(duration.replace(/[^\d]/g, ""));
    }
    return duration;
  };

  const filteredLogs = showResponse?.filter((log) => {
    const searchLower = searchQuery.toLowerCase();
    const durationInSeconds = getDurationInSeconds(log?.requestDurationSeconds);

    // Call Type filtering
    if (selectedCallType !== "All Types" && log.type !== selectedCallType) {
      return false;
    }

    // Duration filtering
    switch (selectedDuration) {
      case "Under 30s":
        if (durationInSeconds >= 30) return false;
        break;
      case "30s - 2m":
        if (durationInSeconds < 30 || durationInSeconds > 120) return false;
        break;
      case "2m - 5m":
        if (durationInSeconds < 120 || durationInSeconds > 300) return false;
        break;
      case "Over 5m":
        if (durationInSeconds <= 300) return false;
        break;
    }

    // Search filtering
    return (
      log?.id?.toLowerCase().includes(searchLower) ||
      (log?.assistant && log.assistant.toLowerCase().includes(searchLower)) ||
      (log?.phoneNumber &&
        log.phoneNumber.toLowerCase().includes(searchLower)) ||
      (log?.callId && log.callId.toLowerCase().includes(searchLower))
    );
  });

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Call Logs
              </h1>
              <p className="text-gray-500 mt-1">
                Monitor and analyze your call history
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  setView((prev) => (prev === "list" ? "analytics" : "list"))
                }
                className={`px-4 py-2 rounded-lg border flex items-center space-x-2 transition-colors ${
                  view === "analytics"
                    ? "bg-violet-50 border-violet-200 text-violet-700"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {view === "list" ? (
                  <>
                    <RiBarChartBoxLine className="w-5 h-5" />
                    <span>View Analytics</span>
                  </>
                ) : (
                  <>
                    <RiFileChartLine className="w-5 h-5" />
                    <span>View Logs</span>
                  </>
                )}
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <RiDownload2Line className="w-5 h-5" />
                <span>Export</span>
              </button>
              <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <RiRefreshLine className="w-5 h-5" />
              </button>
            </div>
          </div>

           <div className="grid grid-cols-4 gap-6"></div>

          {view === "list" ? (
            <>
              {/* Filters Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <div className="flex-1 relative mb-4">
                    <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by call ID, assistant ID, or phone number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  {/* Date Range Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <RiCalendarLine className="w-5 h-5 text-gray-400" />
                      <span>{dateRange}</span>
                      <RiArrowDownSLine className="w-5 h-5 text-gray-400" />
                    </button>

                    <AnimatePresence>
                      {showDatePicker && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-gray-200 shadow-lg z-10"
                        >
                          {dateRangeOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setDateRange(option);
                                setShowDatePicker(false);
                              }}
                              className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                                dateRange === option
                                  ? "text-violet-600 bg-violet-50"
                                  : "text-gray-700"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Filter Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 border rounded-lg flex items-center space-x-2 ${
                      showFilters || selectedFilters.length > 0
                        ? "bg-violet-50 border-violet-200 text-violet-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    <RiFilter3Line className="w-5 h-5" />
                    <span>Filters</span>
                    {selectedFilters.length > 0 && (
                      <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full text-sm">
                        {selectedFilters.length}
                      </span>
                    )}
                  </button>
                </div>

                 <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="grid grid-cols-4 gap-4">
                        {/* Call Type */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Call Type
                          </label>
                          <select
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            value={selectedCallType}
                            onChange={(e) =>
                              setSelectedCallType(e.target.value)
                            }
                          >
                            <option value="All Types">All Types</option>
                            <option value="API">API</option>
                            <option value="Phone">Phone</option>
                          </select>
                        </div>

                        {/* Duration */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration
                          </label>
                          <select
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            value={selectedDuration}
                            onChange={(e) =>
                              setSelectedDuration(e.target.value)
                            }
                          >
                            <option value="All Durations">All Durations</option>
                            <option value="Under 30s">Under 30s</option>
                            <option value="30s - 2m">30s - 2m</option>
                            <option value="2m - 5m">2m - 5m</option>
                            <option value="Over 5m">Over 5m</option>
                          </select>
                        </div>

                        {/* Cost */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-9 gap-4 px-6 py-3 border-b border-gray-200 bg-gray-50">
                  <div className="col-span-1 text-sm font-medium text-gray-500">
                    Type
                  </div>
                  <div className="col-span-2 text-sm font-medium text-gray-500">
                    Call ID
                  </div>
                  <div className="col-span-1 text-sm font-medium text-gray-500">
                    Cost
                  </div>

                  <div className="col-span-2 text-sm font-medium text-gray-500">
                    Assistant
                  </div>
                  <div className="col-span-1 text-sm font-medium text-gray-500">
                    Phone Number
                  </div>
                  <div className="col-span-1 text-sm font-medium text-gray-500">
                    Start Time
                  </div>
                  <div className="col-span-1 text-sm font-medium text-gray-500">
                    Duration
                  </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                  {filteredLogs?.map((log) => (
                    <div
                      key={log.id}
                      className={`grid grid-cols-9 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${
                        selectedRows.includes(log.id) ? "bg-violet-50" : ""
                      }`}
                      onClick={() => toggleRowSelection(log.id)}
                    >
                      <div className="col-span-1 flex items-center">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {log.type === "Web" ? (
                            <RiRobot2Line className="w-4 h-4 mr-1" />
                          ) : (
                            <RiPhoneLine className="w-4 h-4 mr-1" />
                          )}
                          {log?.type}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center space-x-2">
                        <span className="text-sm text-gray-900 font-mono">
                          {log?.id}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(log.callId);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <RiClipboardLine className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="col-span-1 flex items-center text-sm text-gray-900">
                        <RiMoneyDollarCircleLine className="w-4 h-4 text-gray-400 mr-1" />
                        ${log?.cost?.toFixed(2) || "NA"}
                      </div>

                      <div className="col-span-2 flex items-center space-x-2">
                        {log.assistant === "No Assistant Assigned" ? (
                          <span className="text-sm text-gray-500">
                            {log?.assistant || "No Assistant Assigned"}
                          </span>
                        ) : (
                          <>
                            <span className="text-sm text-gray-900 font-mono">
                              {log?.assistant || "No Assistant Assigned"}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(log.assistant);
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <RiClipboardLine className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                      <div className="col-span-1 text-sm text-gray-900">
                        {log?.phoneNumber || "NA"}
                      </div>
                      <div className="col-span-1 text-sm text-gray-900">
                        {new Date(log?.requestStartedAt)?.toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )}
                      </div>
                      <div className="col-span-1 flex items-center text-sm text-gray-900">
                        <RiTimeLine className="w-4 h-4 text-gray-400 mr-1" />
                        {typeof log?.requestDurationSeconds === "string"
                          ? `${parseInt(
                              log.requestDurationSeconds.replace(/[^\d]/g, "")
                            )} seconds`
                          : log?.requestDurationSeconds}
                        s
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Analytics View
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Call Analytics
                </h2>
                <div className="flex items-center space-x-4">
                  <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>This month</option>
                    <option>Last month</option>
                  </select>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <RiRefreshLine className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Placeholder for charts */}
                <div className="aspect-[4/3] bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                  <RiBarChartBoxLine className="w-12 h-12 text-gray-300" />
                </div>
                <div className="aspect-[4/3] bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                  <RiPieChartLine className="w-12 h-12 text-gray-300" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CallLogs;
