/*
 * Central config for the macOS desktop.
 * Everything you'd want to edit — wallpaper, dock layout, system specs, and
 * all placeholder app content — lives in this one file.
 */

/* ---- Apps ------------------------------------------------------------- */

/** Apps that can actually open as windows. */
export type AppId = "notes" | "messages" | "reminders" | "photos" | "claude";

/** Every icon that appears in the dock. Decorative ones never open. */
export type DockIconId = "finder" | "safari" | "mail" | "settings" | AppId;

export interface DockApp {
  id: DockIconId;
  name: string;
  /** Only apps with `opens: true` launch a window when clicked. */
  opens: boolean;
}

/** Dock order, left to right. Add/remove/reorder entries freely. */
export const DOCK_APPS: DockApp[] = [
  { id: "finder", name: "Finder", opens: false },
  { id: "safari", name: "Safari", opens: false },
  { id: "mail", name: "Mail", opens: false },
  { id: "messages", name: "Messages", opens: true },
  { id: "notes", name: "Notes", opens: true },
  { id: "reminders", name: "Reminders", opens: true },
  { id: "claude", name: "Claude", opens: true },
  { id: "photos", name: "Photos", opens: true },
  { id: "settings", name: "System Settings", opens: false },
];

/* ---- Wallpaper ---------------------------------------------------------
   Any valid CSS `background` value works here — swap in an image with
   `url("/images/wallpaper.jpg") center / cover no-repeat` if you prefer. */

export const WALLPAPER = {
  light: `radial-gradient(120% 90% at 15% 0%, #a7c4ec 0%, transparent 55%),
          radial-gradient(110% 80% at 90% 10%, #c9b8e8 0%, transparent 50%),
          radial-gradient(130% 100% at 50% 110%, #f0b98d 0%, transparent 55%),
          linear-gradient(165deg, #7ea6da 0%, #9db4e2 35%, #c4b3d9 60%, #e2af97 100%)`,
  dark: `radial-gradient(120% 90% at 15% 0%, #1d2c4f 0%, transparent 55%),
         radial-gradient(110% 80% at 90% 10%, #35284f 0%, transparent 50%),
         radial-gradient(130% 100% at 50% 115%, #6d3f2e 0%, transparent 50%),
         linear-gradient(165deg, #101a33 0%, #1a2342 40%, #2b2547 65%, #3a2b33 100%)`,
};

/* ---- Menu bar status popovers -------------------------------------------
   Shown when hovering the battery / wifi icons in the menu bar.
   Purely visual set dressing — edit freely. */

export const BATTERY = {
  percent: 87,
  powerSource: "Battery",
  /** Which energy mode shows the checkmark. */
  energyMode: "Automatic" as "Low Power" | "Automatic" | "High Power",
  /** Apps listed under "Using Significant Energy". */
  significantEnergyApps: ["Claude", "Google Chrome"],
};

export const WIFI = {
  /** The network shown as connected (blue icon + checkmark). */
  connected: "Fish and Chips",
  /** Nearby networks listed under "Other Networks". */
  otherNetworks: [
    "Pretty Fly for a Wi-Fi",
    "Abraham Linksys",
    "The LAN Before Time",
    "Drop It Like It's Hotspot",
    "Definitely Not an FBI Van",
    "Click here for Virus",
  ],
};

/* ---- "About This Mac" --------------------------------------------------- */

export const SYSTEM_INFO = {
  deviceName: "MacBook Pro",
  deviceSubtitle: "14-inch, 2026",
  chip: "Apple M5 Pro",
  memory: "48 GB",
  startupDisk: "Macintosh HD",
  serial: "C02K5PROVL48",
  osName: "macOS Tahoe",
  osVersion: "Version 26.5",
};

/* ---- Notes --------------------------------------------------------------
   SEED data for the Notes app. These entries populate localStorage ONCE on
   first visit; after that, all edits live in the browser (key
   "desktop:notes:v1"). To re-seed after editing this list, clear that
   localStorage key (or bump the version in storage.ts).
   Sidebar previews and dates are derived automatically from the body and
   last-edit time. */

export interface Note {
  id: string;
  /** "Pinned" seeds the note as pinned; anything else is a regular note. */
  folder: string;
  title: string;
  /** Original publish date (YYYY-MM-DD) — becomes the note's shown date. */
  date?: string;
  /** Markdown paragraphs. Supports #/##/### headings, **bold**, *italic*,
      [links](https://…), ![images](/path), > blockquotes, - lists, --- rules. */
  body: string[];
}

/* The first (pinned) note is the biography from the About Me page; the rest
   are the blog posts from /blog, one note per post, imported verbatim. */
