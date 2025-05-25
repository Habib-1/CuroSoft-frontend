import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/service/')
      .then(res => setServices(res.data))
      .catch(error => console.error("Error fetching services:", error));
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white" id="services">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6">
          🌟 Our Services
        </h2>
        <p className="text-gray-600 text-lg mb-14 max-w-2xl mx-auto">
          We provide smart healthcare solutions to make your medical journey smoother and more accessible.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {
            services.map((service, idx) => (
              <Service key={idx} service={service} />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Services;
