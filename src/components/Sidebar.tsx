import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import {
  RiDashboardLine,
  RiTeamLine,
  RiPhoneLine,
  RiFileList2Line,
  RiVoiceprintLine,
  RiApps2Line,
  RiArrowDownSLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import "../styles/scrollbar.css";

interface MenuItem {
  label: string;
  icon: IconType;
  path?: string;
  children?: MenuItem[];
  badge?: number;
}

const menuItems: MenuItem[] = [
  { label: "Overview", icon: RiDashboardLine, path: "/dashboard" },
  {
    label: "Platform",
    icon: RiApps2Line,
    children: [
      { label: "Assistants", icon: RiTeamLine, path: "/assistants" },
      { label: "Phone Numbers", icon: RiPhoneLine, path: "/phone-numbers" },
      { label: "Files", icon: RiFileList2Line, path: "/files" },
      { label: "Call Logs", icon: RiPhoneLine, path: "/call-logs" },
    ],
  },
  { label: "Voice Library", icon: RiVoiceprintLine, path: "/voice-library" },
];

const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Platform"]);
  const location = useLocation();

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isPathActive = (path: string) => {
    if (!path) return false;
    return location.pathname.startsWith(path);
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.label);
    const isActive = isPathActive(item.path || "");
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.label} className="w-full">
        <Link
          to={item.path || "#"}
          className={`
            flex items-center px-4 py-2.5 my-0.5 rounded-lg cursor-pointer
            ${
              isActive
                ? "bg-teal-100 text-teal-600"
                : "text-gray-700 hover:bg-gray-100"
            }
            ${level > 0 ? "ml-4" : ""}
            transition-all duration-200
          `}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpand(item.label);
            }
          }}
        >
          <item.icon
            className={`w-5 h-5 mr-3 ${isActive ? "text-teal-600" : ""}`}
          />
          <span className="flex-1 text-sm font-medium">{item.label}</span>
          {item.badge && (
            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-teal-100 text-teal-600 rounded-full">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <RiArrowDownSLine
              className={`w-5 h-5 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          )}
        </Link>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-72 border-right-gradient  h-screen bg-white border-r-2 border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center border-b border-gray-200">
        <Link to="/" className="flex items-center">
          <RiArrowLeftSLine className="w-5 h-5 mr-2 text-gray-500" />
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full   bg-teal-600   flex items-center justify-center mr-3">
            <span className="text-sm font-medium text-white">S</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              sanskar@web...
            </div>
            <div className="text-xs text-gray-500">Free Plan</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-2">
        <div className="space-y-1">
          {menuItems.map((item) => renderMenuItem(item))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
