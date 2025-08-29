/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, X, Plus } from "lucide-react";
import z from "zod";

const emailValidator = z.string().email();

const formSchema = z.object({
  yourEmail: z.string().email("Valid email is required"),
  smtpPassword: z.string().min(1, "SMTP password is required"),
  emails: z.array(z.string().email()).min(1, "At least one email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

export function EmailComponent() {
  const [formData, setFormData] = useState<FormData>({
    yourEmail: "",
    smtpPassword: "",
    emails: [],
    subject: "",
    message: "",
  });
  
  const [emailInput, setEmailInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addEmail = () => {
    const email = emailInput.trim();
    const result = emailValidator.safeParse(email);
    if (result.success) {
      if (email && !formData.emails.find((r) => r === email)) {
        updateFormData('emails', [...formData.emails, email]);
        setEmailInput("");
      }
    } else {
      console.error("Invalid email:", email);
    }
  };

  const removeemail = (email: string) => {
    updateFormData('emails', formData.emails.filter((r) => r !== email));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail();
    }
  };

  const validateForm = () => {
    const result = formSchema.safeParse(formData);
    
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((error) => {
        if (error.path[0]) {
          errors[error.path[0] as string] = error.message;
        }
      });
      setFormErrors(errors);
      return false;
    }

    setFormErrors({});
    return true;
  };

  const handleSend = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSubmitMessage(null);
    
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          yourEmail: formData.yourEmail,
          smtpPassword: formData.smtpPassword,
          subject: formData.subject,
          emails: formData.emails,
          message: formData.message,
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSubmitMessage("Email sent successfully!");
        setFormData({
          yourEmail: "",
          smtpPassword: "",
          emails: [],
          subject: "",
          message: "",
        });
        setFormErrors({});
      } else {
        setErrorMessage(data.message || "Failed to send email");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to send email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full border border-gray-300 rounded-b-2xl md:rounded-b-none md:rounded-r-2xl p-5 bg-white">
      {submitMessage && (
        <div className="font-medium tracking-wider py-3 text-sm text-[#0b7e28] bg-green-50 border border-green-200 rounded p-3 mb-4">
          {submitMessage}
        </div>
      )}
      {errorMessage && (
        <div className="font-medium tracking-wider py-3 text-sm text-[#7E110B] bg-red-50 border border-red-200 rounded p-3 mb-4">
          {errorMessage}
        </div>
      )}

      <div className="space-y-6">
        {/* Your Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Your Email:
          </label>
          <Input
            type="email"
            placeholder="Enter your email address..."
            value={formData.yourEmail}
            onChange={(e) => updateFormData('yourEmail', e.target.value)}
            className="rounded-none"
          />
          {formErrors.yourEmail && (
            <p className="text-sm text-red-600">{formErrors.yourEmail}</p>
          )}
        </div>

        {/* SMTP Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            SMTP Password:
          </label>
          <Input
            type="password"
            placeholder="Enter your 16-character app password..."
            value={formData.smtpPassword}
            onChange={(e) => updateFormData('smtpPassword', e.target.value)}
            className="rounded-none"
          />
          {formErrors.smtpPassword && (
            <p className="text-sm text-red-600">{formErrors.smtpPassword}</p>
          )}
        </div>

        {/* emails */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">To:</label>

          {/* emails Display */}
          {formData.emails.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded">
              {formData.emails.map((email) => (
                <Badge
                  key={email}
                  variant="secondary"
                  className="cursor-pointer flex items-center gap-1 px-3 py-1 text-white bg-[#1A1A5D]"
                >
                  <span className="text-sm">{email}</span>
                  <button
                    onClick={() => removeemail(email)}
                    className="ml-1 hover:text-red-300 transition-colors cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* email Input */}
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter email email addresses..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 rounded-none"
            />
            <Button
              onClick={addEmail}
              variant="outline"
              size="icon"
              className="cursor-pointer border-gray-300 bg-transparent rounded-none"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formErrors.emails && (
            <p className="text-sm text-red-600">{formErrors.emails}</p>
          )}
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Subject:
          </label>
          <Input
            placeholder="Enter subject here..."
            value={formData.subject}
            onChange={(e) => updateFormData('subject', e.target.value)}
            className="rounded-none"
          />
          {formErrors.subject && (
            <p className="text-sm text-red-600">{formErrors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Message:
          </label>
          <Textarea
            placeholder="Type your message here..."
            value={formData.message}
            onChange={(e) => updateFormData('message', e.target.value)}
            className="min-h-[120px] rounded-none"
            rows={6}
          />
          {formErrors.message && (
            <p className="text-sm text-red-600">{formErrors.message}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 ">
          <div className="text-sm text-gray-500">
            {formData.emails.length > 0 && (
              <span>
                {formData.emails.length} email{formData.emails.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-[#1A1A5D] hover:bg-[#1A1A5D]/90 text-white min-w-[120px] rounded-none cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </div>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}