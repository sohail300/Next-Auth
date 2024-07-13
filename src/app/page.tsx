import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main className="flex flex-col items-center justify-center py-16 mt-40">
          <h1 className="text-5xl font-bold text-white mb-4">
            NextAuth.js Application
          </h1>
          <p className="text-gray-400 text-xl text-center max-w-2xl">
            Welcome to our Next.js application with NextAuth.js authentication.
            This is a secure and scalable solution for handling user
            authentication.
          </p>
        </main>
      </div>
    </>
  );
}
