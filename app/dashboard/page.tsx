import { applicationsDb } from "@/lib/db";
import { bookings, savedUniversities, scholarships } from "@/lib/mock-data";
import { createApplicationAction, deleteApplicationAction, advanceApplicationStatusAction } from "@/lib/actions";

export default async function StudentOverviewPage() {
  const profileCompletion = 68;
  
  // Read directly from the In-Memory Data Store
  const applications = applicationsDb;

  return (
    <section className="text-ink-950 dark:text-paper body-font">
      <div className="container mx-auto">
        {/* Statistics Block */}
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-display font-medium title-font mb-4 text-ink-950 dark:text-white">
            Welcome back, Student
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-ink-950/70 dark:text-paper/70">
            Track your university applications, upcoming mentor sessions, and scholarships all in one place.
          </p>
        </div>
        
        <div className="flex flex-wrap -m-4 text-center mb-12">
          <div className="p-4 sm:w-1/4 w-1/2">
            <div className="border-2 border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 px-4 py-6 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-lg">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-gold-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-ink-950 dark:text-white">{applications.length}</h2>
              <p className="leading-relaxed font-mono text-xs uppercase tracking-widest text-harbor-600 dark:text-harbor-400 mt-1">Applications</p>
            </div>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <div className="border-2 border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 px-4 py-6 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-lg">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-harbor-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <h2 className="title-font font-medium text-3xl text-ink-950 dark:text-white">{bookings.filter((b) => b.status === "Upcoming").length}</h2>
              <p className="leading-relaxed font-mono text-xs uppercase tracking-widest text-harbor-600 dark:text-harbor-400 mt-1">Upcoming Sessions</p>
            </div>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <div className="border-2 border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 px-4 py-6 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-lg">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-gold-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-ink-950 dark:text-white">{savedUniversities.length}</h2>
              <p className="leading-relaxed font-mono text-xs uppercase tracking-widest text-harbor-600 dark:text-harbor-400 mt-1">Saved Unis</p>
            </div>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <div className="border-2 border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 px-4 py-6 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-lg">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-harbor-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-ink-950 dark:text-white">{scholarships.length}</h2>
              <p className="leading-relaxed font-mono text-xs uppercase tracking-widest text-harbor-600 dark:text-harbor-400 mt-1">Scholarships</p>
            </div>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="flex flex-wrap -m-4">
          
          {/* Applications Table */}
          <div className="p-4 lg:w-2/3 w-full">
            <div className="h-full bg-white dark:bg-ink-900 p-8 rounded-xl border border-ink-700/10 dark:border-paper/10">
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="sm:text-2xl text-xl font-display font-medium title-font text-ink-950 dark:text-white">
                  Application Tracker
                </h2>
              </div>

              {/* Server Action Form (Zero Fetch Boilerplate) */}
              <div className="bg-ink-900/5 dark:bg-paper/5 p-4 rounded-lg mb-6 border border-ink-700/10 dark:border-paper/10">
                <h3 className="text-sm font-medium mb-3 text-ink-950 dark:text-white">Add New Application (Server Action Demo)</h3>
                <form action={createApplicationAction} className="flex gap-2">
                  <input type="text" name="university" placeholder="University Name" required className="flex-1 px-3 py-2 text-sm rounded border border-ink-700/20 dark:border-paper/20 bg-white dark:bg-ink-900 text-ink-950 dark:text-white" />
                  <input type="text" name="program" placeholder="Program (e.g. MS CS)" required className="flex-1 px-3 py-2 text-sm rounded border border-ink-700/20 dark:border-paper/20 bg-white dark:bg-ink-900 text-ink-950 dark:text-white" />
                  <button type="submit" className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white text-sm font-medium rounded transition-colors">
                    Add
                  </button>
                </form>
              </div>

              <div className="overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-ink-950 dark:text-white text-sm bg-ink-900/5 dark:bg-paper/5 rounded-tl rounded-bl">University</th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-ink-950 dark:text-white text-sm bg-ink-900/5 dark:bg-paper/5">Status</th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-ink-950 dark:text-white text-sm bg-ink-900/5 dark:bg-paper/5">Progress</th>
                      <th className="w-24 title-font tracking-wider font-medium text-ink-950 dark:text-white text-sm bg-ink-900/5 dark:bg-paper/5 rounded-tr rounded-br">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((a: any) => (
                      <tr key={a.id} className="border-b border-ink-700/5 dark:border-paper/5 hover:bg-ink-900/5 dark:hover:bg-paper/5 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium">{a.university}</p>
                          <p className="text-xs text-ink-950/60 dark:text-paper/60">{a.program}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            a.status === 'Submitted' ? 'bg-harbor-500/20 text-harbor-600 dark:text-harbor-400' : 
                            a.status === 'Draft' ? 'bg-gold-500/20 text-gold-600 dark:text-gold-400' :
                            a.status === 'Interview' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400' :
                            'bg-ink-700/20 text-ink-800 dark:text-ink-200'
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-lg text-ink-950 dark:text-paper">
                          <div className="w-full bg-ink-900/10 dark:bg-paper/10 rounded-full h-1.5 mt-2">
                            <div className="bg-harbor-500 h-1.5 rounded-full" style={{ width: `${a.progress}%` }}></div>
                          </div>
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          <form action={advanceApplicationStatusAction.bind(null, a.id, a.status)}>
                            <button type="submit" title="Advance Status" className="text-ink-950/40 hover:text-harbor-500 transition-colors p-1">
                              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                            </button>
                          </form>
                          <form action={deleteApplicationAction.bind(null, a.id)}>
                            <button type="submit" title="Delete" className="text-ink-950/40 hover:text-red-500 transition-colors p-1">
                              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Profile Sidebar */}
          <div className="p-4 lg:w-1/3 w-full">
            <div className="h-full bg-white dark:bg-ink-900 p-8 rounded-xl border border-ink-700/10 dark:border-paper/10">
              <h2 className="sm:text-2xl text-xl font-display font-medium title-font mb-4 text-ink-950 dark:text-white">
                Profile Completion
              </h2>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gold-500">{profileCompletion}%</span>
                <span className="text-sm font-medium text-ink-950/60 dark:text-paper/60">Almost there!</span>
              </div>
              <div className="w-full bg-ink-900/10 dark:bg-paper/10 rounded-full h-2 mb-6">
                <div className="bg-gold-500 h-2 rounded-full" style={{ width: `${profileCompletion}%` }}></div>
              </div>
              
              <div className="stub-divider my-6" />

              <h2 className="text-xs font-mono uppercase tracking-widest text-harbor-600 dark:text-harbor-400 mb-4">
                Upcoming Sessions
              </h2>
              <div className="space-y-4">
                {bookings.filter((b: any) => b.status === "Upcoming").map((b: any) => (
                  <div key={b.id} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded bg-ink-900/5 dark:bg-paper/5 flex items-center justify-center text-xl mr-3">
                      📅
                    </div>
                    <div>
                      <p className="font-medium text-sm">{b.topic}</p>
                      <p className="text-xs text-ink-950/60 dark:text-paper/60">{b.mentor} &middot; {b.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
