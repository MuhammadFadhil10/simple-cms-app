import { WebEditor } from "@/features/web";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const WebEditorPage = () => {
  return <WebEditor />;
};

export default WebEditorPage;
