import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
  MessageSquareText
} from "lucide-react";
import { FileUploader } from "./components/ui/FileUploader.tsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState, useEffect ,useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageRequest } from "./components/ui/MessageRequest.tsx";
import { MessageResponse } from "./components/ui/MessageResponse.tsx";
import { UploadFile } from "./components/ui/UploadFile.tsx";
import { MySideBar } from "./components/ui/MySideBar.tsx";
import './index.css'
import{ErrorModal} from './components/ui/ErrorModal.tsx';
import { useNavigate } from 'react-router-dom';
import{getAllChats} from './APIs/getAllChats.tsx';
import{getAllModels} from './APIs/getAllModels.tsx';
import { updateConfiguration } from "./APIs/updateConfiguration.tsx";
import {updateFiles}from './APIs/updateFiles.tsx';
import { addMessage } from "./APIs/addMessage.tsx";
// Function to compare two arrays
function areArraysNotEqual(arr1, arr2) {
  // Check if lengths are different
  if (arr1.length !== arr2.length) {
    return true;
  }

  // Check if elements are the same
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return true;
    }
  }

  // If all checks pass, arrays are equal
  return false;
}

export function Dashboard() {
  const [numOfResults, setNumOfResults] = useState(1);
  const navigate = useNavigate();
  const [chunks, setChunk] = useState(500);
  const [question, setQuestion] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [PreFileName, setPreFileName] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [chats, setChats] = useState([]); 
  const [chatId, setChatId]=useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [prefile,setPrefile]=useState([]);
  const[title,setTitle]=useState('');
  const[models,setModels]=useState([]);
  const[description,setDescription]=useState([]);
  const[selectedModel,setSelectedModel]=useState("");
  const scrollAreaRef = useRef(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messagesList]);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Get the first file selected
  };
  const handleInputChunks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChunk(parseInt(e.target.value, 10));
    console.log(chunks);
  };
  const handleInputNumOfResults = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumOfResults(parseInt(e.target.value, 10));
    console.log(numOfResults);
  };
  const handleQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
    console.log(question);
  }; 

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatRequest =await getAllChats();
        console.log(chatRequest);
        setChats(chatRequest.data.chats); // Store the chat titles and IDs
        
        console.log("Fetched chats:", chatRequest.data.chats[0].title);
      } catch (error) {
        
      }
      try {
        const modelRequest = await getAllModels();
        const modelNames = modelRequest.data.models.map(model => model.name);
        const modelDescriptions = modelRequest.data.models.map(model => model.description);
      
        setModels(modelNames);
        setDescription(modelDescriptions);
      } catch (error) {
        
      }


    };

    fetchChats();
  }, []);

  const handleSelectChat = (selectedChat) => {
    console.log(selectedChat);
    setMessagesList(selectedChat['messages']);
    setChunk(selectedChat['chunks']);
    setNumOfResults(selectedChat['numofresults']);
    setFileList(selectedChat['fileName']);
    setChatId(selectedChat['_id']);
    setTitle(selectedChat['title']);
    // Update messagesList with messages from the selected chat
  };
  const handleSelectedModel = (value) => {
    setSelectedModel(value);
    console.log("Selected model:",value);  // This will log the selected model's name
  };

