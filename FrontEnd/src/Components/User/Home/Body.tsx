

import SinglePost from "./SinglePost";
import Stories from "./Stories";

const HomeBody = () => {
 
  return (
    <div className="flex flex-col w-full h-full justify-center ">
      <div className="flex justify-center ">
        <Stories />
      </div>
      <div className="flex px-32 items-center flex-col ">
        <SinglePost/>
      </div>
    </div>
  );
};

export default HomeBody;
