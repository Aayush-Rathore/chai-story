import { useParams } from "react-router-dom";
import Home from "./Home.page";
import { useVerifyEmail } from "@/api/authFunction";
import { Error, Loading, Success } from "@/components/constants/Progress";
import { toast } from "@/components/ui/use-toast";

const Verification = () => {
  const { token } = useParams<{ token: string }>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: verificationData, isLoading, error } = useVerifyEmail(token);

  let component: React.ReactNode;
  if (isLoading) {
    component = <Loading />;
  } else if (error) {
    component = <Error />;
    toast({
      title: error.name,
      description: error.message,
    });
  } else if (verificationData) {
    component = <Success />;
    toast({
      title: verificationData.successCode,
      description: verificationData.successMessage,
    });
  }

  return (
    <div>
      {component}
      <Home />
    </div>
  );
};

export default Verification;
