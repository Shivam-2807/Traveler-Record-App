import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";

const LANDMARKS = [
  {
    id: 1,
    city: "Agra",
    name: "Taj Mahal",
    coordinates: [27.1751, 78.0421],
    builtBy: "Emperor Shah Jahan",
    yearBuilt: "1632",
    description: "An ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned to house the tomb of his favourite wife, Mumtaz Mahal."
  },
  {
    id: 2,
    city: "Agra",
    name: "Agra Fort",
    coordinates: [27.1795, 78.0162],
    builtBy: "Emperor Akbar",
    yearBuilt: "1565",
    description: "A historical fort in the city of Agra in India. It was the main residence of the emperors of the Mughal Dynasty till 1638, when the capital was shifted from Agra to Delhi."
  },
  {
    id: 3,
    city: "Agra",
    name: "Fatehpur Sikri",
    coordinates: [27.0911, 77.6611],
    builtBy: "Emperor Akbar",
    yearBuilt: "1571",
    description: "A city predominantly in red sandstone, situated at a distance of 37 kms from Agra. It was built by the Mughal Emperor Jalal-ud-din Mohammad Akbar."
  },
  {
    id: 4,
    city: "Agra",
    name: "Tomb of Akbar",
    coordinates: [27.2205, 77.9505],
    builtBy: "Emperor Jahangir",
    yearBuilt: "1613",
    description: "The tomb of the Mughal emperor Akbar. This tomb is an important Mughal architectural masterpiece, situated in 119 acres of grounds in Sikandra."
  },
  {
    id: 5,
    city: "Delhi",
    name: "Red Fort",
    coordinates: [28.6562, 77.2410],
    builtBy: "Emperor Shah Jahan",
    yearBuilt: "1639",
    description: "A historic fort in Old Delhi that served as the main residence of the Mughal Emperors. Every year on India's Independence Day, the Prime Minister hoists the Indian flag at the fort's main gate."
  },
  {
    id: 6,
    city: "Delhi",
    name: "India Gate",
    coordinates: [28.6129, 77.2295],
    builtBy: "Sir Edwin Lutyens",
    yearBuilt: "1921",
    description: "A war memorial located astride the Rajpath. It stands as a memorial to 70,000 soldiers of the British Indian Army who died in between 1914 and 1921 in the First World War."
  },
  {
    id: 7,
    city: "Delhi",
    name: "Qutub Minar",
    coordinates: [28.5245, 77.1855],
    builtBy: "Qutb-ud-din Aibak",
    yearBuilt: "1192",
    description: "A minaret and 'victory tower' that forms part of the Qutb complex. It is a UNESCO World Heritage Site in the Mehrauli area of New Delhi."
  },
  {
    id: 8,
    city: "Delhi",
    name: "Humayun's Tomb",
    coordinates: [28.5933, 77.2507],
    builtBy: "Empress Bega Begum",
    yearBuilt: "1570",
    description: "The tomb of the Mughal Emperor Humayun in Delhi. The tomb was commissioned by Humayun's first wife and chief consort, Empress Bega Begum."
  },
  {
    id: 9,
    city: "Jaipur",
    name: "Hawa Mahal",
    coordinates: [26.9239, 75.8267],
    builtBy: "Sawai Pratap Singh",
    yearBuilt: "1799",
    description: "A palace in Jaipur, built from red and pink sandstone. Its unique five-storey exterior is akin to a honeycomb with its 953 small windows called Jharokhas."
  },
  {
    id: 10,
    city: "Jaipur",
    name: "Amer Fort",
    coordinates: [26.9855, 75.8513],
    builtBy: "Raja Man Singh I",
    yearBuilt: "1592",
    description: "Located high on a hill, it is the principal tourist attraction in the Jaipur area. The town of Amer and the Amber Fort were originally built by the Meenas."
  },
  {
    id: 11,
    city: "Jaipur",
    name: "City Palace",
    coordinates: [26.9255, 75.8236],
    builtBy: "Sawai Jai Singh II",
    yearBuilt: "1727",
    description: "The City Palace, Jaipur, which includes the Chandra Mahal and Mubarak Mahal palaces, is a palace complex situated right in the center of the old city."
  },
  {
    id: 12,
    city: "Jaipur",
    name: "Jantar Mantar",
    coordinates: [26.9248, 75.8246],
    builtBy: "Sawai Jai Singh II",
    yearBuilt: "1734",
    description: "A collection of 19 astronomical instruments built by the Rajput king Sawai Jai Singh II. It features the world's largest stone sundial and is a UNESCO World Heritage site."
  },
  {
    id: 13,
    city: "Jaipur",
    name: "Jal Mahal",
    coordinates: [26.9672, 75.8456],
    builtBy: "Maharaja Madho Singh I",
    yearBuilt: "1750",
    description: "A palace situated in the middle of the Man Sagar Lake showcasing the Rajput style of architecture on a grand scale."
  },
  {
    id: 14,
    city: "Jaipur",
    name: "Nahargarh Fort",
    coordinates: [26.9378, 75.8155],
    builtBy: "Maharaja Sawai Jai Singh II",
    yearBuilt: "1734",
    description: "Located on the Aravalli Hills overlooking the city, it once formed a strong defense ring for the city along with Amer Fort and Jaigarh Fort."
  },
  {
    id: 15,
    city: "Jaipur",
    name: "Jaigarh Fort",
    coordinates: [26.9839, 75.8451],
    builtBy: "Sawai Jai Singh II",
    yearBuilt: "1726",
    description: "Situated on the promontory called the Cheel ka Teela, it oversees the Amer Fort and the Maota Lake, built to protect the Amer Fort complex."
  },
  {
    id: 16,
    city: "Jaipur",
    name: "Albert Hall Museum",
    coordinates: [26.9116, 75.8195],
    builtBy: "Maharaja Sawai Ram Singh II",
    yearBuilt: "1887",
    description: "The oldest museum in the state of Rajasthan, designed by Sir Samuel Swinton Jacob in the Indo-Saracenic architecture style."
  },
  {
    id: 17,
    city: "Jaipur",
    name: "Patrika Gate & Jawahar Circle",
    coordinates: [26.8377, 75.8037],
    builtBy: "Rajasthan Patrika",
    yearBuilt: "2016",
    description: "A famously vibrant and incredibly colorful monument at Jawahar Circle showcasing the art, craft, and cultural heritage of various regions of Rajasthan."
  },
  {
    id: 18,
    city: "Jaipur",
    name: "Govind Dev Ji Temple",
    coordinates: [26.9304, 75.8267],
    builtBy: "Maharaja Sawai Jai Singh II",
    yearBuilt: "1735",
    description: "A prominent and deeply revered Hindu temple located within the City Palace complex, dedicated to Lord Krishna."
  }
];

