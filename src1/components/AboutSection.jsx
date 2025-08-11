import React, { useState } from "react";
import Modal from "./Modal";

const sectors = [
  {
    img: "scholarship.jpg",
    text: "Education",
    description: [
      "<strong>Secondary Scholarship Program:</strong> 126 students sponsored, 44 transitioned to university",
      "<strong>Mentorship Programs:</strong> 126 beneficiaries mentored in career and life skills",
      "<strong>TVET & Youth Economic Empowerment:</strong> 72 out-of-school youth trained in vocational skills",
      "<strong>Digital Literacy Program:</strong> 3 computer labs established in public primary schools",
    ],
  },
  {
    img: "health.jpg",
    text: "Health",
    description: [
      "<strong>10 Anti-jigger campaigns:</strong> Over 5000 children treated and provided with shoes",
      "<strong>24 Eye Camps:</strong> 10000+ people treated, free glasses provided, 100 cataract surgeries conducted",
      "<strong>4 General Medical Camps:</strong> 2000 people screened and treated for various ailments",
      "<strong>Reproductive Health Club Programs:</strong> Reached 8,000+ with reproductive health education and dignity kits.",
      "2,000 boys supported with boxers and mentorship.",
    ],
  },
  {
    img: "enviro.jpg",
    text: "Environment",
    description: [
      "<strong>Tree Planting Initiatives:</strong> Planted over 13,000 fruit and indigenous tree seedlings in schools and communities across Kilifi.",
      "<strong>Waste Management Programs:</strong> Patnering with Kilifi County Government and other stakeholders to promote clean and healthy environments.",
    ],
  },
  {
    img: "agrics.jpg",
    text: "Agribusiness",
    description: [
      "<strong>Kitchen Gardens & Poultry Projects:</strong> 3 schools and the entire population of the school trained in agribusiness",
      "<strong>Value Addition in Farming:</strong> Surpporting cassava farming and value addition",
      "<strong>Business Skills & Financial Literacy:</strong> Training youths and linking them to financial support through Imarika DT Sacco",
    ],
  },
  {
    img: "disaster.jpg",
    text: "Disaster Response",
    description: [
      "<strong>Food & Essential Supplies Distribution:</strong> Assisting affected families during emergencies.",
      "<strong>Pandemic Response:</strong> Providing  masks, handwashing facilities, and food supplies during crises like COVID-19",
    ],
  },
];

const AboutSection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="about"
      className="py-16 px-6 bg-white scroll-mt-20"
      data-aos="fade-up"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          About Imarika Foundation
        </h2>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          We are a community-driven organization committed to transforming lives
          across Kilifi and coastal Kenya through education, healthcare,
          environmental sustainability, disaster relief, and economic empowerment.
        </p>
      </div>

      {/* Grid of Sectors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {sectors.map((item, index) => (
          <div key={index} className="text-center">
            <div
              onClick={() => setSelected(item)}
              className="group relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white ring-2 ring-indigo-300 hover:ring-indigo-500 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              title={item.text}
            >
              <img
                src={`/images/${item.img}`}
                alt={item.text}
                className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p className="text-gray-800 font-medium mt-2 text-sm sm:text-base">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Modal with content */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <div className="flex flex-col items-center text-center">
            <img
              src={`/images/${selected.img}`}
              alt={selected.text}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {selected.text}
            </h3>
            <ul className="text-gray-600 text-sm leading-relaxed text-left list-[square] marker:text-orange-500 pl-6">
              {selected.description.map((point, idx) => (
                <li
                  key={idx}
                  className="mb-1"
                  dangerouslySetInnerHTML={{ __html: point }}
                ></li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default AboutSection;
