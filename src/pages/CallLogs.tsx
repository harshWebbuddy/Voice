"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiPhoneLine,
  RiTimeLine,
  RiMoneyDollarCircleLine,
  RiUserLine,
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
  RiEyeLine,
  RiSettings4Line,
} from "react-icons/ri";
import { token } from "@/lib/token";
import axios from "axios";

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
  console.log("response", showResponse);
  const mockLogs: CallLog[] = [
    {
      id: "1",
      type: "Web",
      callId: "239c3584-4cdc-475b-95a8-2486b7673d6f",
      cost: 0.04,
      endReason: "Customer Ended Call",
      assistant: "2a445927-27b8-4b34-aca8-5fff87e87524",
      phoneNumber: "N/A",
      customer: "N/A",
      requestStartedAt: "Dec 21, 2024, 8:31 AM",
      requestDurationSeconds: "25s",
      status: "Completed",
      recording: true,
    },
    {
      id: "2",
      type: "Web",
      callId: "12fa208e-4369-4f48-a2cb-94a34db87844",
      cost: 0.02,
      endReason: "Customer Ended Call",
      assistant: "fdac2db1-93a8-4d22-bd7b-c5be7747c86f",
      phoneNumber: "N/A",
      customer: "N/A",
      requestStartedAt: "Dec 21, 2024, 4:59 AM",
      requestDurationSeconds: "19s",
      status: "Completed",
      recording: true,
    },
    {
      id: "3",
      type: "Web",
      callId: "9e8d2bc6-fb22-47e7-ab6b-466df811fcb5",
      cost: 0.07,
      endReason: "No Microphone Permission",
      assistant: "No Assistant Assigned",
      phoneNumber: "N/A",
      customer: "N/A",
      requestStartedAt: "Dec 19, 2024, 10:24 AM",
      requestDurationSeconds: "50s",
      status: "Failed",
    },
    {
      id: "4",
      type: "Phone",
      callId: "7871ff6c-d3e1-47d8-a8c5-6f19be1d68d4",
      cost: 0.12,
      endReason: "Customer Ended Call",
      assistant: "No Assistant Assigned",
      phoneNumber: "+1 (555) 123-4567",
      customer: "John Doe",
      requestStartedAt: "Dec 19, 2024, 10:03 AM",
      requestDurationSeconds: "1m 16s",
      status: "Completed",
      recording: true,
    },
    {
      id: "5",
      type: "Web",
      callId: "e8598eb6-8f94-4915-ad83-ea755ca8f5ea",
      cost: 0.0,
      endReason: "No Microphone Permission",
      assistant: "No Assistant Assigned",
      phoneNumber: "N/A",
      customer: "N/A",
      requestStartedAt: "Dec 19, 2024, 10:03 AM",
      requestDurationSeconds: "0s",
      status: "Failed",
    },
  ];
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
        // setError("Failed to fetch assistants");
      } finally {
        setLoading(false);
      }
    };
    fetchAssistants();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <RiCheckLine className="w-4 h-4" />;
      case "Failed":
        return <RiErrorWarningLine className="w-4 h-4" />;
      case "In Progress":
        return <RiPlayCircleLine className="w-4 h-4" />;
      default:
        return <RiCloseLine className="w-4 h-4" />;
    }
  };

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

  const stats = [
    {
      label: "Total Calls",
      value: "1,234",
      change: "+12.3%",
      icon: RiPhoneLine,
      color: "text-violet-600",
      bg: "bg-violet-100",
    },
    {
      label: "Success Rate",
      value: "94.2%",
      change: "+5.4%",
      icon: RiCheckLine,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Avg. Duration",
      value: "2m 15s",
      change: "-0.5%",
      icon: RiTimeLine,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Total Cost",
      value: "$123.45",
      change: "+8.7%",
      icon: RiMoneyDollarCircleLine,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
  ];
  console.log("response", showResponse);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Call Logs</h1>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {view === "list" ? (
          <>
            {/* Filters Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="flex-1 relative">
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

              {/* Expanded Filters */}
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
                        <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                          <option>All Types</option>
                          <option>Web</option>
                          <option>Phone</option>
                        </select>
                      </div>

                      {/* Status */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                          <option>All Statuses</option>
                          <option>Completed</option>
                          <option>Failed</option>
                          <option>In Progress</option>
                        </select>
                      </div>

                      {/* Duration */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration
                        </label>
                        <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                          <option> </option>
                          <option>Under 30s</option>
                          <option>30s - 2m</option>
                          <option>2m - 5m</option>
                          <option>Over 5m</option>
                        </select>
                      </div>

                      {/* Cost */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cost
                        </label>
                        <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                          <option>Any Cost</option>
                          <option>Under $0.05</option>
                          <option>$0.05 - $0.25</option>
                          <option>Over $0.25</option>
                        </select>
                      </div>
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
                {showResponse?.map((log) => {
                  console.log("log", log);
                  return (
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
                          ? `${parseInt(log.requestDurationSeconds.replace(/[^\d]/g, ''))} seconds`
                          : log?.requestDurationSeconds}
                      </div>
                    
                    </div>
                  );
                })}
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
  );
};

export default CallLogs;
