import { useSession } from "next-auth/react";
import { kyCustom } from "@/helper/auth";

export default function useKyAuth() {
    const { data }: any = useSession()

    const kyAuth = kyCustom.extend({
        hooks: {
            beforeRequest: [
                request => {
                    request.headers.set('Authorization', 'Bearer ' + data?.user?.accessToken);
                }
            ]
        }
    })

    return {
        kyAuth
    }
}
