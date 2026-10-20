import type { Plant } from "./types";

/** Stock-photo plants from updates/Stock. Copy is educational placeholder, not a clinical record. */
export const stockPlants: Plant[] = [
  {
    slug: "ashwagandha",
    name: "Ashwagandha",
    latinName: "Withania somnifera",
    region: "India",
    geography: "Asia",
    concerns: ["stress", "energy", "immunity"],
    summary:
      "A woody shrub of South Asia, used in Ayurvedic tradition for depletion, stress, and stamina. The root is the usual medicine. This card is a placeholder until Maria’s research pass is in.",
    benefits: [
      "Traditional support during stress and depletion",
      "Used for stamina, not as a caffeine substitute",
      "Root-centered plant of dry climates",
    ],
    traditionalUses:
      "Ayurvedic practice has long used the root of Withania somnifera as a rasayana — a restorative plant for people who are worn down. Contemporary supplements are louder than the plant in the ground.",
    preparation:
      "Dried root as decoction, powder, or practitioner extract. Forms and doses vary widely. Learn the plant before you improvise.",
    grow: "Warm, dry, well-drained soil. A small shrub, not a casual windowsill herb.",
    precautions: [
      "May not suit pregnancy, autoimmune conditions, or thyroid medicines — ask a clinician.",
      "Can cause stomach upset or drowsiness in some people.",
    ],
    gardenNotes: ["Warm climate", "Root harvest", "Buy cultivated root"],
  },
  {
    slug: "eucalyptus",
    name: "Eucalyptus",
    latinName: "Eucalyptus globulus",
    region: "Australia",
    geography: "Australia",
    concerns: ["immunity", "skin"],
    summary:
      "An Australian tree whose leaves are steamed for the chest. The aroma is the famous part. The essential oil is much stronger than a leaf in hot water.",
    benefits: [
      "Traditional steam for congested breathing",
      "Aromatic leaf",
      "Fast-growing tree in the right climate",
    ],
    traditionalUses:
      "Aboriginal Australian uses of eucalyptus are older than the global cough-drop industry. Later pharmacy turned the oil into a chest-rub staple.",
    preparation:
      "Fresh or dried leaf as steam inhalation. Essential oil is concentrated; do not swallow it, and keep it away from young children.",
    grow: "Sun, space, and a climate that forgives a thirsty tree. Not a small-pot plant for long.",
    precautions: [
      "Essential oil can be toxic if swallowed.",
      "Keep eucalyptus oil away from the faces of infants.",
    ],
    gardenNotes: ["Australian tree", "Aromatic leaf", "Oil is potent"],
  },
  {
    slug: "calendula",
    name: "Calendula",
    latinName: "Calendula officinalis",
    region: "Mediterranean",
    geography: "Europe",
    concerns: ["skin", "digestion", "immunity"],
    summary:
      "Pot marigold. A garden flower used on skin and, more quietly, as a gentle digestive tea. The orange resin in the petals is the point.",
    benefits: [
      "Traditional salve flower for minor skin repair",
      "Gentle tea for a tender stomach",
      "Easy annual for a healing garden",
    ],
    traditionalUses:
      "European household herbalism used calendula petal on scrapes, dry skin, and a mouth that needed a wash. It is as much a kitchen-garden plant as a clinic plant.",
    preparation:
      "Dried petal as tea, oil, or salve. Harvest the flower often; the plant keeps blooming.",
    grow: "Sun, ordinary soil, regular picking. Cool-season annual that self-sows.",
    precautions: [
      "Aster family allergy is possible.",
      "Not a substitute for care on deep or infected wounds.",
    ],
    gardenNotes: ["Easy annual", "Harvest flowers often", "Resinous petals"],
  },
  {
    slug: "elderberry",
    name: "Elderberry",
    latinName: "Sambucus nigra",
    region: "Europe",
    geography: "Europe",
    concerns: ["immunity"],
    summary:
      "Dark berries of a European hedgerow shrub, cooked into syrups for the cold season. Raw berry and other plant parts are not a casual snack.",
    benefits: [
      "Traditional immune-season syrup",
      "Hedgerow and wildlife plant",
      "Flower also used as a tea",
    ],
    traditionalUses:
      "European folk practice cooked ripe elderberry into syrups and cordials. The flower has its own quieter tradition as a feverish-day tea.",
    preparation:
      "Ripe berries cooked, never raw. Flowers as tea. Stems, leaves, and unripe fruit stay out of the pan.",
    grow: "Moist soil, sun or light shade, room to become a shrub. Birds will argue over the fruit.",
    precautions: [
      "Raw berry, leaf, and stem can cause nausea.",
      "Cook the ripe fruit. This is not a handful-from-the-hedge plant.",
    ],
    gardenNotes: ["Hedgerow shrub", "Cook the berry", "Wildlife food"],
  },
  {
    slug: "coca",
    name: "Coca",
    latinName: "Erythroxylum coca",
    region: "Andes",
    geography: "Americas",
    concerns: ["energy"],
    summary:
      "An Andean leaf with a long traditional chew for altitude and work. This card is plant education. It is not a cocaine recipe, and legal status varies widely.",
    benefits: [
      "Traditional Andean leaf for stamina at altitude",
      "Cultural plant of the Andes",
      "Not a street-drug instruction set",
    ],
    traditionalUses:
      "Andean communities have chewed coca leaf with alkaline ash for centuries as a work and altitude companion. Isolated alkaloids are another story entirely.",
    preparation:
      "This prototype does not give a method. Learn the cultural plant first. Do not improvise chemistry.",
    grow: "Tropical Andean shrub. Not a temperate backyard crop, and often legally restricted.",
    precautions: [
      "Legal status varies by country. Isolated cocaine is illegal in most places.",
      "This is not a how-to for extraction or recreational use.",
    ],
    gardenNotes: ["Andean shrub", "Cultural leaf", "Law varies"],
  },
  {
    slug: "ginkgo",
    name: "Ginkgo",
    latinName: "Ginkgo biloba",
    region: "East Asia",
    geography: "Asia",
    concerns: ["energy"],
    summary:
      "A living fossil tree. The leaf is the modern extract; the seed is another tradition. Ginkgo is slow, urban-tough, and not a miracle memory pill.",
    benefits: [
      "Traditional leaf for circulation and mental stamina",
      "Ancient tree for streets and temples",
      "Fan-shaped leaf unlike any other",
    ],
    traditionalUses:
      "Chinese herbal tradition used seed more than leaf. Later European phytotherapy made a standardized leaf extract famous for circulation and focus.",
    preparation:
      "Standardized leaf extract is the usual modern form. Do not eat the raw seed from a sidewalk tree as a snack.",
    grow: "Patient, pollution-tolerant, and eventually huge. Female trees drop messy, smelly fruit.",
    precautions: [
      "Can interact with blood-thinning medicines. Ask a clinician.",
      "Seeds and fruit are not casual food.",
    ],
    gardenNotes: ["Ancient tree", "Leaf is the extract", "Slow to mature"],
  },
  {
    slug: "lemon-balm",
    name: "Lemon Balm",
    latinName: "Melissa officinalis",
    region: "Mediterranean",
    geography: "Europe",
    concerns: ["stress", "sleep", "digestion"],
    summary:
      "A lemon-scented mint-family plant for a nervous stomach and a mind that will not sit down. Gentle, spreading, and easy to grow.",
    benefits: [
      "Calming tea for stress",
      "Traditional digestive after meals",
      "Lemon aroma in the garden",
    ],
    traditionalUses:
      "Mediterranean and later European herbalism used lemon balm as a gladdening tea — nerves, sleep, and a taut digestive tract.",
    preparation:
      "Fresh or dried leaf as tea, covered so the aroma stays in the cup. A strong cup is still a tea.",
    grow: "Moist soil, a little shade, and a pot if you do not want it everywhere. Mint-family spreader.",
    precautions: [
      "May increase drowsiness with other calming herbs or medicines.",
      "Thyroid conditions: ask a clinician before daily use.",
    ],
    gardenNotes: ["Spreads", "Lemon scent", "Best harvested young"],
  },
  {
    slug: "oregano",
    name: "Oregano",
    latinName: "Origanum vulgare",
    region: "Mediterranean",
    geography: "Europe",
    concerns: ["immunity", "digestion"],
    summary:
      "Kitchen herb first. A warming Mediterranean plant whose leaf is food, tea, and, in concentrated oil, something much stronger.",
    benefits: [
      "Culinary antimicrobial aromatic",
      "Traditional tea for a heavy meal",
      "Sun-loving perennial",
    ],
    traditionalUses:
      "Mediterranean cooking and folk medicine overlap in oregano. The leaf in food is not the same as oregano essential oil.",
    preparation:
      "Fresh or dried leaf in food or tea. Essential oil is not a casual internal remedy.",
    grow: "Sun, grit, and not too much water. A dry-garden perennial.",
    precautions: [
      "Essential oil can irritate tissue. Do not swallow it as a shortcut.",
      "Culinary amounts are the everyday form.",
    ],
    gardenNotes: ["Dry sun", "Kitchen plant", "Oil is concentrated"],
  },
  {
    slug: "rosemary",
    name: "Rosemary",
    latinName: "Salvia rosmarinus",
    region: "Mediterranean",
    geography: "Europe",
    concerns: ["skin", "pain", "energy"],
    summary:
      "A coastal shrub of memory, roast potatoes, and a headache that wants rosemary steam. Culinary, aromatic, and not a miracle nootropic.",
    benefits: [
      "Traditional aromatic for focus and tension",
      "Kitchen herb",
      "Evergreen in mild winters",
    ],
    traditionalUses:
      "Mediterranean households used rosemary as food, scent, and a circulation-warming leaf. The old memory lore is poetry plus a plant, not a prescription.",
    preparation:
      "Leaf in food, tea, or steam. Essential oil is concentrated; a drop on the temple is not a bottle.",
    grow: "Sun, sharp drainage, airflow. Wet feet rot it.",
    precautions: [
      "Essential oil can irritate skin.",
      "Large amounts of leaf tea are still a stimulant-leaning aromatic for some people.",
    ],
    gardenNotes: ["Loves lean soil", "Evergreen shrub", "Low water"],
  },
  {
    slug: "sage",
    name: "Common Sage",
    latinName: "Salvia officinalis",
    region: "Mediterranean",
    geography: "Europe",
    concerns: ["digestion", "stress"],
    summary:
      "Garden sage — the kitchen leaf, not Prairie Sage the guide. A Mediterranean shrub for cooking, a sore throat gargle, and a clarifying cup.",
    benefits: [
      "Culinary leaf",
      "Traditional gargle for a scratchy throat",
      "Aromatic digestive",
    ],
    traditionalUses:
      "European kitchen herbalism treated Salvia officinalis as food and a drying, clarifying plant. It is not the same being as Prairie Sage.",
    preparation:
      "Fresh or dried leaf in food or tea. A gargle is traditional; swallowing a concentrated extract is another decision.",
    grow: "Sun, grit, and a trim after flowering. Woody perennial.",
    precautions: [
      "Culinary amounts are the everyday form.",
      "Concentrated sage or essential oil is not a casual internal remedy, especially in pregnancy.",
    ],
    gardenNotes: ["Kitchen shrub", "Not Prairie Sage", "Dry sun"],
  },
  {
    slug: "st-johns-wort",
    name: "St. John’s Wort",
    latinName: "Hypericum perforatum",
    region: "Europe",
    geography: "Europe",
    concerns: ["stress"],
    summary:
      "A yellow midsummer flower used for low mood and nerve pain in European herbalism. It interacts with many medicines. This is not a casual supermarket herb.",
    benefits: [
      "Traditional support for low mood",
      "Oil used on skin after sun or nerve discomfort",
      "Hedgerow perennial",
    ],
    traditionalUses:
      "European folk practice made a red oil from the flower and used the aerial parts as a tea or extract for the nerves. Modern drug interactions make this a plant to study first.",
    preparation:
      "Dried flowering tops as tea or professional extract. Oil of the flower for unbroken skin. Duration and form belong with a practitioner if you take other medicines.",
    grow: "Sun, poor soil, and it will self-sow. Invasive in some regions — know your local rules.",
    precautions: [
      "Interacts with many medicines, including birth control and antidepressants. Ask a clinician.",
      "Can increase sun sensitivity.",
    ],
    gardenNotes: ["Midsummer flower", "Can self-sow", "Check local invasive status"],
  },
  {
    slug: "turmeric",
    name: "Turmeric",
    latinName: "Curcuma longa",
    region: "South Asia",
    geography: "Asia",
    concerns: ["digestion", "pain", "immunity"],
    summary:
      "A golden rhizome of South Asian food and medicine. Kitchen spice first. High-dose extracts are a later, louder industry.",
    benefits: [
      "Warming culinary spice",
      "Traditional support for aches and digestion",
      "Stains everything it touches",
    ],
    traditionalUses:
      "South Asian food-as-medicine uses fresh and dried rhizome in cooking, milk, and pastes. Isolated curcumin is not the whole plant.",
    preparation:
      "Fresh grated root or dried powder in food. Black pepper and fat are the usual kitchen companions. Extracts vary widely.",
    grow: "Tropical understory: warmth, humidity, rich soil. A pot in a bright window can yield a modest rhizome.",
    precautions: [
      "May not suit people with gallstones or those on blood-thinning medicines — ask a clinician.",
      "High-dose extracts can upset the stomach.",
    ],
    gardenNotes: ["Warmth lover", "Harvest the rhizome", "Kitchen plant"],
  },
  {
    slug: "thyme",
    name: "Thyme",
    latinName: "Thymus vulgaris",
    region: "Mediterranean",
    geography: "Europe",
    concerns: ["digestion", "immunity", "skin"],
    summary:
      "A low Mediterranean shrub for roast vegetables and a steamy cup when the chest feels tight. Culinary amounts are the everyday medicine.",
    benefits: [
      "Kitchen herb",
      "Traditional tea for a congested chest",
      "Antimicrobial aromatic reputation",
    ],
    traditionalUses:
      "Mediterranean cooking and household herbalism share thyme. Steam and tea are older than a bottle of oil.",
    preparation:
      "Fresh or dried leaf as tea, food, or steam. Essential oil is concentrated and not a casual internal remedy.",
    grow: "Sun, grit, airflow. A creeping woody perennial that hates wet feet.",
    precautions: [
      "Essential oil can irritate tissue.",
      "Culinary and tea amounts are the usual form.",
    ],
    gardenNotes: ["Dry sun", "Kitchen plant", "Low water"],
  },
  {
    slug: "valerian",
    name: "Valerian",
    latinName: "Valeriana officinalis",
    region: "Europe",
    geography: "Europe",
    concerns: ["sleep"],
    summary:
      "A tall European meadow plant whose root smells like old socks and sleep. Used when the body will not drop into the night.",
    benefits: [
      "Traditional root for restless sleep",
      "Meadow perennial",
      "Not a gentle floral tea — the root is the medicine",
    ],
    traditionalUses:
      "European herbalism used dried valerian root for nervous unrest and sleeplessness. The smell is part of the identification test.",
    preparation:
      "Dried root as tea, tincture, or professional extract. Evening use is common. Do not stack blindly with other sedating plants or medicines.",
    grow: "Moist soil, sun to part shade. Tall flowering stems; harvest root from mature plants.",
    precautions: [
      "May increase drowsiness. Do not drive until you know how you respond.",
      "Some people feel wired instead of sleepy. Stop if that happens.",
    ],
    gardenNotes: ["Meadow plant", "Root harvest", "Pungent dried root"],
  },
  {
    slug: "mullein",
    name: "Mullein",
    latinName: "Verbascum thapsus",
    region: "Europe",
    geography: "Europe",
    concerns: ["immunity", "digestion"],
    summary:
      "Woolly mullein. A biennial torch of felted leaves, used as a strained tea for the lungs. The hairs must be filtered out.",
    benefits: [
      "Traditional lung tea",
      "Architectural biennial",
      "Dry-ground colonizer",
    ],
    traditionalUses:
      "European folk practice used mullein leaf (well strained) for dry, irritated breathing. Flower oil has a separate ear-oil tradition that still needs a clinician’s ear exam first.",
    preparation:
      "Dried leaf as tea, strained through cloth so the hairs do not irritate the throat. Do not pour oil in an ear with a possible perforation.",
    grow: "Sun, poor soil, disturbance. A first-year rosette, a second-year spike.",
    precautions: [
      "Strain the tea. Unfiltered hairs irritate.",
      "Ear oil is not a substitute for examining the eardrum.",
    ],
    gardenNotes: ["Biennial", "Felted leaf", "Strain the tea"],
  },
  {
    slug: "callisia",
    name: "Callisia",
    latinName: "Callisia fragrans",
    region: "Americas",
    geography: "Americas",
    concerns: ["skin"],
    summary:
      "Basket plant / inch plant. A trailing houseplant whose fleshy leaves show up in folk skin and joint traditions. This card is identification first.",
    benefits: [
      "Traditional leaf for topical folk use",
      "Easy trailing houseplant",
      "Fragrant flowers when it blooms",
    ],
    traditionalUses:
      "Callisia fragrans appears in Mesoamerican and later folk use as a fleshy leaf for skin. Evidence and safety for internal use are not settled here.",
    preparation:
      "This prototype treats it as a plant to learn, not a homemade internal remedy. Topical folk use should still be patch-tested.",
    grow: "Bright indoor light, ordinary potting mix, and it will trail. Easy to propagate from cuttings.",
    precautions: [
      "Internal use is not a casual experiment.",
      "Allergy and irritation are possible on skin.",
    ],
    gardenNotes: ["Houseplant", "Trailing", "Learn before you dose"],
  },
  {
    slug: "datura",
    name: "Datura",
    latinName: "Datura innoxia",
    region: "Americas",
    geography: "Americas",
    concerns: ["pain"],
    summary:
      "A nightshade with a trumpet flower and spiny seed pods. Historically used, and historically deadly. This card is identification and caution, not a recipe.",
    benefits: [
      "Plant identification",
      "A reminder that not every healing-looking flower is kind",
      "Traditional use exists — safe home use does not",
    ],
    traditionalUses:
      "Several Datura species appear in Indigenous American and later folk histories as powerful, dangerous plants. That history is not an invitation to brew the seeds.",
    preparation:
      "Do not prepare this plant as tea, smoke, or food. There is no beginner dose.",
    grow: "If you grow it as an ornamental, keep seeds away from children and pets. Gloves for handling are wise.",
    precautions: [
      "All parts can be toxic. Hallucination, fever, and death are documented.",
      "This is not a sleep plant, a pain plant, or a ritual DIY.",
    ],
    gardenNotes: ["Toxic", "Identification only", "Keep seeds away from children"],
  },
  {
    slug: "dandelion",
    name: "Dandelion",
    latinName: "Taraxacum officinale",
    region: "Europe",
    geography: "Europe",
    concerns: ["liver", "digestion"],
    summary:
      "The lawn plant people pay to kill and herbalists pay to harvest. Leaf as a bitter green, root as a roasted digestive, flower as a short spring sun.",
    benefits: [
      "Bitter leaf for digestion",
      "Traditional root for liver and spring sluggishness",
      "Everywhere, if you let it be",
    ],
    traditionalUses:
      "European folk practice ate the young leaf, roasted the root, and made wine from the flower. A diuretic reputation is part of the old name piss-a-bed.",
    preparation:
      "Young leaf in salad or tea. Root dried and decocted or roasted. Harvest from clean ground, not a sprayed lawn.",
    grow: "It will grow whether you invite it or not. Deep taproot. Leave some for bees.",
    precautions: [
      "Aster family allergy.",
      "Diuretic effect is real for some people. Ask a clinician if you take medicines that affect fluid or potassium.",
    ],
    gardenNotes: ["Taproot", "Bee plant", "Do not harvest sprayed lawns"],
  },
  {
    slug: "fig",
    name: "Fig",
    latinName: "Ficus carica",
    region: "Mediterranean",
    geography: "Europe",
    concerns: ["digestion"],
    summary:
      "A Mediterranean fruit tree. Fresh or dried fig is food-as-gentle-laxative more than a capsule. The leaf has its own, quieter traditions.",
    benefits: [
      "Gentle fruit for sluggish digestion",
      "Shade and fruit in a warm garden",
      "Leaf and latex are a different, more irritating story",
    ],
    traditionalUses:
      "Mediterranean tables treated fig as food and a household remedy for constipation. Latex from the tree can irritate skin.",
    preparation:
      "Ripe fruit, fresh or dried, as food. This prototype does not recommend the sap as a homemade medicine.",
    grow: "Sun, heat, and a wall if your winters are cold. Roots are ambitious.",
    precautions: [
      "Fig latex can irritate skin and eyes.",
      "Fruit is food; sap is not a casual topical.",
    ],
    gardenNotes: ["Fruit tree", "Wants heat", "Latex irritates"],
  },
  {
    slug: "nettle",
    name: "Nettle",
    latinName: "Urtica dioica",
    region: "Europe",
    geography: "Europe",
    concerns: ["skin", "immunity"],
    summary:
      "Stinging nettle. A mineral-rich spring green once you cook the sting out. Gloves for harvest. Respect after that.",
    benefits: [
      "Cooked spring green",
      "Traditional tea for seasonal skin and joints",
      "Wildlife and fiber plant",
    ],
    traditionalUses:
      "European households ate young nettle as a pot herb and drank the dried leaf. The sting is formic and mechanical — cook or dry it and the sting goes.",
    preparation:
      "Young tops cooked as food, or dried leaf as tea. Harvest with gloves. Do not eat raw stinging leaves.",
    grow: "Moist, nitrogen-rich ground. It will make a patch. Butterflies use it.",
    precautions: [
      "Fresh plant stings. Gloves.",
      "Seed and root are different preparations than leaf — learn which part you have.",
    ],
    gardenNotes: ["Gloves", "Cook the sting out", "Patch-forming"],
  },
  {
    slug: "feverfew",
    name: "Feverfew",
    latinName: "Tanacetum parthenium",
    region: "Europe",
    geography: "Europe",
    concerns: ["pain"],
    summary:
      "A small daisy used in European herbalism for recurrent headache. Bitter leaf. Not a rescue pill for a migraine already in progress.",
    benefits: [
      "Traditional leaf for recurrent headache",
      "Bitter garden daisy",
      "Easy short-lived perennial",
    ],
    traditionalUses:
      "European herbal practice chewed or tinctured feverfew leaf as a preventive companion for people who knew their headache pattern.",
    preparation:
      "Fresh or dried leaf as tea or tincture. The leaf is bitter. This is not an aspirin substitute in the moment of pain.",
    grow: "Sun, ordinary soil, and it self-sows. A cottage-garden plant.",
    precautions: [
      "Aster family allergy.",
      "Can cause mouth sores if chewed fresh. Not for pregnancy.",
    ],
    gardenNotes: ["Self-sows", "Bitter leaf", "Cottage garden"],
  },
  {
    slug: "parsley",
    name: "Parsley",
    latinName: "Petroselinum crispum",
    region: "Mediterranean",
    geography: "Europe",
    concerns: ["digestion"],
    summary:
      "The garnish that is also a mineral-green. Culinary first. Concentrated parsley or the essential oil is another, stronger plant.",
    benefits: [
      "Culinary green",
      "Traditional after-meal chew",
      "Biennial in the garden",
    ],
    traditionalUses:
      "Mediterranean cooking used parsley as food and a fresh digestive chew. Folk diuretic use of strong teas is not the same as a sprinkle on potatoes.",
    preparation:
      "Fresh leaf as food. Strong teas and seed preparations are more potent and need more caution, especially in pregnancy.",
    grow: "Moist, rich soil, sun to part shade. Soak seed; it is slow to germinate.",
    precautions: [
      "Culinary amounts are the everyday form.",
      "Concentrated parsley, especially seed, is not a casual pregnancy tea.",
    ],
    gardenNotes: ["Biennial", "Slow seed", "Kitchen plant"],
  },
  {
    slug: "spearmint",
    name: "Spearmint",
    latinName: "Mentha spicata",
    region: "Europe",
    geography: "Europe",
    concerns: ["digestion"],
    summary:
      "The sweeter mint. Garden tea and lamb-sauce plant. Gentler than peppermint for some stomachs, still a spreading mint.",
    benefits: [
      "After-meal tea",
      "Culinary mint",
      "Softer aroma than peppermint",
    ],
    traditionalUses:
      "European gardens kept spearmint for tea and food. It is the mint of tabbouleh and a milder cup than peppermint.",
    preparation:
      "Fresh or dried leaf as tea or food. Contain the roots.",
    grow: "Moisture, a little shade, a pot. It will run if you let it.",
    precautions: [
      "May worsen reflux in some people, though often less than peppermint.",
      "Essential oil is still concentrated.",
    ],
    gardenNotes: ["Spreads", "Best in pots", "Kitchen mint"],
  },
  {
    slug: "water-mint",
    name: "Water Mint",
    latinName: "Mentha aquatica",
    region: "Europe",
    geography: "Europe",
    concerns: ["digestion"],
    summary:
      "A wild mint of wet ground, round lilac flower heads, and a true mint smell. Identification plant for ditches and pond edges — not a supermarket packet.",
    benefits: [
      "Traditional mint tea of wet places",
      "Pollinator flower",
      "Waterside identifications",
    ],
    traditionalUses:
      "European wetland mint was used like other mints: tea, scent, and a digestive leaf. Know you have Mentha, not a look-alike, before you brew a ditch plant.",
    preparation:
      "Leaf as tea from a known, clean stand. Do not harvest from polluted water edges.",
    grow: "Wet soil, pond margins, sun. Aggressive where happy.",
    precautions: [
      "Harvest only from clean water. Ditch mint can carry what the water carries.",
      "Mint-family essential oils are not casual internal remedies.",
    ],
    gardenNotes: ["Wet ground", "Wild mint", "Clean harvest only"],
  },
];
