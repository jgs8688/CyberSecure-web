import { useEffect, useState } from "react";
import "../index.css";
import { axiosInstance } from "../utility/baseUrl";
import { useAuth } from "../context/Authcontext";
interface Item {
  name: string;
  url: string;
  domail: string;
}
export default function Aside() {
  const { user:userId, setUser } = useAuth();

  const [items, setItems] = useState<Array<Item>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/url/report/${userId}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setItems(res.data.data);
        console.log("Fetched data:", res.data.data);
      } else {
        console.error("Error fetching data:", res.statusText);
      }
    };

    fetchData();
  }, []);
  const data = [
    {
      id: "1",
      name: "Cybersecurity Basics",
      url: "https://example.com/articles/cybersecurity-basics",
      pdf: "https://example.com/files/cybersecurity-basics.pdf",
    },
    {
      id: "2",
      name: "Introduction to React",
      url: "https://example.com/tutorials/intro-to-react",
      pdf: "https://example.com/files/intro-to-react.pdf",
    },
    {
      id: "3",
      name: "JavaScript Best Practices",
      url: "https://example.com/guides/js-best-practices",
      pdf: "https://example.com/files/js-best-practices.pdf",
    },
    {
      id: "4",
      name: "Node.js Crash Course",
      url: "https://example.com/courses/nodejs-crash-course",
      pdf: "https://example.com/files/nodejs-crash-course.pdf",
    },
    {
      id: "5",
      name: "MongoDB for Beginners",
      url: "https://example.com/tutorials/mongodb-beginners",
      pdf: "https://example.com/files/mongodb-beginners.pdf",
    },
    {
      id: "6",
      name: "API Development with Express",
      url: "https://example.com/api/express-guide",
      pdf: "https://example.com/files/express-api-guide.pdf",
    },
    {
      id: "7",
      name: "Machine Learning 101",
      url: "https://example.com/ml/intro-ml",
      pdf: "https://example.com/files/intro-to-ml.pdf",
    },
    {
      id: "8",
      name: "Python for Data Science",
      url: "https://example.com/courses/python-data-science",
      pdf: "https://example.com/files/python-data-science.pdf",
    },
    {
      id: "9",
      name: "Web Development Roadmap",
      url: "https://example.com/roadmaps/web-dev",
      pdf: "https://example.com/files/web-dev-roadmap.pdf",
    },
    {
      id: "10",
      name: "Ethical Hacking Guide",
      url: "https://example.com/guides/ethical-hacking",
      pdf: "https://example.com/files/ethical-hacking-guide.pdf",
    },
  ];

  return (
    <div>
      <div className="bg-white/5 rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold text-center">Resources</h1>
        <p className="text-center">
          Explore our curated list of resources to enhance your skills and
          knowledge.
        </p>
      </div>
      <div>
        <div className="overflow-y-auto max-h-[70vh] mt-4  custom-scroll h-screen">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 rounded-lg shadow-md p-4 mt-4"
            >
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-sm">
                URL:{" "}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {item.url}
                </a>
              </p>
              <p className="text-sm">
                PDF:{" "}
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {item.pdf}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
