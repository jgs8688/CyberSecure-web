import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
import Footer from "../components/Footer";
 import logo from "../../public/assets/Logo.svg"

const testimonials = [
  {
    quote:
      "CyberCage-web transformed how our team manages security — fast alerts and clear reports keep us ahead of threats.”",
    name: "Nandan R.",
    role: "IT Security Manager",
  },
  {
    quote:
      "“The intuitive interface and powerful scans make CyberCage-web essential for our cybersecurity strategy.”",
    name: "Daniel K.",
    role: "Chief Technology Officer",
  },
  {
    quote:
      "“Reduced vulnerabilities drastically since adopting CyberCage-web. Highly recommend for any serious organization.”",
    name: "Samantha R.",
    role: "Security Analyst",
  },
];

const features = [
  {
    title: "Comprehensive Multi-Platform Scans",
    description:
      "Cover web, mobile, and cloud with powerful scanning designed for modern environments.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-[#3b82f6]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Instant Threat Alerts",
    description:
      "Get notified immediately when any risk is detected to act quickly and prevent damage.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-[#3b82f6]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m8-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Clear, Actionable Reports",
    description:
      "Understand your security posture with easy-to-read reports that help prioritize fixes.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-[#3b82f6]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h4m-4-8h4m2-1h1a1 1 0 011 1v12a1 1 0 01-1 1h-1m-4 0H7a1 1 0 01-1-1v-5"
        />
      </svg>
    ),
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Start fade-in animation on mount
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Carousel auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        className={`relative min-h-screen w-full bg-[#0f1115] text-white flex flex-col items-center justify-between py-12 px-6 md:px-16 overflow-hidden transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Background faded circles */}
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-[#2563eb] rounded-full opacity-20 filter blur-3xl animate-pulse" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-600 rounded-full opacity-15 filter blur-3xl animate-pulse animation-delay-2000" />

        {/* Logo and headline */}
        <header
          className={`z-10 flex flex-col items-center space-y-6 max-w-4xl text-center transition-transform duration-900 ease-out ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <img
            src={logo}
            alt="CyberCage-web Logo"
            className="w-36 h-36 object-contain drop-shadow-xl"
          />
          <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-md leading-tight">
            CyberCage-web
          </h1>
          <p className="text-[#a1a1aa] text-2xl font-semibold max-w-3xl leading-relaxed">
            The Friendlier Vulnerability & Malware Scanner — Real-time
            detection, simple reports, and complete peace of mind.
          </p>
          <button
            className="mt-6 rounded-full  bg-[#3b82f6] px-20 py-5 font-semibold text-gray-900 text-2xl shadow-lg transition-colors  hover:bg-[#2563eb] cursor-pointer focus:outline-none focus:ring-4 focus:ring-cyan-400"
            onClick={() => navigate("/signin")}
            aria-label="Sign in to CyberCage-web"
          >
            Get Started - Sign In
          </button>
        </header>

        {/* Features */}
        <section
          className={`z-10 mt-16 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12 transition-transform duration-900 ease-out delay-200 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {features.map(({ title, description, icon }) => (
            <FeatureCard
              key={title}
              icon={icon}
              title={title}
              description={description}
            />
          ))}
        </section>

        {/* Testimonials */}
        <section
          className={`z-10 mt-20 w-full max-w-3xl bg-[#1c1f26] bg-opacity-70 rounded-3xl p-10 shadow-xl backdrop-blur-md select-none relative transition-transform duration-900 ease-out delay-400 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <blockquote className="text-center text-xl italic  leading-relaxed min-h-[120px]">
            {testimonials[currentTestimonial].quote}
          </blockquote>
          <figcaption className="mt-6 text-center text-[#3b82f6] font-semibold text-lg">
            — {testimonials[currentTestimonial].name},{" "}
            <span className="text-white font-normal">
              {testimonials[currentTestimonial].role}
            </span>
          </figcaption>
          {/* Carousel indicators */}
          <div className="flex justify-center mt-8 space-x-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                aria-label={`View testimonial ${idx + 1}`}
                onClick={() => setCurrentTestimonial(idx)}
                className={`w-4 h-4 rounded-full transition-colors ${
                  idx === currentTestimonial
                    ? "bg-cyan-500"
                    : "bg-gray-600 hover:bg-cyan-400"
                }`}
              />
            ))}
          </div>
        </section>

        
      </div>
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="flex flex-col items-center bg-[#1c1f26] bg-opacity-60 rounded-3xl p-8 shadow-lg backdrop-blur-md space-y-4 hover:scale-105 transform transition-transform duration-300">
    <div className="text-[#3b82f6]">{icon}</div>
    <h4 className="text-2xl font-bold text-center">{title}</h4>
    <p className=" text-center text-lg leading-relaxed">
      {description}
    </p>
  </div>
);

export default Home;
