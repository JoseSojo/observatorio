export default function SearchAnimate({size}:{size:number}) {
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
            @keyframes flipping {
              0% {
                transform: rotate3d(1, 1, 0, 0deg);
              }
              to {
                transform: rotate3d(1, 1, 0, 180deg);
              }
            }
          `}
        </style>
        <g style={{ animation: 'flipping 1.5s cubic-bezier(.96,-.2,0,1.29) both infinite alternate-reverse' }}>
          <path 
            fill="#0A0A30" 
            fillRule="evenodd" 
            d="M5.71 11.025a5.25 5.25 0 1010.5 0 5.25 5.25 0 00-10.5 0zm5.25-7a7 7 0 100 14 7 7 0 000-14z" 
            clipRule="evenodd" 
          />
          <rect 
            width="1.839" 
            height="3.677" 
            x="16.139" 
            y="17.375" 
            fill="#265BFF" 
            rx=".2" 
            transform="rotate(-45 16.14 17.375)" 
          />
        </g>
      </svg>
    );
  }