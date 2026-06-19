import React from "react";

function Friend({ userInfo }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-blue-300 border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer">

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={
            userInfo?.image ||
            "https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg"
          }
          alt="profile"
          className="w-14 h-14 rounded-full object-cover"
        />

        {/* Online dot */}
        {userInfo?.isOnline && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col min-w-0 flex-1">
        <p className="text-sm text-gray-500 truncate">
          @{userInfo?.username || "unknown"}
        </p>

        <p className="text-base font-semibold text-gray-900 truncate">
          {userInfo?.fullName || "No Name"}
        </p>
      </div>
    </div>
  );
}

export default Friend;