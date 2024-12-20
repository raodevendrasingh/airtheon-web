"use client";

import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const { spaceName } = params;

    return <div>{spaceName} Page</div>;
}
