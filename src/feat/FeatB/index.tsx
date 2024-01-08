import Image from "next/image";
import i18n from "i18next";
import img from './cats.jpg';


const Index = () => {
    return (
        <div className={"flex flex-1 flex-col items-center justify-center"}>
            <h1 className={"text-2xl"}>Feat B</h1>
            <h2 className={"text-xl"}>{i18n.t("app.featB.text")}</h2>
            <Image
                src={img}
                alt={"cats"}
                className={"rounded-2xl mt-8"}
                width={500}
                height={300}
            />
        </div>

    );
};

export default Index;
