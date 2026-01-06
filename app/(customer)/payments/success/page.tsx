"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const conversationId = searchParams.get("conversation_id");

    return (
        <Card className="w-full max-w-md text-center">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-600">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Thank you for your purchase. Your account has been upgraded.
                </p>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button asChild className="w-full">
                    <Link href={conversationId ? `/messages?conversationId=${conversationId}` : "/dashboard"}>
                        {conversationId ? "Return to Chat" : "Go to Dashboard"}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function PaymentSuccessPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-muted/50">
            <Suspense fallback={<div>Loading...</div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