const handleLogOut=()=>{
sessionStorage.clear("token");
navigate('/');
};

  const updateChat = async (event) => {
    event.preventDefault();
    const fileArray = Array.from(files);
       if (!fileList.length) {
      alert("Please select a file first.");
      return;
    }
    setIsDrawerOpen(false);
    console.log(
      "Selected files:",
      fileArray.map((file) => file.name)
    );
        // Check if the current file selection includes a new file
    const newFiles = fileArray.filter((file) => file.name !== PreFileName);
    const fileNames = fileArray.map((file) => file.name);
    console.log(areArraysNotEqual(fileNames,PreFileName));
    
    try {
      console.log(chunks);
      console.log(numOfResults);
      const uploadResponse = await updateConfiguration(chatId,chunks,numOfResults,selectedModel);

      console.log("Files uploaded successfully:", uploadResponse.data);
      
  } catch (error) {
    setShowErrorModal(true);
        return;
      }
  
    if (areArraysNotEqual(fileNames,PreFileName)) {
    try {
      console.log("Uploading new files...");

        const formData = new FormData();
        newFiles.forEach((file) => formData.append("files", file));

        const uploadResponse = await updateFiles(chatId,formData);

        console.log("Files uploaded successfully:", uploadResponse.data);
        
    } catch (error) {
      setShowErrorModal(true);
          return;
        }
      }
      

  };
  


  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuestion("");
    
    try {
      setMessagesList((prevMessages) => [
        ...prevMessages,
        { content: question, message_type: "request" }
      ]);
      
const queryResponse = await addMessage(chatId,question);
      // const responseContent = queryResponse.data.message;
      // setResponseMessage(responseContent);

      // const newResponse = { type: "response", content: responseContent };
      setMessagesList((prevMessages) => [
        ...prevMessages,
        { content: queryResponse.data.content, message_type: "response" }
      ]);

      console.log("Query response:", queryResponse);
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  return (
    <>
    
    {showErrorModal&&<ErrorModal/>}
    <div className="grid flex h-screen w-full pl-[30px] pb-0">
      <aside className="inset-y fixed  left-0 z-20 flex h-screen flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg bg-muted"
                aria-label="Playground"
              >
                <SquareTerminal className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Playground
            </TooltipContent>
          </Tooltip> */}
          
      
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
              >
                <SquareUser className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Account
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <img 
        src="src/assets/DALL·E 2024-08-25 01.06.39 - A minimalistic app logo featuring an Axolotl, illustrated in black and white. The Axolotl is stylized with simple, clean lines and is shown reading a .jpg"
         alt="" style={{ width: '40px', height: '40px' }} />
          <div className="axolotl-text">Axolotl</div>
        
      
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MessageSquareText className="size-8 " />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[1vh]">

            <MySideBar initialChats={chats} onSelectChat={handleSelectChat} ></MySideBar>
            </DrawerContent>


          </Drawer>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
            onClick={handleLogOut}
          >
            Log out
          </Button>
        </header>
        <main className="grid flex-1 h-20 gap-4 overflow-auto pl-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid w-full items-start gap-6">

            <MySideBar initialChats={chats} onSelectChat={handleSelectChat} ></MySideBar>
            </form>
          </div>

          <div className="relative flex h-[660px]  flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <ScrollArea ref={scrollAreaRef} className="h-[660px] w-full rounded-md  overflow-auto ">
              <Badge variant="outline" className=" left-3 top-3 border-0 items-end ">
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild >
              <Button  variant="ghost" size="icon" >
                <Settings className="size-4 fixed" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
              <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0" onSubmit={updateChat}>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Settings
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="model">Model</Label>
                    <Select onValueChange={handleSelectedModel}> {/* Use onValueChange or onChange depending on the library */}
  <SelectTrigger
    id="model"
    className="items-start [&_[data-description]]:hidden"
    >
    <SelectValue placeholder="Select a model" />
  </SelectTrigger>
  <SelectContent>
    {models.map((model, index) => (
      <SelectItem key={model} value={model.toLowerCase()}>
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">{model}</span>
            </p>
            <p className="text-xs" data-description>
              {description[index]}
            </p>
          </div>
        </div>
      </SelectItem>
    ))}
  </SelectContent>
</Select>

                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="length-of-chunk">length of chunk</Label>
                    <Input
                      id="length-of-chunk"
                      type="number"
                      placeholder="500"
                      value={chunks}
                      onChange={handleInputChunks}
                    />
                  </div>

                  <Label htmlFor="number-of-close-results">
                    number of close results
                  </Label>
                  <Input
                    id="number-of-close-results"
                    type="number"
                    placeholder="1"
                    value={numOfResults}
                    onChange={handleInputNumOfResults}
                  />
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <FileUploader
                      setFiles={setFiles}
                      setFileList={setFileList}
                    ></FileUploader>
                    <div className="mt-4">
                      <ul className="overflow-x-auto">
                        {(fileList || []).map((fileName, index) => (
                          <li
                            key={index}
                            className="list-none p-0 m-0 flex flex-wrap w-20"
                          >
                            {fileName}
                          </li>
                        ))}
                      </ul>
                    </div>

                <Button type="submit" size="sm" className=" gap-1 text-lg ">Submit Configuration  </Button> 
                  </div>
                  
                </fieldset>
          
                 
              </form>
            </DrawerContent>


          </Drawer>
              </Badge>
              {(messagesList || []).map((msg, index) =>
  msg.message_type === "request" ? (
    <MessageRequest key={index} text={msg.content} />
  ) : (
    <MessageResponse key={index} text={msg.content} />
  )
)}

              <div className="flex-1" />
            </ScrollArea>
            <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
              onSubmit={handleFormSubmit}
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                value={question}
                onChange={handleQuestion}
              />
              <div className="flex items-center p-3 pt-0">
                 <Tooltip>
         
                </Tooltip>
                <Button type="submit" size="sm" className="ml-auto mb-3 gap-1.5">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
