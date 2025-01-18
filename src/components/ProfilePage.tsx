import React, { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiEdit2Line,
  RiSaveLine,
  RiDeleteBinLine,
  RiLockLine,
  RiMailLine,
  RiAlertLine,
  RiCloseLine,
  RiCheckLine,
  RiErrorWarningLine,
} from "react-icons/ri";
import DashboardLayout from "./DashboardLayout";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "success" | "error" | "warning";
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type,
}) => {
  const icons = {
    success: RiCheckLine,
    error: RiErrorWarningLine,
    warning: RiAlertLine,
  };

  const colors = {
    success: "bg-gradient-to-br from-teal-400 to-emerald-500 text-white",
    error: "bg-gradient-to-br from-red-400 to-rose-500 text-white",
    warning: "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
  };

  const emojis = {
    success: "🎉",
    error: "😅",
    warning: "👋",
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.6,
              },
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-96 left-[800px] -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/20"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                className={`w-12 h-12 rounded-2xl ${colors[type]} flex items-center justify-center shadow-lg`}
              >
                <span className="text-xl">{emojis[type]}</span>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {title}
                </h3>
                <p className="text-sm text-gray-500">{message}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <RiCloseLine className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete Account",
  cancelText = "Cancel",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.6,
              },
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-96 left-[800px] -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
          >
            <div className="flex items-start space-x-4">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-400 to-rose-500 flex-shrink-0 flex items-center justify-center shadow-lg"
              >
                <span className="text-xl">😢</span>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {message}
                </p>
                <div className="mt-6 flex items-center justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 bg-gray-100/80 hover:bg-gray-200/80 rounded-xl transition-colors backdrop-blur-sm"
                  >
                    {cancelText}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onConfirm}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-xl transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:from-red-600 hover:to-rose-700"
                  >
                    {confirmText}
                  </motion.button>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <RiCloseLine className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProfilePage = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [notification, setNotification] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "warning";
  }>({
    show: false,
    title: "",
    message: "",
    type: "success",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const showNotification = (
    title: string,
    message: string,
    type: "success" | "error" | "warning"
  ) => {
    setNotification({
      show: true,
      title,
      message,
      type,
    });
  };

  const handleUpdateEmail = async () => {
    if (!newEmail) {
      showNotification(
        "Email Required",
        "Please enter a new email address to continue.",
        "warning"
      );
      return;
    }

    try {
      setIsUpdatingEmail(true);
      await user?.createEmailAddress({ email: newEmail });
      showNotification(
        "Verification Email Sent",
        "Please check your inbox to verify your new email address.",
        "success"
      );
      setNewEmail("");
    } catch (error) {
      console.error("Error updating email:", error);
      showNotification(
        "Update Failed",
        "Failed to update email. Please try again.",
        "error"
      );
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await user?.delete();
      await signOut();
    } catch (error) {
      console.error("Error deleting account:", error);
      showNotification(
        "Delete Failed",
        "Failed to delete account. Please try again.",
        "error"
      );
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full bg-teal-600 flex items-center justify-center">
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={user?.firstName || "User"}
                      className="w-24 h-24 rounded-full"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {user?.firstName?.[0] ||
                        user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ||
                        "U"}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="text-gray-500">
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </p>
                  <p className="text-sm text-teal-600 font-medium mt-1">
                    Free Plan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Account Settings
              </h2>

              <div className="space-y-6">
                {/* Email Section */}
                <div className="flex flex-col p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                        <RiMailLine className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          Email Address
                        </h3>
                        <p className="text-sm text-gray-500">
                          Update your email address
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Enter new email address"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={handleUpdateEmail}
                      disabled={isUpdatingEmail || !newEmail}
                      className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdatingEmail ? "Updating..." : "Update Email"}
                    </button>
                  </div>
                </div>

                {/* Delete Account Section */}
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <RiDeleteBinLine className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Delete Account
                      </h3>
                      <p className="text-sm text-gray-500">
                        Permanently delete your account and all data
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? "Deleting..." : "Delete Account"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you absolutely sure you want to delete your account? This action cannot be undone and will permanently delete all your data, including assistants, phone numbers, and call logs."
        confirmText={isDeleting ? "Deleting..." : "Delete Account"}
        cancelText="Cancel"
      />

      <NotificationModal
        isOpen={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        title={notification.title}
        message={notification.message}
        type={notification.type}
      />
    </DashboardLayout>
  );
};

export default ProfilePage;
