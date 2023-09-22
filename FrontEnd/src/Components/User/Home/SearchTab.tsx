import React, { useEffect, useState } from "react";
import { Avatar, Drawer, Input } from "@material-tailwind/react";
import { searchUser } from "../../../api/apiConnections/User/userConnections";
import { Link } from "react-router-dom";
import { POST_URL } from "../../../constants/constants";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const SearchTab: React.FC<ISearchTab> = (props) => {
  const { openSearchTab, setOpenSearchTab } = props;
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<UserInfo[]>([]);

  const handleInput = (e: any) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setSearchResults([])
    } else {
      getSearchData(e.target.value);
    }
  };

  const getSearchData = async (search: string) => {
    const data: UserInfo[] = await searchUser(search);
    setSearchResults(data);
  };

  // const openDrawer = () => setOpenSearchTab(!openSearchTab);
  const closeDrawer = () => setOpenSearchTab(!openSearchTab);

  return (
    <>
      <div>
        <Drawer open={openSearchTab} onClose={closeDrawer} className="p-4 ">
          <div className="flex justify-center flex-col">
            <div>
              <p className="font-normal text-3xl pt-4">Search</p>
            </div>
            <div className="w-72 p-8 border-black">
              <Input
                label="Search"
                value={searchText}
                onChange={handleInput}
                // onKeyUp={onInputKeyPress}
              />
            </div>
            {searchResults.map((user) => (
              <div className=" flex flex-col gap-5 items-center">
                <Link to={`/profile/${user.userName}`}>
                  <div className="flex">
                    {user.dp ? (
                      <Avatar
                        src={POST_URL + `${user.dp}.jpg`}
                        alt="avatar"
                        className="h-14 w-14 p-1 "
                      />
                    ) : (
                      <UserCircleIcon className="h-14 w-14 text-gray-500" />
                    )}
                    <div>
                      <p className="text-lg font-normal pt-3">
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default SearchTab;