export const NOTES: Note[] = [
  {
    id: "bio",
    folder: "Pinned",
    title: "Hi, I'm Vanessa.",
    body: [
      `Welcome to my personal website. This is a space for my thoughts, projects, and things I find interesting.`,
      `I am currently an explorer at [Savant](https://www.savantvc.com/), a community of founders embarking on hardware quests. I am working with Diana at [Y Combinator](https://www.ycombinator.com/verify/rei5gdcejhyco2d9) as a W27 company. On the investing side, I am a [scout](https://en.wikipedia.org/wiki/Truffle_pig) for [Zetta Venture Partners](https://www.zettavp.com/), an AI-native VC firm investing in pre-seed/seed stage. I am also a member of [V11](https://www.linkedin.com/company/velocityeleven/about/), a talent community of builders. I have angel invested in a few of my friends' companies. I was previously in the female founders [circle](https://pear.vc/programs/female-founder-circles/) at Pear VC.`,
      `A few years ago I decided to take a gap year in college to tinker and ended up spending a year working at the Space Exploration Technologies Corporation ([SpaceX](https://www.spacex.com/)), where I implemented a refurbishment program for returned Starlink antennas and routers which saved the company millions of dollars in printed circuit board costs, the most expensive component. I also worked on the development of Starlink mini routers.`,
      `In college, I ran the Yale Undergraduate Venture Group and grew it to 70+ members. I was a frequent visitor of [The Elm Institute](https://www.elminstitute.org/), where I discussed philosophy and divinity at Yale.`,
      `I was a first-gen immigrant who knew nothing about the US before moving here. Now I am happy to call San Francisco home.`,
      `[GitHub](https://github.com/VANESSA123LI) · [LinkedIn](https://www.linkedin.com/in/vanessa1li) · [Twitter](https://www.x.com/cyvanessali) · [Signal](https://signal.me/#eu/W2D5X3lDfa88G2ozCcKjSXAsEcRTFgxJOEQmbFzzoFRshfLQR7RAu5KSOcgJovTp)`,
    ],
  },
  {
    id: "personal-1",
    folder: "Personal",
    title: "Occupying Mars",
    date: "2024-05-05",
    body: [
      `*Why we should expand human consciousness in space.*\n*Personal · Vanessa Li · May 2024*`,
      `In the grand tapestry of the cosmos, humanity's existence is but a fleeting moment. Homo Sapiens has been around for 300,000 years, which is [0.007%](https://carnegiemnh.org/earth-history-in-your-hand/#:~:text=A%20long%20time%20ago%E2%80%A6,planet%20%284.5%20billion%20years%29) of Earth's 4.5 billion-year timeline. Humanity is so fortunate to exist, but is vulnerable to extinction. Like a flickering candle flame, any gust of wind can extinguish the flame. History reminds us that any civilization could go extinct, as many once powerful empires have. Elon Musk founded SpaceX with the ambitious goal of enabling life on Mars, aiming to preserve the fragile and invaluable human consciousness.`,
      `Occupying Mars goes beyond expanding our living space. Some may think that we have plenty of problems to worry about on earth, why bother with the extraterrestrial? The answer lies in the limitless possibilities in the outer world. There are known unknowns, and unknown unknown waiting for us ahead. Known unknowns are the things that we know that we don't know. Unknown unknowns are the things that we can't even imagine. There are mysteries that awaits us in the uncharted territories of the universe. And Our goal is nothing less than a complete description of the universe we live in (as Stephen Hawking said in The Brief History of Time). We won't fully understand the benefits of exploring the universe until we venture into the unknown and explore the boundaries of our familiar world. We might be able to find unexpected insights and groundbreaking knowledge. The journey towards that mission is a long and arduous one, but we are making progress. There is nothing engineering cannot achieve, and we are getting closer everyday.`,
      `Ad Astra per Aspera.`,
      `The global space economy has reached more than $500M in 2023 with private companies emerging as crucial drivers of space missions. Compared to federal agencies, private companies have proven to be more efficient in leading innovative initiatives, perhaps driven by a more fervent commitment to their missions and more effort to control cost. I am highly optimistic that startups are the powerhouse of innovation and that incumbent players must support them. As highlighted in [The Three-Body Problem](https://en.wikipedia.org/wiki/The_Three-Body_Problem_%28novel%29), science is humanity's greatest strength. To halt our progress, aliens (the San-Ti) had to kill our science. It becomes evident that our pursuit of innovation is paramount to our survival as a species.`,
      `Driving down the launch expenses is the key to opening doors for sustainable exploration. SpaceX has done a great job in making rockets reusable. Startups are driven by the need to survive in a competitive market, so they are incentivized to minimize cost to keep themselves alive. The cost problem is best solved by private companies because federal agencies like NASA often fund projects based on government priorities rather than market forces, leading to less pressure to economize. Private companies also tend to be a leaner leadership ([space.com](https://www.space.com/nasa-private-companies-moon-race.html)). The collaboration between NASA and private firms is essential because it leverages NASA's regulatory framework with private sector's efficiency. Private companies are further driven to lower cost from NASA [fixed-price contracts](https://www.cnbc.com/2022/05/03/nasas-nelson-competitive-contracts-are-making-space-exploration-cheaper.html). Fixed-price contracts set a price upfront for what NASA is willing to pay for a project. SpaceX's starship, for example, operates under a fixed price deal with NASA. This arrangement motivates SpaceX to minimize project costs, allowing them to retain any savings as investment in other projects. Reducing the costs for space delivery is essential to making interplanetary life possible. There are industries yet to be created, such as fields like space agriculture, space medicine, interplanetary delivery, space tourism, space waste management, terraforming mars, asteroid mining, deep-space communication, and more. They all rely on sustainable transportation in outer space.`,
      `![Falcon rocket launch on April 1st, 2024, seen from Southern California](/images/falcon-rocket-launch-april-2024.jpg)`,
      `*Falcon rocket launch on April 1st, 2024, seen from Southern California.*`,
      `---`,
      `When I watched the Starship launch from SpaceX's mission control in the headquarters, I was swept away by waves of awe as it ascended to orbit. Carrying my little laptop with me and dressed in sweatpants from my sleep, I wanted to watch us taking a step further for humanity. There were around 60 employees gathered around the mission control room. All energetic and excited for the launch, despite being 5am and I knew that no one slept well. The countdown filled me with the same anticipation as the moment just before a roller coaster plunges down its first drop. 5,4,3,2,1… People rallied exuberantly. In that fleeting moment, we were united in wonder, witnessing the extraordinary power of space exploration.`,
      `The flames formed bubbles of ashes that looked like dirty cotton candy, and up the rocket went. Plumes of exhaust trailed behind, swirling against the deepening sky. I watched through the cameras as the rocket ascended further away from Earth. I wondered what it would feel like to watch earth from a faraway distance. How would I feel leaving home to go somewhere very, very far away? Maybe that will come one day, hopefully within my lifetime.`,
      `I never knew that watching kerosene combust through reaction with liquid oxygen can be so mesmerizing. One of my favorite quotes was that life is not measured by the number of breaths we take, but by the moments that take our breath away, and this was one of the moments that took my breath away.`,
      `![Wearing the Occupy Mars T-shirt in front of a Falcon 9 booster](https://substack-post-media.s3.amazonaws.com/public/images/e7b487b3-f16e-4aa7-8375-b01257c5e9d0_3088x2316.jpeg)`,
      `*This is me wearing the Occupy Mars T-shirt in front of a Falcon 9 booster.*`,
      `> Mankind was born on Earth. It was never meant to die here. — Interstellar`,
    ],
  },
  {
    id: "personal-2",
    folder: "Personal",
    title: "Velocity",
    date: "2025-07-15",
    body: [
      `*What happens when your plan falls apart*\n*Personal · Vanessa Li · July 2025*`,
      `You know how airlines offer $5 death insurance in case your plane crashes—something you would laugh at and never buy because – honestly – what are the odds? Except this time, against all odds, my plane actually crashed.`,
      `I graduated from Yale in May and was looking forward to joining one of the fastest growing AI companies. I started recruiting early on before senior year because the sense of security allowed me to explore other things. I thought that it would buy me some time while I tinker with my side projects.`,
      `Senior year of college was perhaps the best year of my life. I lived life to the fullest, building fun projects and choreographing contemporary dance pieces, knowing that I don't need to worry about recruiting since I have the offer in my pocket. Scale AI gave me an offer in October 2024 and after rounds of negotiation, I signed the offer with them on November 23, 2024, the morning before I left New Haven for the Harvard-Yale game at Boston. I turned down my competing offers and stopped recruiting since then. I could have continued to recruit, but I wasn't trying to collect all the offers in the world. Scale was the perfect fit for me. I knew that I want to work in a fast-paced, high-growth environment with ambitious entrepreneurs to build the future. Location was really important to me too. Having done international internships, I know that my heart belongs to NY (or SF). I am a gladiator, and NY is Rome. The offer came with the option to choose either city. I spent weeks thinking about it. I love both cities and it was a really tough decision. I eventually chose NYC because I wanted to live with my Yale friends. We spent months looking for an apartment together and landed on a high-rise unit overlooking the Hudson River. We were very lucky and look forward to hanging out.`,
      `Around late June, Meta invested $14.3 billion in Scale AI, taking a 49% stake in the company. I was disappointed that Alex Wang left as a part of the deal. I think he is a great CEO. I didn't foresee any problem with this. Scale was still hiring very aggressively at the time.`,
      `A company is never the same after a major event. On July 17th, I woke up to the news that Scale laid off 14% of the company. Jason Droege, CEO of Scale AI, explained that "we ramped up our GenAI capacity too quickly over the past year". The Gen AI business sector took the biggest hit in this corporate restructuring. My guess is that many companies stopped doing business with Scale for the fear that Meta will have access to their private data. I was a bit worried so I texted my Scale manager that day. He said that everything was fine. I was relieved and looked forward to seeing him soon.`,
      `A day later, at 12:19 PM PST, I received an email with the subject line Update on your role at Scale.`,
      `Oh no, I thought to myself.`,
      `I panicked. I immediately opened Discord to text the incoming cohort. Our offers were all rescinded. I DMed a few colleagues. We were all going insane.`,
      `You know that feeling when your world suddenly falls apart and you can't believe it's real? The reality took a few hours to sink in.`,
      `Scale being sold to Meta wasn't all that surprising but what were the chances that Meta wanted to buy Scale NOW AND the company would undergo corporate restructuring AND specifically the Gen AI business would be hit the hardest AND Gen AI just happens to be my team AND it is all happening at this time right before I join? There are so many and's, or unions, in this set that I thought the probability was miniscule.`,
      `I avoided my parents because I couldn't tell them. I hadn't sat down at the dinner table with them for days for the fear that I would have to tell them. I didn't want my worry to become theirs. The first person I reached out to was my mentor at Sequoia Capital, who was incredibly helpful and reassured me that I would be ok, even though I really couldn't believe him that I would be at the time. In moments when the ground feels like it's shifting, having even one steady voice can make a difference. Someone who lends you their conviction until you can find your own again.`,
      `That night, I went out for a drive. I needed to get out of the house. I put the car on autopilot to drive itself to a random park nearby. In the car, I couldn't hold back my tears. I cried because I was so scared. I didn't know what to do. I could barely see the road. The GPS of my life was gone, and I had to chart the path myself. Part of my fear was the uncertainty, another part was financial obligation. Burning savings is a scary thing. I really don't want to do that. Scale's compensation was very competitive. Without Scale, I could no longer afford my apartment rent. I missed the hiring pipeline for so many other opportunities I would have applied to if I hadn't signed with Scale. I stopped recruiting seriously and didn't even bother applying to roles I desperately want now. I also turned down multiple offers for Scale that I couldn't go back to.`,
      `It was too late. What should I do?`,
      `> "When you find yourself trapped in a swamp… you must get out before you hit the bottom." – Vincenzo`,
      `Maybe it was time to take the leap to be a founder. I have always wanted to be a founder, to build a product that people love, to change the way we think and work. Suddenly, there was nothing holding me back. There were no classes that I had to spend time on, no exams to prepare for, no club meetings to attend. I could finally delve deep into one of my side projects. But when this option was here, and I actually had to make the leap, it felt so scary. Am I really going to go full time on my not profitable apps that I was just making for fun? I am just a generalist. I've never been afraid of anything, but for the first time in a long while, I felt fear. It was like that split second before a roller coaster plunges — the exhilarating rush of anticipation turning into panic. But roller coasters are fun because you know you'll be fine. I didn't feel like I will be fine.`,
      `I called a friend and explained my situation.`,
      `"What's your upside, what's your downside, and what's your runway?"`,
      `I thought about it, and frankly, I didn't have too much downside. My runway was long enough that I wasn't going to starve tomorrow. Most of my fears were just illusions. And besides, I've always approached life like an optimization problem.`,
      `For most of my life, I wanted to be a robot. I used the laws of physics to perfect myself. If the faster an object moves, the slower time moves for it, then maybe I could slow down time by moving faster. I put this theory into practice: thinking fast, moving fast, reacting fast. To squeeze more productivity out of every minute, I paired tasks that used different parts of the brain, drank nootropics, chased "Silicon Valley elixirs," and was a fan of premium water even before Saratoga became a meme.`,
      `But I'm not a robot. I'm not perfect. And for the first time, I'm okay with that.`,
      `For years, I treated emotions like bugs in my operating system. I measured my worth in output, in how many things I could do in the smallest unit of time. Losing the job offer forced me to slow down, to feel things I outpaced.`,
      `So many students are obsessed with hyper-productivity because we've been raised in an environment where every minute feels like it has to count toward something measurable. We grew up in a gamified world — grades, rankings, competitions, internships — where output was the scoreboard. For me, it wasn't just external pressure. I genuinely loved optimizing. That mindset worked — for a while. It got me into Yale, landed me prestigious internships, and set me up for a smooth launch. But all of a sudden, my momentum slammed into a wall. I was disoriented. The cost of running life on a treadmill is that we're built for constant motion — and when the system crashes, we have no idea how to reboot.`,
      `I've stepped off the conveyor belt. From here on out, there's no autopilot. I have to take the wheel myself and be ready to pivot. It's a strange feeling, liberating and unnerving all at once, because every decision from here on out is mine, and so are the consequences. I don't know exactly what I'll do next, but I've handled enough unexpected turns to know I can navigate the next one.`,
    ],
  },
  {
    id: "personal-3",
    folder: "Personal",
    title: "Coming soon",
    date: "2026-02-03",
    body: [`*Personal · February 2026*`],
  },
  {
    id: "personal-4",
    folder: "Personal",
    title: "Coming soon",
    date: "2026-02-02",
    body: [`*Personal · February 2026*`],
  },
  {
    id: "personal-5",
    folder: "Personal",
    title: "Coming soon",
    date: "2026-02-01",
    body: [`*Personal · February 2026*`],
  },
  {
    id: "world-1",
    folder: "World",
    title: "FTX and the future of crypto",
    date: "2022-12-15",
    body: [
      `*World · December 2022*`,
      `The failure of FTX has left a deep scar on the crypto industry. SBF was once praised for being the leader in crypto exchange and had promised to donate millions of dollars to charity. His empire vanished in one night. It was basically a bank run. Investors lost confidence in FTX after finding out that FTX was connected to Alameda Research, which uses FTT coins as collateral to take out billions of debt in order to fund their crypto investments. Cypto winter 2022 drove prices down due to our bearish macroeconomic conditions. Alameda Research lost billions in their crypto investments. It's mind-blowing how fast everything went down. How fast investors were to pull their money out of FTX and how fast the bank run caused a bankruptcy.`,
      `From a VC's point of view, it is hard to assure LPs now why they backed FTX. A lack of throughout due diligence? Some one should have seen their troubling balance sheet. In my opinion, this points to the shortfall of the VC industry, where investors invest based on KPIs, which are often noises around true growth. Crypto reached its peak in 2020. It was a party! (literally, have you seen how many crypto-themed happy hours there were?) I loved going to those. And I didn't even know any technicals to fit in beyond name dropping words like crypto, web3, blockchain, NFT….(I have to give credit to Sequoia for doing their due diligence properly and not be swayed by the outside noise.)`,
      `I strongly believe that it's time to keep our heads down and work on the technology itself. Any startup succeed by quietly building, not be attracting fame and making noice.`,
      `Another result of the FTX downfall is a call for stricter regulation in the crypto industry. Crypto prides itself to be central-less, ungoverned platform. It has no tangible backing and its value exists only because people believe it to be. Once their trust falls, it spirals out of control. Regulators are always a step behind to regulate what they should. They're never early to the game because they can't set rules before knowing what it is. Now that the necessity for regulation is clear, don't expect DeFi to be 100% decentralized.`,
      `Perhaps to greatest lesson is don't take shortcuts. Build steadily. Now is the time to cut out noises and focus on its fundamental technology.`,
    ],
  },
  {
    id: "world-2",
    folder: "World",
    title: "The Future of US Regulations on Generative AI",
    date: "2023-06-05",
    body: [
      `*World · Vanessa Li · June 2023*`,
      `![Generative AI Conference in San Francisco in June 2023](https://substack-post-media.s3.amazonaws.com/public/images/5898ed17-c8c2-4be9-afe4-e62f6fa1a677_800x516.png)`,
      `*Generative AI Conference in San Francisco in June 2023.*`,
      `Washington DC is flooded with AI discussions. Executives cannot shut up about it. Technological innovations happen exponentially, and we have just arrived at the tip of a new wave. Artificial intelligence has been around for decades. It dates back to the 20th century. Famous computer scientist Alan Turing laid the groundwork for artificial intelligence, starting with the Turing Test, which is a theoretical experiment to determine a machine's ability to exhibit intelligent behavior indistinguishable from that of a human. The rapid adoption of AI technology today is due to the increased capabilities of processing power. Ever since the release of ChatGPT in November 2022, AI has taken the world by storm.`,
      `Many speculate that AI is just another bubble. But unlike the ponzi scheme that cryptocurrencies managed to pull off, AI has proven its value through the vast users and revenue base. It makes workers more productive and firms more efficient. The biggest drawback is not whether AI overpromises, it is about when it can deliver its promise.`,
      `Investors are jumping into the AI gold rush, harnessing rich profits from the technology's potential. A Pwc predicts that AI will add $16trn to the global economy by 2030. The conversations around AI end up in the white house as a part of the regulatory plan. Crypto became heavily regulated by the government and banned in some countries after its damaging effect became known. Policy makers have learned their lesson on the necessity of regulation and spun into action as soon as AI became prominent.`,
      `Although there is still much to be done in the field for it to be a reliable tool, as this new technology takes shape, policy makers are keen to manage the potential impact it has. On May 16th, 2023, the U.S. Senate conducted a hearing to discuss the regulation of AI. How the government chooses to regulate ChatGPT, and AI in general, will affect innovations around AI considerably.`,
      `> **We will need different regulations for different sectors**`,
      `Regulation of the potentially detrimental risks of AI is definitely necessary. However, the process is still unclear and complicated. The General Consul of Google Deepmind Tom Lue spoke at a generative AI conference this month, and proposed that effective regulation requires public-private partnerships. Most importantly, we will need different regulations for different sectors. AI is a tool that can be used very differently across sectors. There will not be one-law-fits-all. Sectors like healthcare and biotechnology are traditionally heavily regulated, and it would be the same with AI applications. Allowing each sector to adopt AI as it sees fit gives more autonomy in the hands of individual regulators and founders. This approach will make sure that regulations are innovation-friendly.`,
      `Given the rapid development of AI, regulators must catch up with the speed of innovation, while not being overprotective. Legislators also proposed a regulatory sandbox, which is a controlled environment for new AI tech to be tested before deployment. This concept is much like having clinical trials in biotech, ensuring a high level of safety.`,
      `> **The future is created with AI, not by AI.**`,
      `We are far from being replaced by AI. Human power is still much needed in professional settings because AI itself does not provide enough confidence for users. In the recent court case of Robert Mata Vs. Avianca Airline, Mata's lawyer Mr. Schwartz filed an error-filled brief on his behalf using ChatGPT. Chat made up legal contents, which diminishes its reputation for being a reliable tool. At the end of the day, humans should remain in full control over the material they choose to deliver and decisions they choose to make. AI simply accelerates our processes. I believe that the future is created with AI, not by AI. This is just the beginning of an AI revolution. There is still so much to be done, but we're heading in the right direction.`,
    ],
  },
  {
    id: "world-3",
    folder: "World",
    title: "Tel Aviv as a Middle Eastern Startup Hub",
    date: "2023-06-15",
    body: [
      `*World · Vanessa Li · June 2023*`,
      `We all know that Silicon Valley is widely recognized as a global hub for technology and innovation. It has been the birthplace of numerous successful startups. However, there are a few less recognized tech locations, from Austin to Miami to Tel Aviv.`,
      `Tel Aviv, Israel is known as a startup center. Israel is actually number one in the world for the most unicorns per capita ([Source](https://www.techaviv.com/unicorns)). It has established itself as a thriving hub for technology and innovation.`,
      `![Tel Aviv startup scene](https://substack-post-media.s3.amazonaws.com/public/images/80472efc-c4df-4bad-b03c-730f1a7114f2_1398x672.png)`,
      `The reasons that made Tel Aviv so successful compared to other middle eastern countries likely relates to its geographical history. According to Deloitte, Israel's unique society and culture, strong economy, government support, and "global-first" market approach establishes its innovation ecosystem. It has fostered a vibrant startup ecosystem with abundant access to capital.`,
      `![Tel Aviv innovation](https://substack-post-media.s3.amazonaws.com/public/images/7884d104-9866-4a42-8474-2fd470aa7c13_1044x594.png)`,
      `> How did Israel, the size of New Jersey, become a startup powerhouse?`,
      `Given the century-long conflict between Israel and Palestine, Israelis were pressured to constantly innovate in order to stay ahead of their competitors in life or death situations. Israel's military is top-notch. Citizens who join the military after high school are given great responsibilities on firearms. In central Tel Aviv, arm-bearing soldiers are visible as they go about their days as usual.`,
      `The Unit 8200 was established as an elite intelligence unit of the Israel Defense Forces (IDF), where members were trained from a young age to become greatest technological engineers. It is known for its rigorous selection process to recruit Israel's brightest minds. It played a critical role in various military and counterterrorism operations, earning its well-deserved reputation as a highly effective and respected intelligence organization. The Unit 8200 has a strong focus on technological innovation, and many of its alums went on to become successful entrepreneurs. There is no doubt that they make the best hackers at hackathons. For example, the CEO of AppsFlyer (where I worked), was a former Israeli military trainee.`,
      `Many venture capital firms look to expand their branch to Israel and increase investments in Israeli startups. General Atlantic has made successful investments in Israel. Insight Partners opened its first Israeli office in Sarona Market in 2019. Toyota Ventures is looking to do the same.`,
      `While Silicon Valley is still the most respected place for ventures, innovation expands beyond the valley with vast opportunities throughout the world.`,
      `![Just walked out of a tech conference](https://substack-post-media.s3.amazonaws.com/public/images/7fead744-651b-40cc-802d-75bf9a5288a7_818x786.png)`,
      `*Just walked out of a tech conference*`,
      `A comprehensive list of Israeli startups can be found at [startupnationcentral.org](https://startupnationcentral.org/)`,
      `Yala Yala!`,
    ],
  },
  {
    id: "world-5",
    folder: "World",
    title: "Goodhart's Law",
    date: "2024-05-15",
    body: [
      `*When a measure becomes a target, it ceases to be a good measure.*\n*World · Vanessa Li · May 2024*`,
      `During British rule in India around the 18th century, the colonial government was concerned about venomous cobra snakes in India. The government decided to incentivize the citizens to kill the cobras in order to reduce its population by handing out rewards for every dead cobra. As time went by, however, individuals began breeding cobras for the purpose of killing them to collect the reward. When the government officials realized what was happening, they scrapped the reward program. Consequently, the cobra breeders, finding no further use for their now worthless snakes, released them into the wild, resulting in an even larger cobra population than before the rewards program started.`,
      `This cobra effect is a prime example of the Goodhart Law: "When a measure becomes a target, it ceases to be a good measure."`,
      `A lot of things in life that we chase are the wrong targets, and that's how we wind up being unhappy.`,
      `GPA was designed to be a measurement, but it became the target for many in college. My classmates would take "gut classes" for the easy A to boost their GPA, giving up the opportunity to have a better education in other classes. Similarly in high school, the number of AP classes were maximized over the quality of education. Since that was what colleges cared about, high school students would do anything to increase their statistics. I often wished that I could just learn without consequences, that I don't have to give up the time to explore a topic for memorizing exam contents. There is just not enough time for everything, and if GPA is the measurement I was supposed to care about, it will always be prioritized over other things.`,
      `The summer of 2019 was the best summer of my life. I was in the Summer Science Program, which was a six-week residential program for students to conduct research. I did biochemistry research. There was so much to learn and I had nothing to worry about. The only job I had was to learn as much as I could. I soaked up knowledge from the lectures and played around with proteins, bacteria, and pipettes in the lab. There was no measurement whatsoever. I had so much fun and there were no grades to worry about.`,
      `I'm not suggesting that we eliminate measurements entirely, but rather that we ensure we're using the right ones. As time went on in college, I came to realize that GPA is the wrong target. What really mattered is what I know. The only thing I should compare myself to is who I was yesterday.`,
      `The biggest warning sign of Goodhart's Law is relying on a single measurement. Statistics always get more accurate with more variables. That's why people who think that having a certain level of wealth will make them happy often end up miserable. A good target always includes a set of thoughtful measurements.`,
      `Spend more time thinking about decisions that matter, about what to really focus on. There is nothing worse than running in the wrong direction. Failing to carefully consider the targets of your life risks waking up one day to the realization that all your efforts have been misdirected.`,
    ],
  },
  {
    id: "world-4",
    folder: "World",
    title: "Voice AI Finds Its Voice",
    date: "2025-08-15",
    body: [
      `*Driving business efficiency with voice agents*\n*World · Vanessa Li · August 2025*`,
      `Since the dawn of time, voice has been our most natural and information-dense form of communication. Every utterance carries more than just words. The tone, pace, emotion reveals our true intent. What once required human interpretation — context, meaning, sentiment — can now be processed instantly by AI. We're archiving enormous amounts of spoken content. Voice has become both the richest data source and the most underutilized one.`,
      `> "Language is the foundation of civilization" – Arrival movie.`,
      `![Movie Arrival](https://substack-post-media.s3.amazonaws.com/public/images/7a363d47-c17f-4613-9a24-9cb6781e372b_500x224.jpeg)`,
      `*Movie Arrival*`,
      `Voice is no longer just a medium of human interaction, it is becoming a machine-readable interface. It has seen a wide adoption from automating customer support and enabling hands-free productivity, to training more human-like AI agents. As the foundational models continue to improve, voice is poised to emerge as the dominant interface between humans and machines.`,
      `People still rely heavily on phone calls. From a customer's perspective, calling the business provider directly after finding the right business online is the fastest way to get what they need, especially in urgent situations. Yet, research revealed that 62% of phone calls to small businesses are left unanswered. 70% of businesses answered less than half of their calls. ([source](https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/))`,
      `## Industry-specific voice solutions`,
      `It's no surprise that many of today's voice AI applications are concentrated in customer service and lead conversion, where businesses handle massive volumes of human interactions. The benefits are immediately seen – faster response times, reduced costs, and improved customer experiences.`,
      `To deliver this value, companies must be industry-focused. Generic voice agents are unable to answer questions specifically related to the business, therefore the agent must be trained on proprietary information, the way a customer service representative would be trained. This would be done by tailoring commands, workflows, and integrations to industry needs. Voice agents are here to replace company representatives.`,
      `Voice agents are powerful tools for converting inquiry into business deals. Unlike a human, voice AI agents are available 24/7, and would never run out of patience.`,
      `Industry-focused voice solutions can unlock productivity in any sector where work is time-sensitive, hands-on, or highly transactional. I'm thinking`,
      `- SMB plumbing/home renovation services\n- Mental health therapy\n- Customer service / call centers\n- In-car voice assistants\n- Accessibility support\n- Education (paired with AR/VR)\n- Dubbing in entertainment\n- Elderly care\n- Voice biometrics/ identity detection\n- Offline AI (on-device voice agents)\n- Negotiation / bill disputes\n- Outbound calls Bot calls are illegal. (telephone consumer protection act)`,
      `## Current Market Landscape`,
      `- **Car Dealers** (lead conversion, service scheduling, financing inquiries): numo, toma\n- **Real Estate** (leasing assistant for property managers): Uniti AI, Colleen.ai, HostAI, EliseAI\n- **Medical** (appointment scheduling, insurance verification): hyro, Infinitus, Outbound AI\n- **Call Center** (customer service): GigaML, PolyAI, Replicant\n- **Recruiting** (candidate screening): ConverzAI, Ribbon, Mercor, Humanly, heyMilo\n- **Restaurants** (you can imagine): Slang\n- **Logistics** (coordination): HappyRobot, FleetWorks`,
      `Voice agents create value for end-users and the companies building these tools. It can also be integrated with industry software. Once adopted, switching to another provider is costly, making these agents highly sticky and defensible for the businesses building them.`,
      `### Challenge`,
      `The challenge, however, lies in reliability. Voice models can hallucinate or fail in other ways. Building a truly high-quality product means orchestrating the right mix of models, integrations, conversational flows, and error-handling.`,
      `## Voice AI infrastructure`,
      `### Foundation`,
      `- **Speech-to-Text (STT) / Automatic Speech Recognition (ASR):** Converts speech to text (e.g., Whisper, DeepSpeech)\n- **Text-to-Speech (TTS):** Produces realistic voices. (e.g., ElevenLabs, Speechify)\n- **Language Models (NLP):** Understand context, intent, and semantics. (e.g., GPT-based models, Claude)`,
      `### Middleware: This is the "brain" that decides what to do once speech is captured.`,
      `- **Intent Recognition:** Mapping raw speech into user intent (e.g., "book me a flight" → API call).\n- **Workflow Engines:** Handling multi-step tasks ("Send an email, then schedule a meeting").\n- **Context Memory:** Keeping track of previous conversations and user state. (e.g. Letta, Redis)`,
      `### Major problems to be solved`,
      `- Latency optimization: we want sub-second response\n- Integration frameworks\n- Security & authentication: handling access to sensitive user systems (emails, Slack…)\n- Understanding multiple speakers\n- Show emotional intelligence: tone, pauses, filler words..\n- Ability to understand emotion`,
      `## Application Layer`,
      `- **Horizontal:** General-purpose assistants (e.g., Martin).\n- **Vertical:** Industry-specific voice solutions (B2B).`,
      `I expect the foundational model to become exponentially better over time, fueling applications across industries. From converting leads to coordinating logistics, these agents are tightly woven into workflows. Companies that embrace voice AI early will capture enormous efficiency. The problem ahead isn't whether voice will matter, but who will execute it best. What began as human dialogue is now the foundation of the next great computing interface.`,
      `*Check out [alexis-ai.com](https://alexis-ai.com) (coming soon).*`,
    ],
  },
  {
    id: "world-6",
    folder: "World",
    title: "State of Robotics Data (May 2026)",
    date: "2026-05-15",
    body: [
      `*A field report on the data that robots are trained on.*\n*World · Vanessa Li · May 2026*`,
      `Software was eating the world, now AI is eating software. The next frontier will be physical AI. We're not just concerned about what AI can say, but what AI can do, physically, in the real world.`,
      `Waymo crossed 450,000 weekly paid rides. Nvidia declared "the ChatGPT moment for robotics is here". Sora was discontinued in April 2026. Most of the people on the team were video experts. Where do you think their talent was reallocated to? My guess is towards world models, in order to advance robotics. Video is the essential element for training robotics manipulation. Forget about making silly AI video slops to make people laugh, there are better quests such as advancing humanoid robots.`,
      `OpenAI trained GPT on trillions of tokens of essentially free text. To teach a humanoid robot to reliably fold a shirt, however, a frontier lab needs roughly 10-20,000 hours of annotated teleoperation data, billed at north of $100/hour, every minute of it physically produced by a human piloting a real robot through a real room. Unfortunately, there is no physical data to be scraped from the web. The result is that robotics research has become one of the most capital-intensive corners of AI, and a quiet race for high-quality training data is now underway across every frontier lab.`,
      `The three main types of robotics data being used in training:`,
      `![The three main types of robotics data being used in training](/images/robotics-data-types.png)`,
      `## Teleoperation`,
      `Teleoperation remains the industry gold standard. Major research labs rely 95%+ on teleoperation data over the other two types of data. Unfortunately, the best kind of data comes at a high price. Teleop data is the hardest and most expensive to collect because it requires leader arms and follower arms hardware, and dedicated employees who can run the operation. You will become a billionaire if you can find a way to scale up teleoperation data collection. Unfortunately, I don't have any good ideas. Most teleop data companies rely on labor arbitrage in developing countries. The hardware costs in those countries also tend to be lower, therefore teleop data are best collected outside of the US. The problem with this, however, besides ethical consideration, is that the data farms are too far away from the American labs purchasing them. Researchers prefer to be able to iterate quickly and identify problems with the collection as quickly as possible. They also want to receive the data as soon as they want it. Outsourcing it to external laborers means that the timeline to collect doubles. Data providers would first provide samples of the task for validation, ship the correct hardware to those farms, collect and post-process data. Not to mention that every robotics company is using different grippers. Standardization remains an unsolved problem.`,
      `## Egocentric video`,
      `This is the most abundant set of data. Everybody and their mother can collect egocentric video data as long as they have a camera. Data collectors design their own headset to film workers' hands and wrist in various settings. These videos are then used to train VLA models.`,
      `The unfortunate thing about ego data is that they are the least useful. Because of the way VLA models digest data, any small variance in the pixel color would affect the training quality. Videos are fed into Vision-Language-Action (VLA) models by dividing them into discrete frames, processing those frames through specialized encoders to extract visual and motion features, and then fusing this data with language commands and robot states to predict physical actions. This means that if the background of the video changes, the same action in the same background might not transfer. Any difference in lighting can dramatically affect the training outcome.`,
      `Most of that supply came from India and China at very low labor costs. Pricing is approaching a commodity. Around 2023-2024, when ego-video data vendors first started selling to robotics labs, they typically priced raw footage at $5-10/hr.`,
      `As more and more players rush into this gold mine, ego videos face enormous competition while demand remains the same. By April 2026, supply had outrun demand. At this rate, ego video data pricing will settle well under $1/hr by 2027.`,
      `![Ego video data pricing over time](/images/ego-video-pricing.png)`,
      `Vendors are racing to differentiate themselves and trying to sell premium data at a higher price.`,
      `### Differentiating Factors for Ego Video Data`,
      `**Multimodal data**`,
      `The promise of modal data is that they will increase the accuracy of the training data by increasing the number of parameters. Data collectors are including additional sensors such as IMU, pressure sensors, and IR sensors in addition to RGB cameras to extract more information on the movement. These data would need to then be calibrated. The challenge with multimodal data is that we're not sure whether these are actually useful in training. An increased number of parameters doesn't necessarily lead to an increased desirable outcome.`,
      `**The ability to get into hard-to-reach environments.**`,
      `One of the biggest values out of egocentric video data is that people can provide a variety of environment data. Anyone with a head-mounted camera can capture a task wherever it naturally happens. Environmental diversity is the real value proposition. A model needs to see thousands of different kitchens, warehouses, hospital rooms, and workshops to generalize. Startups that can get a camera into environments labs can't reach on their own have the most defensible moat. Currently, there seems to be a lack of US-based data. It is easier to access settings in countries with fewer privacy concern, therefore we see the market flooded with data from developing countries. US-based data is more valuable not only because it's more scarce and expensive to collect, but also because deployment will likely happen first in the US. Kitchen layouts in India look very different from ones in the US, even the sizes of household appliances are different. US-based data would be necessary.`,
      `### How ego data will become more useful`,
      `Geometric Foundation Models (GFMs) have shown promising results. GFMs are the strongest reason to think egocentric video isn't a dead end. They take ordinary RGB images or video and directly predict 3D structure without needing depth sensors. They might turn cheap, abundant ego video into something labs can actually use. VLA models are brittle to pixel-level variance. I am bullish that geometry-based policies will displace pure pixel-to-action VLAs as the dominant design.`,
      `## Synthetic Data`,
      `The pitch is irresistible: spin up a robot in a simulator like NVIDIA's Isaac Sim, run thousands of trials in parallel overnight, and generate perfectly labeled trajectories at near-zero marginal cost, with no hardware to ship or operators to pay. The challenge is the sim-to-real gap. Even SOTA models can't reproduce the complexity of the real world. A policy trained in simulation tends to fail when deployed, because even state-of-the-art physics engines can't fully reproduce real-world friction. The field's response has been less about achieving perfect realism and more about engineering around the gap. While world foundation models like NVIDIA's Cosmos add photorealistic textures, weather, and sensor noise on top of simulated scenes to make them harder to distinguish from reality, the current consensus is that synthetic data works best as a complement rather than a replacement. Synthetic data is excellent for perception and navigation, but poor for manipulation skills.`,
      `![Picking up an ikea bear, May 2026, SF](/images/ikea-bear.jpg)`,
      `*me picking up an ikea bear. May 2026, SF.*`,
      `UMI data sits in an odd spot. It has the collection style of ego video and the output quality of teleop. GoPro and a 3D-printed gripper is the whole rig. But you don't walk away with raw footage. A processing step runs SLAM over the video to recover the gripper's full 6-DoF path, so labels are reconstructed, not measured. UMI is promising, but it isn't the proven default for now.`,
      `The race in robotics has quietly shifted. The bottleneck is high-quality data. Teleoperation will stay the gold standard, but it can't scale on labor arbitrage alone. Ego video is cheap and abundant but only becomes useful once geometric foundation models strip away the pixel-level noise that breaks today's policies. And synthetic data, for all its appeal, remains a complement rather than a substitute for the real thing. The companies that crack this will decide which humanoids actually fold the shirt, and which stay expensive demos.`,
    ],
  },
];

