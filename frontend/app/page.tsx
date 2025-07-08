"use client";

import { useRouter } from "next/navigation";
import LexicalMdEditor from "@/components/notes/LexicalMdEditor";
import { Button } from "@/components/ui/button";

const page = () => {
	const router = useRouter();
	const handleClick = () => {
		router.push("/notes");
	};
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-primary">Hello World</h1>
			<Button onClick={handleClick}>Go to Notes</Button>
			<hr/>

			<h2 className="text-primary">Lexical Md Editor</h2>
			<LexicalMdEditor />
		</div>
	);
};

export default page;
