import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader, CheckCheck, ShieldX } from "lucide-react";

export const Loading = () => {
  return (
    <Alert>
      <Loader className="h-5 w-5 animate-spin" color="#e11d48" />
      <AlertTitle>Verifying...</AlertTitle>
      <AlertDescription>
        Please wait while we verify your email.
      </AlertDescription>
    </Alert>
  );
};

export const Error = () => (
  <Alert>
    <ShieldX className="h-5 w-5" color="#e11d48" />
    <AlertTitle>Verification Failed</AlertTitle>
    <AlertDescription>
      There was an error verifying your email. Please try again later.
    </AlertDescription>
  </Alert>
);

export const Success = () => (
  <Alert>
    <CheckCheck className="h-5 w-5" color="#e11d48" />
    <AlertTitle>Verification Successful</AlertTitle>
    <AlertDescription>
      Your email has been successfully verified. You can now access all
      features.
    </AlertDescription>
  </Alert>
);
