"use client";

import { Button } from "@/app/components/ui/Button";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormStatus {
  type: "success" | "error" | "";
  message: string;
}

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Message envoyé avec succès ! Je vous recontacterai rapidement.",
          {
            duration: 4000,
            position: "top-right",
          }
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error(data.error || "Erreur lors de l'envoi");
      }
    } catch (error) {
      toast.error(
        `Une erreur s'est produite lors de l'envoi du message : ${error}`,
        {
          duration: 4000,
          position: "top-right",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto lg:px-6 px-4 py-2 bg-common-1 rounded-lg border border-border">
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="lastName"
              className="block text-[16px] font-medium mb-1"
            >
              {t("lastName")} *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border border-border rounded-lg transition-all"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="block text-[16px] font-medium mb-1"
            >
              {t("firstName")} *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border border-border rounded-lg transition-all"
              placeholder="Votre nom"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-[16px] font-medium mb-1">
            {t("email")} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-2 py-1 border border-border rounded-lg transition-all"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-[16px] font-medium mb-1">
            {t("phone")}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-2 py-1 border border-border rounded-lg transition-all"
            placeholder="03 84 75 36 92"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-[16px] font-medium mb-1"
          >
            {t("message")} *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-2 py-1 border border-border rounded-lg transition-all resize-vertical"
            placeholder="Décrivez votre demande..."
          />
        </div>

        <div className="flex items-center justify-center">
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-3/6 py-1 px-4 rounded-lg font-medium text-white transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-offset-2"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
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
                {t("submitting")}
              </span>
            ) : (
              `${t("submit")}`
            )}
          </Button>
        </div>
        {status.message && (
          <div
            role="alert"
            className={`p-4 rounded-lg ${
              status.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <p className="text-[16px]">{status.message}</p>
          </div>
        )}
        <p className="sr-only">{t("srOnly")}</p>
      </form>
    </div>
  );
}