/* ---- Claude ---------------------------------------------------------------
   Placeholder data for the Claude app window. Everything here — greeting,
   conversation titles/previews, and the sample messages in the expanded
   chat — is meant to be edited. Chats with an empty `messages` array render
   as grey skeleton bubbles in the main view. */

export interface ClaudeMessage {
  role: "user" | "assistant";
  text: string;
}

export interface ClaudeChat {
  id: string;
  title: string;
  /** One-line preview under the title in the sidebar. */
  preview: string;
  time: string;
  /** Empty array = placeholder conversation (skeleton bubbles). */
  messages: ClaudeMessage[];
}

export const CLAUDE_APP = {
  greeting: "Hey there, Vanessa 👋",
  userName: "Vanessa",
  /** Shown under the name in the sidebar profile card. */
  userPlan: "Pro plan",
  /** Model chip shown in the composer toolbar. */
  model: "Claude Opus 4.8",
  inputPlaceholder: "Reply to Claude…",
  /** Left-nav items. Icons are assigned by label in Claude.tsx; an unknown
      label falls back to a generic dot, so these are safe to edit. */
  menu: ["Projects", "Artifacts", "Schedule", "Dispatch", "Customize"],
  chats: [
    {
      id: "claude-1",
      title:
        "Build an ai agent that crawls through linkedin and slack channels to find potential cofounders",
      preview: "Shortlisted 12 people from #introductions…",
      time: "2m ago",
      // Sample exchange — rewrite freely.
      messages: [
        {
          role: "user",
          text: "Build an AI agent that crawls through LinkedIn and Slack channels to find potential cofounders.",
        },
        {
          role: "assistant",
          text: "Here's the shape I'd give it: a reader for public LinkedIn profiles, a Slack bot that watches intro channels, and a scorer that ranks people on two axes — technical depth and founding intent — with cited evidence for each. Want me to scaffold the repo?",
        },
        {
          role: "user",
          text: "Start with the Slack half. Score everyone in #introductions.",
        },
        {
          role: "assistant",
          text: "Done — I read the channel, classified each intro on both axes, and shortlisted 12 people. The top three all mention leaving their jobs to build in robotics. Drafting (not sending) personalized intro DMs now.",
        },
      ],
    },
    {
      id: "claude-2",
      title: "robotics multimodal data Explanation",
      preview: "Conversation placeholder — edit in config.ts",
      time: "Yesterday",
      messages: [],
    },
    {
      id: "claude-3",
      title: "Debug API Issue",
      preview: "Conversation placeholder — edit in config.ts",
      time: "Tuesday",
      messages: [],
    },
    {
      id: "claude-4",
      title: "Conversation title…",
      preview: "Conversation placeholder — edit in config.ts",
      time: "Monday",
      messages: [],
    },
    {
      id: "claude-5",
      title: "Conversation title…",
      preview: "Conversation placeholder — edit in config.ts",
      time: "6/28/26",
      messages: [],
    },
  ] as ClaudeChat[],
};

