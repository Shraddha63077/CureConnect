import React, { useContext, useEffect,useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { data } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);


  const [isEdit, setIsEdit] = useState(false);

  // Remove updateFee and replace with general updateProfile function
  const updateProfile = async (updatedData) => {
    try {
         const updateData = {
          address: profileData.address,
          fees: profileData.fees,
          available:profileData.available
         }
      const {data} =  await axios.post(backendUrl +'/api/doctor/update-profile', updateData, {
        headers: {
          Authorization: `Bearer ${dToken}`
        }
      })

      if(data.success){
        toast.success(data.message)
        await getProfileData()
        setIsEdit(false)
      }
      else{
        toast.error(data.message)
        console.log(data.message)
      }
    
    }
    
    catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  return (
    profileData && (
      <div>
        <div className='flex flex-col gap-4 m-5'>
          <div>
            <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg'src={profileData.image} alt="" />
          </div>
          <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
            {/* --------------------- doc info : name, degree, experience -------------*/}

            {isEdit ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="text-3xl font-medium text-gray-700 border-b border-gray-300"
              />
            ) : (
              <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
            )}
            <div className='flex items-center gap-2 mt-1 text-gray-600'>
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={profileData.degree}
                    onChange={(e) => setProfileData(prev => ({ ...prev, degree: e.target.value }))}
                    className="border-b border-gray-300"
                  />
                  <input
                    type="text"
                    value={profileData.speciality}
                    onChange={(e) => setProfileData(prev => ({ ...prev, speciality: e.target.value }))}
                    className="border-b border-gray-300"
                  />
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                    className="border-b border-gray-300"
                  />
                </>
              ) : (
                <>
                  <p>
                    {profileData.degree} - {profileData.speciality}
                  </p>
                  <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                </>
              )}
            </div>

            {/* --------------Doc About -------------------*/}
            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
              {isEdit ? (
                <textarea
                  value={profileData.about}
                  onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                  className="border rounded p-2 w-full text-sm text-gray-600 max-w-[700px] mt-1"
                  rows={4}
                />
              ) : (
                <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
              )}
            </div>

            <p className='text-gray-600 font-medium mt-4'>
              Appointment fee:{" "}
              <span className='text-gray-800'>
                {currency}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) => {
                      const newFee = e.target.value;
                      setProfileData((prev) => ({ ...prev, fees: newFee }));
                    }}
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className='flex flex-col gap-1 py-2'>
              <p className='text-sm font-medium'>Address:</p>
              {isEdit ? (
                <>
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address?.line1 || ""}
                    className="border rounded px-2 py-1 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Address Line 2"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address?.line2 || ""}
                    className="border rounded px-2 py-1 text-sm"
                  />
                </>
              ) : profileData.address ? (
                (() => {
                  let addr = profileData.address;
                  if (typeof addr === "string") {
                    try {
                      addr = JSON.parse(addr);
                    } catch {
                      return addr;
                    }
                  }
                  return (
                    <>
                      {addr.line1 && (
                        <>
                          {addr.line1}
                          <br />
                        </>
                      )}
                      {addr.line2 && <>{addr.line2}</>}
                    </>
                  );
                })()
              ) : (
                "N/A"
              )}
            </div>
            <div className='flex gap-1 pt-2'>
              <input onChange={() => isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={profileData.available} type="checkbox" name="" id="" />
              <label htmlFor="">Available</label>
            </div>
{
  isEdit ? (
    <button
      onClick={() => {
        updateProfile({
          fees: profileData.fees,
          address: profileData.address,
          available: profileData.available,
        });
      }}
      className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
    >
      Save
    </button>
  ) : (
    <button
      onClick={() => setIsEdit(true)}
      className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
    >
      Edit
    </button>
  )
}

           
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
