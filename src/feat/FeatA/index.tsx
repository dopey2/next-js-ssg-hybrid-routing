import img from './dog.jpg'
import Image from "next/image";

const Index = () => {
  return (
      <div className={"flex flex-1 flex-col items-center justify-center"}>
        <h1 className={"text-2xl"}>Feat A</h1>
        <Image
            src={img}
            alt={"dog"}
            className={"rounded-2xl mt-8"}
            width={500}
            height={300}
        />
      </div>

  )
}

export default Index
