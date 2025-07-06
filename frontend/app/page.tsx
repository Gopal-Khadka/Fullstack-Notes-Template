"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/hooks/useNote";

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
