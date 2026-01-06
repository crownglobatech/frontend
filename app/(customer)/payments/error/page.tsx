"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentErrorPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-muted/50">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <XCircle className="h-12 w-12 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-destructive">Payment Failed</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        We couldn't process your payment. Please try again or contact support if the problem persists.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center gap-2">
                    <Button asChild variant="outline">
                        <Link href="/messages">Try Again</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
