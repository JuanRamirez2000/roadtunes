import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="flex flex-col items-center justify-center ">
      <section className="text-center w-full h-128 flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl">Plan Road Trips with Perfect Music</h1>
        <Link
          to="/plan"
          className="bg-gray-800 text-gray-100 py-2 px-4 rounded font-semibold hover:bg-gray-900 transition-all hover:scale-105"
        >
          Start Planning
        </Link>
      </section>
      <section className="flex flex-row justify-around w-full bg-gray-100">
        <div className="flex flex-col items-center h-32 justify-center">
          <h2 className="text-lg font-semibold">Route Planning</h2>
          <p>Plan your stops and destinations</p>
        </div>
        <div className="flex flex-col items-center h-32 justify-center">
          <h2 className="text-lg font-semibold">Music Integration</h2>
          <p>
            Connect Tidal music <i>with more to come!</i>
          </p>
        </div>
        <div className="flex flex-col items-center h-32 justify-center">
          <h2 className="text-lg  font-semibold">Smart Playlists</h2>
          <p>AI creates the playlist for you!</p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full bg-gray-800 text-center text-white h-64 gap-4">
        <h2 className="text-2xl font-semibold">Ready To Hit The Road?</h2>
        <p className="text-gray-300">
          Join travelers creating perfect road trip soundtracks
        </p>
        <Link
          to="/plan"
          className="bg-gray-100 text-gray-800 py-2 px-4 rounded font-semibold hover:bg-gray-200 transition-all hover:scale-105"
        >
          Start Your Journey
        </Link>
      </section>
    </main>
  );
}
