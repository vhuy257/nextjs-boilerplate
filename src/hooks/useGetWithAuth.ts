import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/constant/constant";
import useKyAuth from "./useKyAuth";
import { useSession } from "next-auth/react";

export default function useGet() {
    const { status } = useSession()
    const { kyAuth } = useKyAuth()

    const mutation: any = useMutation({
        mutationFn: async (url: string) => {
            const res = await kyAuth.get(url).json();
            return res;
        }
    })

    useEffect(() => {
        if(status === 'authenticated') {
            mutation.mutate(API_URL.LIST_USER);
        }
    }, [status])

    return {
        mutation,
    }
}
