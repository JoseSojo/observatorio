
export default function CheckAnimate({size}:{size:number}) {
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
            @keyframes check {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}
            </style>
            <circle cx="12" cy="12" r="8" stroke="#0A0A30" strokeWidth="1.5" />
            <path
                stroke="#265BFF"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M9.215 12.052l1.822 1.805 3.748-3.714"
                style={{ animation: 'check 2s infinite cubic-bezier(.99,-.1,.01,1.02)', strokeDashoffset: 100, strokeDasharray: 100 }}
            />
        </svg>
    );
}
