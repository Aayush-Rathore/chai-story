import { useNavigate, useParams } from "react-router-dom";
import { useVerifyEmail } from "@/api/authFunction";
import Alert from "@/components/constants/Progress";
import { Button } from "@/components/ui/button";

const Verification = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const { data: verificationData, isLoading, error } = useVerifyEmail(token);

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      {isLoading ? (
        <Alert
          title="Loading"
          description="Wait! While we process your request!"
          type="pending"
        />
      ) : error ? (
        <Alert title={error.name} description={error.message} type="alert" />
      ) : (
        verificationData && (
          <>
            <Alert
              title={verificationData.successCode}
              description={verificationData.successMessage}
              type="success"
            />
            <Button onClick={() => navigate("/")}>Enjoy Exploring</Button>
          </>
        )
      )}
    </div>
  );
};

export default Verification;
