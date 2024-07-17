import WhiteLogo from "@/assets/whiteLogo.svg";
import BlackLogo from "@/assets/blackLogo.svg";
import { Button } from "@/components/ui/button";
import hiteshSir from "@/assets/hiteshSir.png";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/constants/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="flex justify-center h-[50dvh] flex-col items-center gap-10 md:gap-16">
        <img
          src={BlackLogo}
          alt="Mine Story"
          className="w-64 sm:w-80 md:w-96 dark:hidden"
        />
        <img
          src={WhiteLogo}
          alt="Mine Story"
          className="w-64 sm:w-80 md:w-96 hidden dark:block"
        />
        <Button
          variant="default"
          className="w-60 h-12 font-bold text-base"
          onClick={() => navigate("stories")}
        >
          Start Reading
        </Button>
      </section>
      <Separator className="my-3" />
      <section>
        <h1 className="philosopher-bold text-4xl mb-10 text-center">
          Our Heros
        </h1>
        <div className="flex justify-center items-center flex-col gap-7 lg:flex-row">
          <img
            src={hiteshSir}
            alt="Hitesh Choudhary"
            className="w-10/12 sm:w-96"
          />
          <div className="max-w-[90%] md:max-w-[70%] lg:max-w-[40%]">
            <h1 className="text-2xl philosopher-bold my-2">Hitesh Choudhary</h1>
            <p className="my-1">
              Hitesh Choudhary, born in 1990 in Jaipur, Rajasthan, India, is a
              renowned Electronics Engineer and YouTuber. At the age of 34 as of
              2024, he has gained fame through his tech-focused YouTube channel,
              where millions of viewers have appreciated his software
              development-based videos.
            </p>
            <Separator className="my-3" />
            <div className="my-1 flex gap-8 items-center">
              <FaInstagram
                size={27}
                className="hover:text-[#e11d48] transition-all duration-500"
              />
              <FaYoutube
                size={27}
                className="hover:text-[#e11d47] transition-all duration-500"
              />
              <FaLinkedin
                size={27}
                className="hover:text-[#e11d48] transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>
      <Separator className="my-3" />
      <section className="flex items-center flex-col mb-4">
        <h1 className="philosopher-bold text-4xl mb-10 text-center">
          Support Us
        </h1>
        <p className="max-w-[90%] md:max-w-[70%] lg:max-w-[65%] text-center mb-10">
          Discover Mine Story, where stories shine! Join our community to
          explore captivating tales. With your support, we'll keep the magic
          alive. Together, let's create a world where every story finds its
          voice. Thank you for believing in us!
        </p>
        {/* <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="email"
            placeholder="Email"
            className="focus-visible:ring-0"
          />
          <Button type="submit">Subscribe</Button>
        </div> */}
      </section>
      <Footer />
    </div>
  );
};

export default Home;
