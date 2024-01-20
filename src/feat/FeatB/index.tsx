import Image from "next/image";
import i18n from "i18next";
import { Typography } from "@material-tailwind/react";
import img from './cats.jpg';


const Index = () => {
    return (
        <div className={"flex flex-1 flex-col items-center justify-center"}>
            <Typography variant={"h1"} className={"text-2xl"}>Feat B</Typography>
            <Typography variant={"h2"} className={"text-xl"}>{i18n.t("app.featB.text")}</Typography>
            <div style={{ width: "500px", height: "300px" }}>
                <Image
                    src={img}
                    alt={"cats"}
                    className={"rounded-2xl mt-8"}
                    width={500}
                    height={300}
                />
            </div>
        </div>

    );
};

export default Index;
