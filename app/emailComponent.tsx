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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailComponent() {
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addRecipient = () => {
    const email = emailInput.trim();
    if (emailRegex.test(email)) {
      if (emailInput.trim() && !emails.find((r) => r === emailInput.trim())) {
        setEmails([...emails, emailInput]);
        setEmailInput("");
      }
    } else {
      console.error("Invalid email:", emailInput);
    }
  };

  const removeRecipient = (email: string) => {
    setEmails(emails.filter((r) => r !== email));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addRecipient();
    }
  };

  const handleSend = async () => {
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
          subject: subject,
          emails: emails,
          message: message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitMessage(
          "Message submitted successfully! I will get back to you within 24 hours."
        );
        setEmails([]);
        setSubject("");
        setMessage("");
      } else {
        setErrorMessage(data.message || "Failed to submit message");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to submit message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  border-1 border-gray-300 rounded-none p-5">
      <div className="pb-4">
        <div className="text-3xl font-semibold text-div-foreground flex items-center gap-3">
          <Send fill="black" color="black" className="h-5 w-5 text-accent" />
          Email Messaging System
        </div>
      </div>

      {submitMessage && (
        <div
          className={`font-medium tracking-wider py-3  text-sm  text-[#0b7e28] `}
        >
          {submitMessage}
        </div>
      )}
      {errorMessage && (
        <div
          className={`font-medium tracking-wider py-3  text-sm  text-[#7E110B] `}
        >
          {errorMessage}
        </div>
      )}

      <div className="space-y-6">
        {/* Recipients Section */}
        <div className="space-y-5">
          <label className="text-sm font-medium text-div-foreground">To:</label>

          {/* Recipients Display */}
          {emails.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-none my-3">
              {emails.map((email) => (
                <Badge
                  key={email}
                  variant="secondary"
                  className="cursor-pointer flex items-center gap-1 px-3 py-1 text-white bg-black"
                >
                  <span className="text-sm">{email}</span>
                  <button
                    onClick={() => removeRecipient(email)}
                    className="ml-1 hover:text-destructive transition-colors cursor-pointer "
                  >
                    <X fill="white" className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Recipient Input */}
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Enter email addresses..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 rounded-none "
            />
            <Button
              onClick={addRecipient}
              variant="outline"
              size="icon"
              className="cursor-pointer border-border  bg-transparent rounded-none"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Subject Section */}
        <div className="space-y-2 mt-2">
          <label className="text-sm font-medium text-div-foreground">
            Subject:
          </label>
          <Input
            placeholder="Enter subject here..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-none mt-2"
          />
        </div>

        {/* Message Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-div-foreground">
              Message:
            </label>
          </div>

          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px] mt-2 rounded-none"
            rows={8}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            {emails.length > 0 && (
              <span>
                {emails.length} recipient
                {emails.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleSend}
              disabled={
                isLoading ||
                emails.length === 0 ||
                !subject.trim() ||
                !message.trim()
              }
              className="bg-[#01575C] text-primary-foreground min-w-[100px] rounded-none cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-none " />
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
    </div>
  );
}
