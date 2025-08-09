import React from 'react';

const ServiceList = ({ services, onDelete }) => {
  return (
    <div className="service-list">
      <h3>Servicios Regulares</h3>
      {services.length === 0 ? (
        <p>No hay servicios registrados.</p>
      ) : (
        <ul>
          {services.map((service, idx) => (
            <li key={idx} style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'0.5em'}}>
              <span>{service.name} - ${service.amount}</span>
              <button onClick={() => onDelete(idx)} style={{background:'#FF6384',color:'#fff',border:'none',borderRadius:'4px',padding:'0.3em 0.7em',cursor:'pointer'}}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceList;
