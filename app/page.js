import Image from "next/image";
import { Header } from "./_component/Header";
import { Hero } from "./_component/Hero";

export default function Home() {
  return (
    <div className="container m-auto">
      <Header />
      <Hero />
    </div>
  );
}
