"use client";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/hooks/useNote";
import React from "react";

const page = () => {
  const { data, isLoading, error } = useNotes();
  const handleClick = () => {
    console.log(data);
  };
  return (
    <div className="text-quaternary">
      <h1 className="text-primary">Hello World</h1>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
};

export default page;
