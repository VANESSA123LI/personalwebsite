import Link from "next/link";

export default function WorldBlog1() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <h1 className="absolute right top-6 text-2xl font-bold">Blog</h1>
        <Link href="/" className="text-lg">Home</Link>
      </div>

      <div className="space-y-6 text-lg leading-relaxed">
        <div className="mb-8">
          <Link href="/blog" className="text-lg mb-4 inline-block">← Back to Blog</Link>
          <p className="text-sm text-gray-600 mb-2">World</p>
          <h1 className="text-3xl font-bold mt-4 mb-2">FTX and the future of crypto</h1>
          <p className="text-gray-600">January 20, 2026</p>
        </div>

        <div className="prose prose-lg">
          {/* <p>
          The failure of FTX has left a deep scar on the crypto industry. 
          </p> */}
          <p>
          The failure of FTX has left a deep scar on the crypto industry. SBF was once praised for being the leader in crypto exchange and had promised to donate millions of dollars to charity. His empire vanished in one night. It was basically a bank run. Investors lost confidence in FTX after finding out that FTX was connected to Alameda Research, which uses FTT coins as collateral to take out billions of debt in order to fund their crypto investments. Cypto winter 2022 drove prices down due to our bearish macroeconomic conditions. Alameda Research lost billions in their crypto investments. It’s mind-blowing how fast everything went down. How fast investors were to pull their money out of FTX and how fast the bank run caused a bankruptcy.

From a VC’s point of view, it is hard to assure LPs now why they backed FTX. A lack of throughout due diligence? Some one should have seen their troubling balance sheet. In my opinion, this points to the shortfall of the VC industry, where investors invest based on KPIs, which are often noises around true growth. Crypto reached its peak in 2020. It was a party! (literally, have you seen how many crypto-themed happy hours there were?) I loved going to those. And I didn’t even know any technicals to fit in beyond name dropping words like crypto, web3, blockchain, NFT….(I have to give credit to Sequoia for doing their due diligence properly and not be swayed by the outside noise.)

I strongly believe that it’s time to keep our heads down and work on the technology itself. Any startup succeed by quietly building, not be attracting fame and making noice.

Another result of the FTX downfall is a call for stricter regulation in the crypto industry. Crypto prides itself to be central-less, ungoverned platform. It has no tangible backing and its value exists only because people believe it to be. Once their trust falls, it spirals out of control. Regulators are always a step behind to regulate what they should. They’re never early to the game because they can’t set rules before knowing what it is. Now that the necessity for regulation is clear, don’t expect DeFi to be 100% decentralized.

Perhaps to greatest lesson is don’t take shortcuts. Build steadily. Now is the time to cut out noises and focus on its fundamental technology.

          </p>
        </div>
      </div>
    </main>
  );
}