/* ---- Photos ---------------------------------------------------------------
   The Photos app's albums. "Photoshoots" is imported from the /photoshoots
   page (assets referenced from /public, not duplicated). "Life" is served
   from Supabase Storage (public bucket "photos", folder "life/"). */

export interface AlbumPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Capture date shown in the detail-view caption, macOS Photos style. */
  date?: string;
  /** Smaller rendition used for the grid tiles (falls back to src). */
  thumb?: string;
}

export interface PhotoAlbum {
  id: string;
  name: string;
  /** Optional line shown before the photo count in the album header. */
  description?: string;
  photos: AlbumPhoto[];
  /** Optional reel shown after the grid as a video tile. */
  video?: { src: string; caption: string };
}

/** Public base URL of the Supabase Storage bucket holding album photos. */
const SUPABASE_PHOTOS =
  "https://kxralsptwtcrzwkmbppt.supabase.co/storage/v1/object/public/photos";

/** A Life-album entry: full-size and 512px-thumb objects share a filename. */
const lifePhoto = (file: string, width: number, height: number): AlbumPhoto => ({
  src: `${SUPABASE_PHOTOS}/life/${file}`,
  thumb: `${SUPABASE_PHOTOS}/life/thumbs/${file}`,
  alt: "Life",
  width,
  height,
});

