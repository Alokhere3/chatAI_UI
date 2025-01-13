import React from 'react';

// Send Icon Component
export const SendIcon = ({ width = 24,strokeWidth = 20, color = "black", onClick }) => {
  return (
    <svg
      onClick={onClick}
      fill={color}
      stroke={color} 
      height={`${width}px`}
      width={`${width}px`}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 495.003 495.003"
      xmlSpace="preserve"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <g id="XMLID_51_">
        <path
          id="XMLID_53_"
          d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616
          l-67.6-32.22V456.687z"
        />
        <path
          id="XMLID_52_"
          d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422
          c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414
          l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956
          L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"
        />
      </g>
    </svg>
  );
};


export const TrashIcon = ({ width = 24,strokeWidth = 20, color = "black", onClick }) => {
  return (
    <svg
      onClick={onClick}
      fill={color}
      stroke={color} 
      height={`${width}px`}
      width={`${width}px`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <path d="M3 6h18v2H3V6zm2 3h14v13a1 1 0 01-1 1H6a1 1 0 01-1-1V9zm6-5v1h4V4h-4z" />
    </svg>
  );
};
export const EditIcon = ({ width = 24, color = "black", strokeWidth = 20, onClick,title="" }) => {
  return (
    <svg
      onClick={onClick}
      fill={color}
      title={title}
      stroke={color} 
      strokeWidth={strokeWidth} 
      height={`${width}px`}
      width={`${width}px`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157 c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21 s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741 c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z" />
      <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069 c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963 c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692 C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107 l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005 c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z" />
    </svg>
  );
};



// Add more icons here as needed

// Default Export for Convenience
const Icons = {
  SendIcon,
  TrashIcon,
  EditIcon
};

export default Icons;
