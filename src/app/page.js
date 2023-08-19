import Image from "next/image";
import Button from "./components/ButtonComponent/Button";

export default function Home() {

  return (
    <>
      <div className="2xl:container mx-auto border py-12 mb-4">
        <div className="container grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 gap-6 px-4 py-2 border mx-auto">
          <div className="flex flex-col lg:mt-12 gap-y-3 border">
            <h2 className="text-4xl font-bold border leading-normal uppercase select-none">Manage your <span className="bg-gradient-to-r from-[#007cf0] text-transparent bg-clip-text font-extrabold to-[#00dfd8]">University</span> Academics at <span className="bg-gradient-to-r from-[#7928ca] text-transparent bg-clip-text font-extrabold to-[#ff0080]">ONE PLACE</span> </h2>
            <p className="text-sm font-normal border leading-normal select-none">Seamlessly manage campus operations, nurture innovation, and cultivate a vibrant academic community through our advanced University Management System.</p>
            <div className="mt-6">
              <Button type="button" className="getBtn select-none">Get Started</Button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-3 border">
            <Image src="/images/bgs/bg1.png" className="select-none" width={500} height={500} alt="home-background" />
          </div>
        </div>
      </div>
    </>
  )
}