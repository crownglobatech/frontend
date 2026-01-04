"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

const GoToMailButton = ({ userEmail }: { userEmail: string | null }) => {
  const handleGoToMail = () => {
    if (!userEmail) {
      return;
    }

    const domain = userEmail.split("@")[1].toLowerCase();
    let mailUrl = "";

    switch (true) {
      case domain.includes("gmail"):
        mailUrl = "https://mail.google.com/";
        break;
      case domain.includes("yahoo"):
        mailUrl = "https://mail.yahoo.com/";
        break;
      case domain.includes("outlook") ||
        domain.includes("hotmail") ||
        domain.includes("live"):
        mailUrl = "https://outlook.live.com/mail/";
        break;
      case domain.includes("icloud"):
        mailUrl = "https://www.icloud.com/mail";
        break;
      default: // fallback to their domain
        mailUrl = "https://" + domain;
        break;
    }

    window.open(mailUrl, "_blank"); // opens in a new tab
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleGoToMail}
        className="flex items-center gap-2 bg-[var(--primary-color)] hover:opacity-90 px-6 py-2 rounded-md font-semibold text-white text-sm transition cursor-pointer"
      >
        Go to Mail
        <ArrowRight color="white" size={15} />
      </button>
    </div>
  );
};

export default GoToMailButton;