export const PHOTO_ALBUMS: PhotoAlbum[] = [
  {
    id: "photoshoots",
    name: "Photoshoots",
    description: "Portraits and photoshoots from over the years.",
    photos: [
      { src: "/images/photoshoots/photo-1.jpg", alt: "Photoshoot", width: 2400, height: 3600 },
      { src: "/images/photoshoots/photo-2.jpg", alt: "Photoshoot", width: 2400, height: 3600 },
      { src: "/images/photoshoots/photo-3.jpg", alt: "Photoshoot", width: 5504, height: 8256 },
      { src: "/images/photoshoots/photo-4.jpg", alt: "Photoshoot", width: 5175, height: 7762 },
      { src: "/images/photoshoots/photo-5.jpg", alt: "Photoshoot", width: 8256, height: 5504 },
      { src: "/images/photoshoots/photo-6.jpg", alt: "Photoshoot", width: 6240, height: 4160 },
      { src: "/images/photoshoots/photo-7.jpg", alt: "Photoshoot", width: 6240, height: 4160 },
      { src: "/images/photoshoots/photo-8.jpg", alt: "Photoshoot", width: 6240, height: 4160 },
      { src: "/images/photoshoots/photo-9.jpg", alt: "Photoshoot", width: 960, height: 1392 },
      { src: "/images/photoshoots/photo-10.jpg", alt: "Photoshoot", width: 960, height: 1415 },
      { src: "/images/photoshoots/photo-11.jpg", alt: "Photoshoot", width: 1536, height: 2304 },
      { src: "/images/photoshoots/photo-12.jpg", alt: "Photoshoot", width: 1536, height: 2304 },
      { src: "/images/photoshoots/photo-13.jpg", alt: "Photoshoot", width: 4288, height: 2848 },
    ],
    /** The photoshoot reel shown after the grid on the old page. */
    video: {
      src: "/videos/photoshoot-reel.mp4",
      caption: "Filmed for Booth Entertainment, 2023.",
    },
  },
  {
    id: "life",
    name: "Life",
    photos: [
      lifePhoto("life-01.jpg", 1500, 2000),
      lifePhoto("life-02.jpg", 2000, 923),
      lifePhoto("life-03.jpg", 1500, 2000),
      lifePhoto("life-04.jpg", 1500, 2000),
      lifePhoto("life-05.jpg", 1500, 2000),
      lifePhoto("life-06.jpg", 1500, 2000),
      lifePhoto("life-07.jpg", 1500, 2000),
      lifePhoto("life-08.jpg", 1500, 2000),
      lifePhoto("life-09.jpg", 1500, 2000),
      lifePhoto("life-10.jpg", 1500, 2000),
      lifePhoto("life-11.jpg", 1337, 2000),
      lifePhoto("life-12.jpg", 1125, 2000),
      lifePhoto("life-13.jpg", 2000, 1333),
      lifePhoto("life-14.jpg", 960, 1577),
      lifePhoto("life-15.jpg", 1500, 2000),
      lifePhoto("life-16.jpg", 1500, 2000),
      lifePhoto("life-17.jpg", 1500, 2000),
      lifePhoto("life-18.jpg", 1500, 2000),
      lifePhoto("life-19.jpg", 1500, 2000),
      lifePhoto("life-20.jpg", 1620, 1080),
      lifePhoto("life-21.jpg", 1620, 1080),
      lifePhoto("life-22.jpg", 2000, 1333),
      lifePhoto("life-23.jpg", 1500, 2000),
      lifePhoto("life-24.jpg", 960, 642),
      lifePhoto("life-25.jpg", 1500, 2000),
      lifePhoto("life-26.jpg", 1500, 2000),
      lifePhoto("life-27.jpg", 1500, 2000),
    ],
  },
];

