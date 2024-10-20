import Image from "next/image";
import Banner from "./components/Banner";
import RoomList from "./components/RoomList";

export default function Home() {
  return (
    <>
      <Banner />
      <RoomList />
    </>
  );
}
