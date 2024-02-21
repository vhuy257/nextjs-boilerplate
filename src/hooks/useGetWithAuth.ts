import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/constant/constant";
import { baseKy } from "@/helper/auth";

export default function useGet() {
    const { data, status }: any = useSession()

    const mutation: any = useMutation({
        mutationFn: async (url: string) => {
            const res = await baseKy.extend({
                hooks: {
                    beforeRequest: [
                        request => {
                            request.headers.set('Authorization', 'Bearer ' + data?.user?.accessToken);
                        }
                    ]
                }
            }).get(url).json();
            
            return res;
        }
    })

    useEffect(() => {
        if(status === 'authenticated') {
            mutation.mutate(API_URL.LIST_USER);
        }
    }, [status, data])

    return {
        mutation,
    }
}
