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
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 px-8 pb-[42vh] pt-10 md:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)_minmax(18rem,26rem)] md:px-16 md:pb-[34vh] md:pt-8 lg:px-24">
        <div>
          <h3 className="dirt-title">mission</h3>
          <p className="dirt-copy">
            To unite the world’s botanical knowledge—scientific, medicinal,
            cultural, and ancestral—through intelligent plant characters,
            unlocking new ideas and solutions for humanity and nature.
          </p>
          <h3 className="dirt-title mt-[7.5rem]">vision</h3>
          <p className="dirt-copy">
            A future where humanity and nature are connected through shared
            knowledge, discovery, and a deeper understanding of healing each
            other.
          </p>
        </div>
        <div aria-hidden className="hidden md:block" />
        <div className="mt-16 flex h-full flex-col justify-between md:mt-0">
          <div>
            <h3 className="dirt-title">about our story</h3>
            <div className="dirt-copy-wide space-y-3">
              <p>
                We are plant lovers, nature lovers, and explorers of the
                extraordinary relationship between humanity and the natural
                world. Through our travels across cultures and continents, we
                have witnessed the depth of botanical knowledge developed over
                thousands of years—and the growing risk of losing it.
              </p>
              <p>
                For centuries, plants have played a fundamental role in human
                health, cultural identity, and our relationship with the planet.
                Yet much of this knowledge remains fragmented across scientific
                institutions, traditional healing practices, ancestral
                communities, historical archives, and geographic boundaries.
                Some of it is disappearing, while much of what survives remains
                difficult for the public to discover, understand, and apply.
              </p>
              <p>
                Healing Plants of the World was born from a simple idea: What if
                we could bring the world’s botanical knowledge and cultural
                history together—and give plants a voice?
              </p>
              <p>
                Today, artificial intelligence creates an unprecedented
                opportunity to connect information that has historically existed
                in separate worlds. Biology, medicine, pharmacology, evolution,
                ecology, traditional practices, and cultural histories can
                become part of an interconnected, continuously expanding body of
                knowledge.
              </p>
              <p>But bringing information together is only the beginning.</p>
            </div>
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
