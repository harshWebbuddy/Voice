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

const CallLogsLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-4 w-48 bg-gray-100 rounded-lg animate-pulse" />
          </motion.div>

          <div className="flex items-center space-x-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="h-10 w-28 bg-white rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Search and Filters Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-4"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-1 h-10 bg-gray-50 rounded-lg animate-pulse" />
            <div className="w-40 h-10 bg-gray-50 rounded-lg animate-pulse" />
            <div className="w-32 h-10 bg-gray-50 rounded-lg animate-pulse" />
          </div>
        </motion.div>

        {/* Table Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-9 gap-4 px-6 py-3 border-b border-gray-200 bg-gray-50">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="h-4 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>

          {/* Table Rows */}
          {[...Array(5)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-9 gap-4 px-6 py-4 border-b border-gray-100 relative overflow-hidden"
            >
              {[...Array(9)].map((_, colIndex) => (
                <motion.div
                  key={colIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (rowIndex * 9 + colIndex) * 0.01 }}
                  className="h-6 bg-gray-50 rounded animate-pulse"
                />
              ))}
              {/* Shimmer Effect */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                  opacity: [0, 0.1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: rowIndex * 0.2,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              />
            </div>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <div className="fixed bottom-8 right-8 bg-white p-4 rounded-xl shadow-lg border border-gray-200 w-80">
          <div className="space-y-2">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
            />
            <div className="flex justify-between items-center">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-teal-500 text-sm"
              >
                Loading call logs...
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

  const getDateRangeFilter = (dateRange: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (dateRange) {
      case "Today": {
        return today;
      }
      case "Yesterday": {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
      }
      case "Last 7 days": {
        const last7Days = new Date(today);
        last7Days.setDate(last7Days.getDate() - 7);
        return last7Days;
      }
      case "Last 30 days": {
        const last30Days = new Date(today);
        last30Days.setDate(last30Days.getDate() - 30);
        return last30Days;
      }
      case "This month": {
        return new Date(today.getFullYear(), today.getMonth(), 1);
      }
      case "Last month": {
        return new Date(today.getFullYear(), today.getMonth() - 1, 1);
      }
      default:
        return null;
    }
  };

  const filteredLogs = showResponse?.filter((log) => {
    const searchLower = searchQuery.toLowerCase();
    const durationInSeconds = getDurationInSeconds(log?.requestDurationSeconds);
    const logDate = new Date(log?.requestStartedAt);
    const dateRangeStart = getDateRangeFilter(dateRange);
    const now = new Date();

    // Date range filtering
    if (dateRangeStart) {
      // For "Today", check if the log date is from today
      if (dateRange === "Today") {
        const isToday =
          logDate.getDate() === now.getDate() &&
          logDate.getMonth() === now.getMonth() &&
          logDate.getFullYear() === now.getFullYear();
        if (!isToday) return false;
      }
      // For "Yesterday", check if the log date is from yesterday
      else if (dateRange === "Yesterday") {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const isYesterday =
          logDate.getDate() === yesterday.getDate() &&
          logDate.getMonth() === yesterday.getMonth() &&
          logDate.getFullYear() === yesterday.getFullYear();
        if (!isYesterday) return false;
      }
      // For "This month", check if the log is from the current month
      else if (dateRange === "This month") {
        const isThisMonth =
          logDate.getMonth() === now.getMonth() &&
          logDate.getFullYear() === now.getFullYear();
        if (!isThisMonth) return false;
      }
      // For "Last month", check if the log is from the previous month
      else if (dateRange === "Last month") {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const isLastMonth =
          logDate.getMonth() === lastMonth.getMonth() &&
          logDate.getFullYear() === lastMonth.getFullYear();
        if (!isLastMonth) return false;
      }
      // For other ranges (Last 7 days, Last 30 days)
      else if (logDate < dateRangeStart || logDate > now) {
        return false;
      }
    }

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

  // Show loader while loading
  if (Loading) {
    return <CallLogsLoader />;
  }

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
