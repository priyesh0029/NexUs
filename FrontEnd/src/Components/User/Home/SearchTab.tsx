import React, { useEffect, useState } from "react";
import { Drawer, Input } from "@material-tailwind/react";
import { searchUser } from "../../../api/apiConnections/User/userConnections";

interface ISearchTab {
  openSearchTab: boolean;
  setOpenSearchTab: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchTab: React.FC<ISearchTab> = (props) => {
  const { openSearchTab, setOpenSearchTab } = props;
  const [searchText,setSearchText] = useState("")
  const [data,setData] = useState<string[]>([])

  const handleInput =()=>(e:any) => {
    setSearchText(e.target.value);
  };

  const getSearchData = async () => {
    const data = await searchUser(searchText);
    setData(data)

  }

 useEffect(() => {

   getSearchData()
 },[searchText])

  const openDrawer = () => setOpenSearchTab(!openSearchTab);
  const closeDrawer = () => setOpenSearchTab(!openSearchTab);

  return (
    <div>
      <Drawer open={openSearchTab} onClose={closeDrawer} className="p-4">
        <div className="flex justify-center flex-col">
          <div className="w-72 p-8 border-black">
            <Input label="Search" onChange={handleInput}/>
          </div>
          <div className="ml-16 flex flex-col gap-3">
            <p>your search history</p>
            <p>your search history</p>
            <p>your search history</p>

          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SearchTab;