// Reusable clean generic marker used for destinations
const customPin = L.divIcon({
  className: "custom-city-pin",
  html: `
    <div style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: #e11d48; color: white; border-radius: 50%; box-shadow: 0 4px 12px rgba(225, 29, 72, 0.4); text-align: center; border: 3px solid white; transform: translate(-50%, -50%);">
      <span style="font-size: 16px;">🏛️</span>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0]
});

// Helper component to smoothly animate map to new bounds/center without full remount
function MapFlightController({ coordinates, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, zoom, { duration: 0.3 });
    }
  }, [coordinates, zoom, map]);
  return null;
}

export default function FamousPlaces() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCity, setActiveCity] = useState("Agra");
  const [mapCenter, setMapCenter] = useState([27.1751, 78.0421]); // Default Agra

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchQuery(term);

    // If query matches a known city beautifully, snap the map center to the first landmark representing that city
    const matchedLandmark = LANDMARKS.find(l => l.city.toLowerCase().includes(term) || l.name.toLowerCase().includes(term));
    if (matchedLandmark) {
      setMapCenter(matchedLandmark.coordinates);
      setActiveCity(matchedLandmark.city);
    }
  };

  // Filter places based on search
  const filteredPlaces = LANDMARKS.filter(
    (place) => 
      place.city.toLowerCase().includes(searchQuery) || 
      place.name.toLowerCase().includes(searchQuery) ||
      place.builtBy.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="famous-places-page fade-in">
      {/* Header & Search */}
      <div className="discovery-header">
        <h1>India's most iconic landmarks, mapped.</h1>
        <p>History isn't just in textbooks. Search any city and uncover the stories behind the monuments, forts, and temples that shaped a civilization.</p>
        
        <div className="search-bar-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search a city like Agra, Delhi, or Jaipur..." 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Map Section */}
      <div className="discovery-map-container">
        <MapContainer 
          center={mapCenter} 
          zoom={12} 
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%", borderRadius: "16px" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">Carto</a>'
          />
          <MapFlightController coordinates={mapCenter} zoom={13} />
          
          {filteredPlaces.map((place) => (
            <Marker key={place.id} position={place.coordinates} icon={customPin} />
          ))}
        </MapContainer>
      </div>

      {/* Structured Details Layout */}
      <div className="discovery-results">
        <h2>{filteredPlaces.length > 0 ? "Featured Landmarks" : "No landmarks found"}</h2>
        <div className="places-grid">
          <AnimatePresence>
            {filteredPlaces.map((place, index) => (
              <motion.div 
                key={place.id} 
                className="place-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="place-header">
                  <h3>{place.name}</h3>
                  <span className="place-city-tag">{place.city}</span>
                </div>
                
                <div className="place-meta">
                  <div className="meta-item">
                    <span className="meta-label">Built by</span>
                    <strong className="meta-value">{place.builtBy}</strong>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Completed</span>
                    <strong className="meta-value">{place.yearBuilt}</strong>
                  </div>
                </div>

                <div className="place-description">
                  <p>{place.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
