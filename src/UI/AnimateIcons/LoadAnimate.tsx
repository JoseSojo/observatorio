
export default function LoaderAnimate({size}:{size:number}) {
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
            @keyframes loader4 {
              0% {
                transform: rotate(0);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
        <path 
          stroke="#0A0A30" 
          strokeLinecap="round" 
          strokeWidth="1.5" 
          d="M12 6.864v1.333m0 7.606v1.333M17.136 12h-1.333m-7.606 0H6.864m8.768 3.632l-.943-.943M9.311 9.311l-.943-.943m0 7.264l.943-.943m5.378-5.378l.943-.943" 
          style={{ animation: 'loader4 1.5s linear infinite both', transformOrigin: 'center center' }}
        />
      </svg>
    );
  }