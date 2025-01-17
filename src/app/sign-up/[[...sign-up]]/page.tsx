import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text mb-2">
            VoiceAI
          </h1>
          <p className="text-gray-600">Your Mind, Immortalized</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <SignUp
            appearance={{
              layout: {
                logoPlacement: "none",
                socialButtonsVariant: "iconButton",
                socialButtonsPlacement: "bottom",
              },
              elements: {
                formButtonPrimary: "bg-teal-500 hover:bg-teal-600 text-white",
                card: "bg-white shadow-none p-8",
                footer: "hidden",
                formFieldInput:
                  "border border-gray-200 text-gray-900 focus:border-teal-500 focus:ring-teal-500",
                formFieldLabel: "text-gray-700",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-500",
                socialButtonsIconButton:
                  "border border-gray-200 hover:bg-gray-50",
                socialButtonsProviderIcon: "w-5 h-5",
                formFieldInputShowPasswordButton: "text-gray-500",
                headerTitle: "text-gray-900 font-bold",
                headerSubtitle: "text-gray-600",
                formFieldError: "text-red-500",
                formFieldSuccessText: "text-teal-500",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
