import ky from 'ky'

export default function useGet() {
    const kyGetData = async (url: string) => {
        try {
            return await ky.get(url).json()
        } catch (error: any) {
            if (error.name === 'HTTPError') {
                const errorJson = await error.response.json();
                throw new Error(errorJson.message)
            }
        }
    }

    return {
        kyGetData
    }
}
