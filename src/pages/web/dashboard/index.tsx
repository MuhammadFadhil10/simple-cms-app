// import { Webs } from "@/api";
import { CreateWeb } from "@/features/web";
// import { GetStaticProps } from "next";

export default function CreateWebPage() {
  return <CreateWeb />;
}

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const webs = await Webs.getWebs();

//     return { props: { webs: webs?.data } };
//   } catch (error) {
//     return { props: { webs: [] } };
//   }
// };
