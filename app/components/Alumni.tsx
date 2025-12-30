"use client";

import { useEffect, useState } from "react";

/* ---------- ALUMNI DATA ---------- */
const alumniList = [
  {
    name: "Dileesh Pothan",
    role: "Actor, Director",
    image: "/alumni/dileesh.jpg",
    description:
      "Dileesh Pothan is an Indian film actor and director, who works in Malayalam cinema. Pothan was born in Omalloor of Manjoor panchayat-village in northern Kottayam district, Kerala. Pothan did his schooling at Emmanuel's High School, Kothanalloor. After pre-degree from Kuriakose Elias College, Mannanam, he pursued a BSc degree at St. Philomena's College, Mysore. Due to his keen interest in drama and cinema, he followed up with an M.A. in Theatre Arts at Sree Sankaracharya University of Sanskrit, Kalady and an M.Phil. in Theatre Arts from Mahatma Gandhi University, Kottayam. Pothan began his career as an assistant director to the 2010 film 9 KK Road. He served as an assistant director under Aashiq Abu, assisting in five of Aashiq's films. He made his acting debut as a movie director in one scene in Aashiq Abu's 2011 film Salt N' Pepper. He made his directorial debut with the 2016 comedy-drama film Maheshinte Prathikaaram, starring Fahadh Faasil. The movie received the Best Feature Film in Malayalam Award at the 64th National Film Awards. Pothan also won the Best Director Award at the 64th Filmfare Awards South. His second directional was Thondimuthalum Driksakshiyum (2017), which was also a critical and commercial hit. Thondimuthalum Driksakshiyum won the Best Feature Film in Malayalam Award as well at the 65th National Film Awards.",
  },
  {
    name: "Surabhi Lakshmi",
    role: "Actress",
    image: "/alumni/surabhi-lakshmi.jpeg",
    description:
      "Surabhi C.M., also known as Surabhi Lakshmi is an Indian film, television, and stage actress who appears in Malayalam films and television. Lakshmi was born to parents Andy and Radha on 16 November 1986. She is from Narikkuni in Kozhikode, Kerala. Lakshmi gained a BA degree in Bharathanatyam with first rank from Sree Sankaracharya University of Sanskrit, Kalady. She gained a MA degree in Theatre Arts from Sree Sankaracharya University of Sanskrit, Kalady, MPhil in Performing Arts from Mahatma Gandhi University and PhD from Sree Sankaracharya University of Sanskrit, Kalady. Lakshmi won the National Film Award for Best Actress in 2016 for portraying the role of a struggling middle-aged mother in the Malayalam film Minnaminungu.",
  },
  {
    name: "V. P. Sanu",
    role: "Politician",
    image: "/alumni/sanu-cpim.jpg",
    description:
      "V. P. Sanu is an Indian politician who is currently the National President of the Students' Federation of India, the student's wing of the Communist Party of India (Marxist). He is also a member of the Malappuram district committee of the CPI(M). He completed his Masters in Social Work (MSW) at the Sree Sankaracharya University of Sanskrit, Kalady.",
  },
];

/* ---------- COMPONENT ---------- */
export default function AlumniSection() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const total = alumniList.length;
  const alumni = alumniList[index];

  /* AUTO SCROLL */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(interval);
  }, [total]);

  /* RESET READ MORE ON SLIDE CHANGE */
  useEffect(() => {
    setExpanded(false);
  }, [index]);

  return (
    <section className="bg-[#F7F5F4] py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-[48px] font-semibold text-[#3D0F29]">
          Our Proud Alumni
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Discover learning spaces designed for innovation, collaboration, and excellence.
        </p>
      </div>

      {/* Wrapper */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex rounded-[12px] overflow-hidden bg-white">

          {/* IMAGE CARD */}
          <div className="w-[420px] h-[520px] bg-white p-2">
            <div className="w-full h-full border-2 border-white rounded-[16px] flex items-center justify-center">
              <img
                src={alumni.image}
                alt={alumni.name}
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
          </div>

          {/* TEXT CARD */}
          <div className="flex-1 h-[520px] p-10 relative">
            {/* Arrows */}
            <div className="absolute top-6 right-6 flex gap-3">
              <button
                onClick={() => setIndex((index - 1 + total) % total)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
              >
                ←
              </button>
              <button
                onClick={() => setIndex((index + 1) % total)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
              >
                →
              </button>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900">
              {alumni.name}
            </h3>
            <p className="text-gray-500 mt-1">{alumni.role}</p>

            {/* DESCRIPTION */}
            <p
              className={`mt-6 text-gray-600 leading-[1.8] text-[15px] text-justify max-w-[650px] ${
                expanded ? "" : "line-clamp-6"
              }`}
            >
              {alumni.description}
            </p>

            {/* READ MORE */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-sm font-medium text-[#3D0F29] hover:underline"
            >
              {expanded ? "Read less" : "Read more"}
            </button>

            {/* FOOTER */}
            <div className="border-t mt-10 pt-6 flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-800">
                  Join our Alumni
                </p>
                <a
                  href="https://iqacssr.ssus.ac.in/alumni/registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-3 border border-gray-900 rounded-lg font-medium inline-flex items-center gap-2"
                >
                  Join Now →
                </a>
              </div>

              {/* Dots */}
              <div className="flex gap-2">
                {alumniList.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === index ? "bg-gray-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
