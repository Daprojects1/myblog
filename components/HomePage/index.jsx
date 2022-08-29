import { useRouter } from "next/router";
import PreviewCard from "../../reusableComps/PreviewCard";
import RenderMounted from "../../reusableComps/RenderMounted";

const HomePage = ({ data }) => {
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
              date={dets?.datePosted}
              title={dets?.title}
              previewText={dets?.preview}
              handleRead={handleRead}
              id={dets?._id}
              author={dets?.userName}
            />
          ))}
        </div>
      </RenderMounted>
    </div>
  );
};

export default HomePage;
