function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
      <path d="M6.5 9.5H4V20h2.5V9.5ZM5.25 4A1.75 1.75 0 1 0 5.25 7.5 1.75 1.75 0 0 0 5.25 4ZM20 20h-2.5v-5.6c0-1.9-.7-2.6-1.7-2.6s-1.8.9-1.8 2.7V20H11.5V9.5H14v1.2c.6-.9 1.7-1.5 3.1-1.5 2.4 0 2.9 1.6 2.9 4.4V20Z" />
    </svg>
  );
}

export function DirtStory() {
  return (
    <div className="relative z-10 min-h-[100svh] w-full">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 px-8 pb-[42vh] pt-10 md:grid-cols-[15rem_minmax(0,1fr)_15rem] md:px-16 md:pb-[34vh] md:pt-8 lg:px-24">
        <div>
          <h3 className="dirt-title">mission</h3>
          <p className="dirt-copy">
            A character-led path from how you feel to the plant, then the
            stall.
          </p>
          <h3 className="dirt-title mt-[4.5rem]">vision</h3>
          <p className="dirt-copy">
            Knowledge in the ground. The people of the plants wait in the
            light.
          </p>
        </div>
        <div aria-hidden className="hidden md:block" />
        <div className="mt-16 flex h-full flex-col justify-between md:mt-0">
          <div>
            <h3 className="dirt-title">about</h3>
            <p className="dirt-copy">
              Educational plant guidance. Not a diagnosis.
            </p>
          </div>
          <div className="mt-16 flex items-center gap-4 pb-1 text-white md:mt-24">
            <span className="inline-flex" aria-label="Instagram">
              <InstagramMark />
            </span>
            <span className="inline-flex" aria-label="LinkedIn">
              <LinkedInMark />
            </span>
            <span className="text-[0.92rem] font-light">Subscribe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
