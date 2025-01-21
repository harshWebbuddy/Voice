// src/components/SignUpPage.tsx
import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const SignUpPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-4">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          afterSignUpUrl="/assistant"
          appearance={{
            elements: {
              card: "bg-white shadow-lg rounded-lg p-6",
              formButtonPrimary:
                "bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded",
              headerTitle: "text-2xl font-bold mb-4",
              formFieldInput: "border border-gray-300 rounded-lg p-2 w-full",
            },
          }}
        />
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-teal-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
