import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader, CheckCheck, ShieldX, CircleOff } from "lucide-react";

const Alerts = (props: {
  title: string;
  description: string;
  className?: string;
  type: "alert" | "success" | "pending";
}) => {
  let component: React.ReactNode;
  switch (props.type) {
    case "alert":
      component = <ShieldX className={`h-5 w-5 ${props.className}`} />;
      break;

    case "pending":
      component = <Loader className={`h-5 w-5 ${props.className}`} />;
      break;

    case "success":
      component = <CheckCheck className={`h-5 w-5 ${props.className}`} />;
      break;

    default:
      component = <CircleOff className={`h-5 w-5 ${props.className}`} />;
      break;
  }

  return (
    <Alert>
      {component}
      <AlertTitle>{props.title}</AlertTitle>
      <AlertDescription>{props.description}</AlertDescription>
    </Alert>
  );
};

export default Alerts;
