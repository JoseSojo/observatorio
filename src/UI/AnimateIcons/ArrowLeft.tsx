export default function ArrowLeft({size}:{size:number}) {
    return (
      <svg 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        fill="none"
      >
        <style>
          {`
            @keyframes slide-5 {
              to {
                transform: translateX(2px);
              }
            }
          `}
        </style>
        <g style={{ animation: 'slide-5 1s infinite alternate both cubic-bezier(1,-.01,0,.98)' }}>
          <path 
            fill="#0A0A30" 
            d="M7.666 12.75a.75.75 0 010-1.5v1.5zm4.09-1.5h.75v1.5h-.75v-1.5zm-4.09 0h4.09v1.5h-4.09v-1.5z"
          />
          <path 
            stroke="#265BFF" 
            strokeWidth="1.5" 
            d="M16.438 11.614l-2.87-2.144a.476.476 0 00-.762.382l.012 4.296a.479.479 0 00.766.382l2.857-2.153a.477.477 0 00-.003-.763z"
          />
        </g>
      </svg>
    );
  }