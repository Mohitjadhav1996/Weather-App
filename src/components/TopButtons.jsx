import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Dhule",
    },
    {
      id: 2,
      title: "Pune",
    },
    {
      id: 3,
      title: "Mumbai",
    },
    {
      id: 4,
      title: "Nashik",
    },
    {
      id: 5,
      title: "Indore",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
