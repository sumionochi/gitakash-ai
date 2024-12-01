import LoginButton from "@/components/Log";
import UserGreetText from "@/components/UserText";
import Image from "next/image";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="relative">
      <div className="h-[2px] relative z-30 bg-gradient-to-r from-yellow-500 via-purple-500 to-green-500" />
      <NavBar/>
    </main>
  );
}
