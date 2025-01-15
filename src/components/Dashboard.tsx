import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BsMicFill, BsGear, BsClock, BsFileText } from "react-icons/bs";
import Sidebar from "./Sidebar";
import DashboardLayout from "./DashboardLayout";

const conversationData = [
  { name: "Mon", conversations: 65 },
  { name: "Tue", conversations: 85 },
  { name: "Wed", conversations: 73 },
  { name: "Thu", conversations: 92 },
  { name: "Fri", conversations: 78 },
  { name: "Sat", conversations: 45 },
  { name: "Sun", conversations: 40 },
];

const Dashboard = () => {
  return (
    <DashboardLayout >
    <div className="min-h-screen bg-gray-50 p-6">
     
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            Voice AI
            <span className="bg-gradient-to-r from-violet-600 to-cyan-600 text-transparent bg-clip-text">
              {" "}
              Dashboard
            </span>
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage your AI voice assistant
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: BsMicFill,
              title: "Total Conversations",
              value: "1,234",
              color: "violet",
            },
            {
              icon: BsClock,
              title: "Avg. Response Time",
              value: "0.8s",
              color: "cyan",
            },
            {
              icon: BsFileText,
              title: "Messages Processed",
              value: "15,678",
              color: "violet",
            },
            {
              icon: BsGear,
              title: "Active Sessions",
              value: "42",
              color: "cyan",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg shadow-violet-500/5 border border-violet-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-sm">{stat.title}</div>
                  <div className="text-2xl font-bold mt-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-transparent bg-clip-text">
                    {stat.value}
                  </div>
                </div>
                <stat.icon className={`text-${stat.color}-500 text-2xl`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg shadow-violet-500/5 border border-violet-100"
          >
            <h2 className="text-xl font-semibold mb-4">
              Conversation Analytics
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="conversations"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg shadow-violet-500/5 border border-violet-100"
          >
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { time: "2 min ago", message: "New conversation started" },
                { time: "15 min ago", message: "Voice model updated" },
                {
                  time: "1 hour ago",
                  message: "System health check completed",
                },
                {
                  time: "2 hours ago",
                  message: "Backup completed successfully",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-violet-500"></div>
                  <div>
                    <p className="text-gray-700">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Dashboard;
