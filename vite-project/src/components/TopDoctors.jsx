import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0, 0)}}
            className="border border-gray-200 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
          >
            <div className="h-48 w-full overflow-hidden bg-blue-50 flex items-center justify-center">
              {item.image ? (
                <img 
                  className="w-full h-full object-cover" 
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    console.error('Failed to load image:', item.image);
                    e.target.onerror = null;
                    e.target.src = '/placeholder-doctor.png';
                  }}
                  onLoad={() => console.log('Image loaded successfully:', item.image)}
                />
              ) : (
                <div className="text-gray-500 text-center p-4">
                  No image available
                </div>
              )}
            </div>
            <div className="p-4">
              <div className={`flex items-center gap-2 text-sm text-center`}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: item.available ? 'green' : 'gray',
                  display: 'inline-block',
                  marginRight: '6px',
                }}></div>
                <p>{item.available ? 'Available':'Not Available'}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>{ navigate('/doctors'); scrollTo(0,0)}} className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10">
        more
      </button>
    </div>
  );
};

export default TopDoctors;
