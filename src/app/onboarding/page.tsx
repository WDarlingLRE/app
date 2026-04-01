export default function OnboardingPage() {
  return (
    <main className="pb-20 pt-6 sm:pt-8">
      <div className="page-shell">
        <section className="glass-panel rounded-[34px] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="section-label">Supply onboarding</div>
              <h1 className="display-title mt-3 text-5xl sm:text-6xl">Join The Hare marketplace.</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                Phase one uses a hybrid supply model: curated seed listings plus self-serve submissions. Shops and independent barbers can submit a listing or claim an existing profile for verification.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  ["Independent barber", "Create a profile focused on specialties, services, price range, and your booking link."],
                  ["Shop or salon", "Add your business, team members, service mix, and profile verification details."],
                  ["Claim listing", "Take ownership of a seeded listing and update profile details for trust and ranking."],
                  ["Moderation", "Every submission enters a review queue before it becomes fully verified in search."],
                ].map(([title, body]) => (
                  <article key={title} className="rounded-[26px] border border-black/10 bg-white/78 p-5">
                    <div className="font-semibold text-neutral-950">{title}</div>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">{body}</p>
                  </article>
                ))}
              </div>
            </div>

            <form className="rounded-[30px] border border-black/10 bg-white/80 p-6 shadow-[0_18px_60px_rgba(16,16,16,0.06)]">
              <div className="section-label">Application form</div>
              <div className="mt-5 grid gap-4">
                <label className="block">
                  <span className="mb-2 block text-sm text-neutral-600">Listing type</span>
                  <select className="w-full rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/30">
                    <option>Independent barber</option>
                    <option>Shop or salon</option>
                    <option>Claim an existing listing</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-neutral-600">Business or professional name</span>
                  <input className="w-full rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/30" placeholder="The Hare Studio, Noor Lane" />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-neutral-600">City or neighborhood</span>
                  <input className="w-full rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/30" placeholder="Brooklyn, Newark, Jersey City" />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-neutral-600">Specialties</span>
                  <input className="w-full rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/30" placeholder="Fade work, braids, color, loc care" />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-neutral-600">External booking link</span>
                  <input className="w-full rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/30" placeholder="https://" />
                </label>

                <button type="button" className="mt-2 rounded-[18px] bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800">
                  Submit interest
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}