import { useMutation } from "@tanstack/react-query"
import useKyAuth from "./useKyAuth";
import { queryClient } from "@/helper/auth";

interface User {
    title: string;
    description: string;
    body: string;
    published: boolean
}

export default function useArticle() {
    const { kyAuth } = useKyAuth()
    
    //Create new user
    const createArticle = useMutation({
        mutationKey: ['createArticle'],
        mutationFn: async ({ url, user }: { url: string, user: User }) => {
            const res = await kyAuth.post(url, {
                json: user
            }).json();
            return res;
        },
        onSuccess: (result, variables, context: any) => {
            queryClient.invalidateQueries(
                {
                  queryKey: ['articles'],
                  refetchType: 'active',
                },
            )
        }
    })

    return {
        createArticle    
    }
}
