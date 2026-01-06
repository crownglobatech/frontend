"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense } from "react";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!reference) {
      router.replace("/payments/error");
      return;
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const verifyPayment = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/customer/payments/verify/${reference}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Verification failed");
        const data = await res.json();
        if (data.payment_status === "success") {
          router.replace(`/payments/success?ref=${reference}&conversation_id=${data.conversation_id}`);
        } else {
          router.replace(`/payments/error?ref=${reference}`);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        router.replace("/payments/error");
      }
    };

    verifyPayment();
  }, [reference, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">Verifying payment</h2>
        <p className="text-sm text-muted-foreground">
          Please don’t close this page…
        </p>
      </div>
    </div>
  );
}

export default function PaymentCallback() {
  return (
    <Suspense fallback={<div>Verifying payment...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
