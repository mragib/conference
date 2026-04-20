import KeyDates from "@/components/ImportantDates";

export default async function KeyDatesPage() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center relative px-5 md:px-10 py-16">
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-10 pb-20">
        <KeyDates />
      </div>
    </section>
  );
}
