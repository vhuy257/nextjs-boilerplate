import { useMutation } from "@tanstack/react-query"
import useKyAuth from "./useKyAuth";
import { queryClient } from "@/helper/auth";

interface User {
    name: string;
    email: string;
    password: string;
}

export default function useUser() {
    const { kyAuth } = useKyAuth()
    
    //Create new user
    const createUser = useMutation({
        mutationKey: ['createUser'],
        mutationFn: async ({ url, user }: { url: string, user: User }) => {
            const res = await kyAuth.post(url, {
                json: user
            }).json();
            return res;
        },
        onSuccess: (result, variables, context: any) => {
            queryClient.invalidateQueries(
                {
                  queryKey: ['getUser'],
                  refetchType: 'active',
                },
            )
        }
    })


    //Get list users
    const getUsers = async (url: string) => {
        const res: any = await kyAuth.get(url).json();
        return res;
    }

    //Delete user
    const deleteUser = useMutation({
        mutationKey: ['deleteUser'],
        mutationFn: async ({ url }: { url: string }) => {
            return await kyAuth.delete(url)
        },
        onSuccess: (result, variables, context: any) => {
            queryClient.invalidateQueries(
                {
                  queryKey: ['getUser'],
                  refetchType: 'active',
                },
            )
        }
    })

    return {
        createUser,
        getUsers,
        deleteUser,
    }
}
