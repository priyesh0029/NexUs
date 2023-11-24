import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
} from "@material-tailwind/react";
import { handleGenderSave } from "../../../api/apiConnections/User/userConnections";

interface IgenderModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
}

const GenderModal: React.FC<IgenderModal> = ({ open, setOpen,gender,setGender }) => {
  const allGenders = ["Male", "Female", "Others", "Prefer not to say"];

  const handleOpen = () => setOpen(!open);

  const handleGender = async(genderArg:string)=>{
     const response = await handleGenderSave(genderArg)      
     console.log("response of gender :" ,response);
     
     if(response){
        setGender(genderArg)
        handleOpen()
     }
  }

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex justify-center">
          <p className="text-lg font-semibold">Gender</p>
        </div>
        <div>
          <Card >
            <List>
              {allGenders.map((eachGender, index) => (
                <ListItem className="p-0" key={index}>
                  <label
                    htmlFor={`vertical-list-${eachGender}`}
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Radio
                        name="vertical-list"
                        id={`vertical-list-${eachGender}`}
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                        onClick={()=>{handleGender(eachGender)}}
                        checked={eachGender === gender}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      {eachGender}
                    </Typography>
                  </label>
                </ListItem>
              ))}
            </List>
          </Card>
        </div>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default GenderModal;
