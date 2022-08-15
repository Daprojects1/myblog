import { useRouter } from "next/router";
import PreviewCard from "../../reusableComps/PreviewCard";
import RenderMounted from "../../reusableComps/RenderMounted";
import useStyles from "../../utils/useStyles";

const HomePage = ({ data }) => {
  const { borderBottom, currentColor, light } = useStyles();
  const router = useRouter();

  const handleRead = (id) => {
    router.push(`${window?.location.href}blogs/${id}`);
  };

  return (
    <div className="homePage">
      <h2 className="homePage__title">{`What's New ?`}</h2>
      <RenderMounted>
        <div className="previewCards">
          {data?.map((dets, indx) => (
            <PreviewCard
              key={indx}
              date={dets?.date}
              title={dets?.title}
              previewText={dets?.preview}
              handleRead={handleRead}
              id={dets?.id}
              author={dets?.author}
            />
          ))}
        </div>
      </RenderMounted>
    </div>
  );
};

export default HomePage;