/* ---- Messages ------------------------------------------------------------
   Three invented personas — names and every bubble are placeholders meant to
   be rewritten. `from: "me"` renders blue/right, `from: "them"` grey/left. */

export interface ChatMessage {
  from: "me" | "them";
  text: string;
}

export interface Conversation {
  id: string;
  name: string;
  /** Initials shown in the avatar circle. */
  initials: string;
  /** Tailwind gradient classes for the avatar background. */
  avatarClass: string;
  time: string;
  messages: ChatMessage[];
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "chat-1",
    name: "Yoline Yin",
    initials: "ML",
    avatarClass: "from-pink-400 to-rose-500",
    time: "9:41 AM",
        messages: [
      { from: "them", text: "are you investing in them? " },
      { from: "me", text: "wait what are they building again? " },
      { from: "them", text: "not sure what they're building but the founders dropped out of Stanford and one of them was ex-spacex intern and seqouia is leading the round" },
      { from: "me", text: "oh count me in!" },
      { from: "them", text: "ok yea not sure what they're building but if seqouia is investing, I'm in too" },
      { from: "me", text: "bet" },
    ],
  },
  {
    id: "chat-2",
    name: "Francisco (cleaner)",
    initials: "DK",
    avatarClass: "from-indigo-400 to-blue-600",
    time: "Yesterday",
    messages: [
      { from: "me", text: "hey thought you were coming to clean my apartment today? what happened?" },
      { from: "them", text: "sorry" },
      { from: "them", text: "Anthropic just hired me as Member of Technical Staff" },
      { from: "them", text: "I mentioned that I had recordings of myself cleaning everyone's homes and they realized that was a great data set" },
      { from: "them", text: "I make $20M now" },
      { from: "them", text: "Can you come clean my new place in Atherton actually?" },
    ],
  },
  {
    id: "chat-3",
    name: "Sam Ellis",
    initials: "SO",
    avatarClass: "from-emerald-400 to-teal-600",
    time: "Tuesday",
    messages: [
      { from: "them", text: "moving to SF next month. wanna grab coffee?" },
      { from: "me", text: "yea I'm down find a time on my calendly!" },
      { from: "them", text: "do you gcal everything?" },
      { from: "me", text: "yea if it's not on my gcal I'm not gonna remember unfort" },
      { from: "them", text: "ok scheduled for friday!" },
      { from: "me", text: "wouldn't miss it" },
    ],
  },
];

