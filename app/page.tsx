"use client";

import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2027-12-12T08:00:00+07:00");
const LAMARAN_DATE = new Date("2027-07-03T08:00:00+07:00");

type ChecklistItem = {
  id: number;
  title: string;
  category: string;
  due?: string;
};

const initialChecklist: ChecklistItem[] = [
  {
    id: 1,
    title: "Pertemuan keluarga inti",
    category: "Keluarga",
    due: "Mar 2027",
  },
  
];

function getCountdown(target: Date) {
  const now = new Date();
  const difference = target.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const seconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  /*
   * Initial value dibuat statis.
   * Jangan memanggil new Date() di initial render
   * agar aman dari Next.js SSR / hydration.
   */
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [daysToLamaran, setDaysToLamaran] = useState(0);

  const [savedMoney, setSavedMoney] = useState(0);

  const [checklist, setChecklist] =
    useState<ChecklistItem[]>(initialChecklist);

  const [completed, setCompleted] = useState<number[]>([]);

  const weddingBudget = 50_000_000;

  /*
   * Wedding countdown
   */
  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(getCountdown(WEDDING_DATE));
    };

    // Hitung langsung setelah component mounted
    updateCountdown();

    // Update setiap detik
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  /*
   * Lamaran countdown
   */
  useEffect(() => {
    const updateLamaranCountdown = () => {
      const now = new Date();

      const difference =
        LAMARAN_DATE.getTime() - now.getTime();

      const days = Math.max(
        0,
        Math.ceil(
          difference / (1000 * 60 * 60 * 24)
        )
      );

      setDaysToLamaran(days);
    };

    // Hitung langsung setelah component mounted
    updateLamaranCountdown();

    // Update setiap jam
    const timer = setInterval(
      updateLamaranCountdown,
      60 * 60 * 1000
    );

    return () => clearInterval(timer);
  }, []);

  /*
   * Wedding budget progress
   */
  const progress = Math.min(
    Math.round(
      (savedMoney / weddingBudget) * 100
    ),
    100
  );

  /*
   * Checklist progress
   */
  const completedCount = completed.length;

  const checklistProgress =
    checklist.length > 0
      ? Math.round(
          (completedCount / checklist.length) * 100
        )
      : 0;

  /*
   * Toggle checklist
   */
  const toggleChecklist = (id: number) => {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#292725]">
      {/* Header */}
      <header className="border-b border-[#e8e2dc] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9a8f86]">
              Our Wedding Planner
            </p>

            <h1 className="mt-1 font-serif text-2xl">
              Adha <span className="text-[#c59b88]">&</span> Dewi
            </h1>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-xs text-[#9a8f86]">
              Next milestone
            </p>

            <p className="font-medium">
              Lamaran · 03 Juli 2027
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Hero */}
       <section className="relative overflow-hidden rounded-3xl bg-[#eadfd7] px-6 py-10 sm:px-10">
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_380px]">

    {/* Text */}
    <div>
      {/* <p className="text-sm uppercase tracking-[0.25em] text-[#796c63]">
        The countdown begins
      </p> */}

      <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
        Menuju hari H 
      </h2>

      {/* <p className="mt-4 max-w-lg text-sm leading-6 text-[#685f59]">
        Satu langkah kecil setiap hari untuk
        mempersiapkan hari besar kita.
      </p> */}

      {/* Countdown */}
      <div className="mt-8 grid max-w-xl grid-cols-4 gap-3">
        {[
          ["Hari", countdown.days],
          ["Jam", countdown.hours],
          ["Menit", countdown.minutes],
          ["Detik", countdown.seconds],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl bg-white/70 p-4 text-center backdrop-blur"
          >
            <div className="font-serif text-3xl sm:text-4xl">
              {String(value).padStart(2, "0")}
            </div>

            <div className="mt-1 text-[10px] uppercase tracking-widest text-[#8c8078]">
              {label}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-[#796c63]">
        Target Nikah 12 Desember 2027
      </p>
    </div>

    {/* Foto */}
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-3 rotate-3 rounded-[2rem] border border-white/60" />

      <div className="relative aspect-[5/5] overflow-hidden rounded-[2rem] bg-white p-2 shadow-xl">
        <img
          src="/foto_adha_dewi.jpg"
          alt="Adha dan Dewi"
          className="h-full w-full rounded-[1.5rem] object-contain"
        />
      </div>

      <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white px-5 py-3 shadow-lg">
        <p className="font-serif text-lg">
          Adha & Dewi
        </p>

        <p className="text-[10px] uppercase tracking-widest text-[#9a8f86]">
          Our journey
        </p>
      </div>
    </div>

          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {/* Money */}
          <div className="rounded-3xl border border-[#e8e2dc] bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#9a8f86]">
                  Dana terkumpul
                </p>

                <p className="mt-3 font-serif text-3xl">
                  {formatRupiah(savedMoney)}
                </p>
              </div>

              <span className="rounded-full bg-[#f5eee9] px-3 py-1 text-xs">
                💰
              </span>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs text-[#8c8078]">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#eee9e4]">
                <div
                  className="h-full rounded-full bg-[#b98d78] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="mt-2 text-xs text-[#9a8f86]">
                Target {formatRupiah(weddingBudget)}
              </p>
            </div>
          </div>

          {/* Lamaran */}
          <div className="rounded-3xl border border-[#e8e2dc] bg-white p-6">
            <p className="text-xs uppercase tracking-widest text-[#9a8f86]">
              Menuju lamaran
            </p>

            <p className="mt-3 font-serif text-3xl">
              {daysToLamaran}
            </p>

            <p className="mt-1 text-sm text-[#81766e]">
              hari lagi
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-[#8c8078]">
              <span className="h-2 w-2 rounded-full bg-[#b98d78]" />
              Juli 2027
            </div>
          </div>

          {/* Checklist */}
          <div className="rounded-3xl border border-[#e8e2dc] bg-white p-6">
            <p className="text-xs uppercase tracking-widest text-[#9a8f86]">
              Persiapan
            </p>

            <p className="mt-3 font-serif text-3xl">
              {completedCount}/{checklist.length}
            </p>

            <p className="mt-1 text-sm text-[#81766e]">
              tugas selesai
            </p>

            <div className="mt-5">
              <div className="h-2 overflow-hidden rounded-full bg-[#eee9e4]">
                <div
                  className="h-full rounded-full bg-[#b98d78] transition-all"
                  style={{
                    width: `${checklistProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Checklist */}
          <div className="rounded-3xl border border-[#e8e2dc] bg-white p-6 sm:p-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#9a8f86]">
                  To do
                </p>

                <h3 className="mt-2 font-serif text-2xl">
                  Yang perlu dipersiapkan
                </h3>
              </div>

              <span className="text-xs text-[#9a8f86]">
                {checklistProgress}% selesai
              </span>
            </div>

            <div className="mt-6 space-y-2">
              {checklist.map((item) => {
                const isDone = completed.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() =>
                      toggleChecklist(item.id)
                    }
                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                      isDone
                        ? "border-[#e5ddd7] bg-[#faf8f6]"
                        : "border-transparent hover:border-[#e8e2dc] hover:bg-[#fcfbfa]"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition ${
                        isDone
                          ? "border-[#b98d78] bg-[#b98d78] text-white"
                          : "border-[#cfc6bf] text-transparent"
                      }`}
                    >
                      ✓
                    </span>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium ${
                          isDone
                            ? "text-[#aaa09a] line-through"
                            : ""
                        }`}
                      >
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-[#a19891]">
                        {item.category}
                      </p>
                    </div>

                    {item.due && (
                      <span className="text-xs text-[#9a8f86]">
                        {item.due}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Milestones */}
          <div className="rounded-3xl border border-[#e8e2dc] bg-white p-6 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-[#9a8f86]">
              Our journey
            </p>

            <h3 className="mt-2 font-serif text-2xl">
              Milestone
            </h3>

            <div className="mt-8 space-y-7">
              <TimelineItem
                done
                date="Maret 2027 After Lebaran"
                title="Pertemuan keluarga"
                description="Pertemuan informal keluarga inti"
              />

              <TimelineItem
                active
                date="Juli 2027"
                title="Lamaran"
                description="Hari untuk membawa hubungan ini ke tahap berikutnya"
              />

              <TimelineItem
                date="2027"
                title="Wedding preparation"
                description="Persiapan milih vendor"
              />

              <TimelineItem
                date="Desember 2028"
                title="Akad & Resepsi"
                description="Hari H"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center">
          {/* <p className="font-serif text-lg text-[#756b64]">
            One day at a time.
          </p> */}

          <p className="mt-2 text-xs text-[#aaa09a]">
            Adha & Dewi · Our Wedding Journey
          </p>
        </footer>
      </div>
    </main>
  );
}

function TimelineItem({
  done = false,
  active = false,
  date,
  title,
  description,
}: {
  done?: boolean;
  active?: boolean;
  date: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs ${
            done
              ? "border-[#b98d78] bg-[#b98d78] text-white"
              : active
              ? "border-[#b98d78] bg-[#f5eee9] text-[#9d725d]"
              : "border-[#ddd5cf] bg-white text-transparent"
          }`}
        >
          {done ? "✓" : "•"}
        </div>

        <div className="mt-1 h-full w-px bg-[#e8e2dc]" />
      </div>

      <div className="pb-2">
        <p className="text-[11px] uppercase tracking-widest text-[#a0968e]">
          {date}
        </p>

        <h4 className="mt-1 text-sm font-semibold">
          {title}
        </h4>

        <p className="mt-1 text-xs leading-5 text-[#8d837c]">
          {description}
        </p>
      </div>
    </div>
  );
}