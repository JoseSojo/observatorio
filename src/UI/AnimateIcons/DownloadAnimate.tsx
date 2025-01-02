
export default function DownloadAnimate({size}:{size:number}) {
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
            @keyframes slide-right {
              0% {
                transform: translateY(0);
              }
              to {
                transform: translateY(1px);
              }
            }
          `}
        </style>
        <path 
          fill="#265BFF" 
          d="M12.75 6.432a.75.75 0 00-1.5 0h1.5zm-1.5 6a.75.75 0 001.5 0h-1.5zm-1.22-2.53a.75.75 0 10-1.06 1.06l1.06-1.06zm1.97 3.03l-.53.53a.75.75 0 001.06 0l-.53-.53zm3.03-1.97a.75.75 0 00-1.06-1.06l1.06 1.06zm-3.78-4.53v6h1.5v-6h-1.5zm-2.28 4.53l2.5 2.5 1.06-1.06-2.5-2.5-1.06 1.06zm3.56 2.5l2.5-2.5-1.06-1.06-2.5 2.5 1.06 1.06z" 
          style={{ animation: 'slide-right .5s cubic-bezier(1,-.43,.68,.57) infinite alternate both' }} 
        />
        <path 
          fill="#0A0A30" 
          d="M8.398 15.37a.75.75 0 10-.796 1.27l.796-1.27zm-.319.685l.398-.636-.398.636zm8.327.58a.75.75 0 00-.812-1.26l.812 1.26zm-8.804.006l.08.05.795-1.272-.079-.05-.796 1.272zm.08.05a8.14 8.14 0 008.724-.055l-.812-1.262a6.64 6.64 0 01-7.117.045l-.796 1.271z" 
        />
      </svg>
    );
  }