/* ---- Reminders ------------------------------------------------------------
   SEED data for the Reminders app. Items populate localStorage once (key
   "desktop:reminders:v1") and every change in the UI persists there; clear
   that key to re-seed after editing items here. Lists themselves (names,
   colors) stay config-driven, and a NEW list added here gets its items
   seeded automatically on the next load. `done` is only the initial state. */

export interface Reminder {
  id: string;
  text: string;
  done: boolean;
}

export interface ReminderList {
  id: string;
  name: string;
  /** Tailwind background class for the list's colored dot/icon. */
  colorClass: string;
  items: Reminder[];
}

export const REMINDER_LISTS: ReminderList[] = [
  {
    id: "list-1",
    name: "Reminders",
    colorClass: "bg-orange-500",
    items: [
      { id: "rem-1", text: "Get grocery", done: false },
      { id: "rem-2", text: "Return Amazon package", done: false },
      { id: "rem-3", text: "Follow up with BBQ Capital", done: false },
      { id: "rem-4", text: "shitpost on Twitter", done: false },
      { id: "rem-5", text: "book a flight to Japan", done: false },
    ],
  },
  {
    id: "list-2",
    name: "Work",
    colorClass: "bg-blue-500",
    items: [
      { id: "rem-6", text: "", done: false },
      { id: "rem-7", text: "", done: false },
      { id: "rem-8", text: "", done: false },
    ],
  },
];
