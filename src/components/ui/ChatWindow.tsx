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
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { MessageRequest } from "./components/ui/MessageRequest.tsx";
  import { MessageResponse } from "./components/ui/MessageResponse.tsx";
  import { UploadFile } from "./UploadFile";
  
export function ChatWindow({ messages }) {
  return (
        
    <div className="relative flex h-full max-h-[85vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
    <ScrollArea className="h-full w-full rounded-md  overflow-auto">
      <Badge variant="outline" className=" left-3 top-3  items-end ">
      <Drawer>
    <DrawerTrigger asChild>
      <Button variant="ghost" size="icon" >
        <Settings className="size-4" />
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
      <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Settings
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="model">Model</Label>
            <Select>
              <SelectTrigger
                id="model"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="genesis">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Rabbit className="size-5" />
                    <div className="grid gap-0.5">
                      <p>
                        Neural{" "}
                        <span className="font-medium text-foreground">
                          Genesis
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        Our fastest model for general use cases.
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="explorer">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Bird className="size-5" />
                    <div className="grid gap-0.5">
                      <p>
                        Neural{" "}
                        <span className="font-medium text-foreground">
                          Explorer
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        Performance and speed for efficiency.
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="quantum">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Turtle className="size-5" />
                    <div className="grid gap-0.5">
                      <p>
                        Neural{" "}
                        <span className="font-medium text-foreground">
                          Quantum
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        The most powerful model for complex
                        computations.
                      </p>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="length-of-chunk">length of chunk</Label>
            <Input
              id="length-of-chunk"
              type="number"
              placeholder="500"
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
                {fileList.map((fileName, index) => (
                  <li
                    key={index}
                    className="list-none p-0 m-0 flex flex-wrap w-20"
                  >
                    {fileName}
                  </li>
                ))}
              </ul>
            </div>

           
          </div>
        </fieldset>
      </form>
    </DrawerContent>


  </Drawer>
      </Badge>
      {messagesList.map((msg, index) =>
        msg.type === "request" ? (
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
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Attach File</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Use Microphone</TooltipContent>
        </Tooltip>
        <Button type="submit" size="sm" className="ml-auto gap-1.5">
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  </div>
  );
}

