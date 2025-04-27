import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BarangayList() {
  const { municipalityId } = useParams(); // Get municipality ID from URL
  const [barangays, setBarangays] = useState([]);

  useEffect(() => {
    fetch(`/api/barangays/municipality/${municipalityId}`)
      .then((res) => res.json())
      .then((data) => setBarangays(data))
      .catch((error) => console.error("Error fetching barangays:", error));
  }, [municipalityId]);

  return (
    <div>
      <h2>Barangays in Municipality {municipalityId}</h2>
      <ul>
        {barangays.map((barangay) => (
          <li key={barangay._id}>{barangay.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BarangayList;
