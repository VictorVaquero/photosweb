import { auth } from "@/auth"
import { fetchObjectList } from "../services/s3Service"

export default async function PhotoList() {
    const session = await auth()
    if (!session?.user?.name) return null
    const photoList = await fetchObjectList({ prefix: session.user.name })

    return <div>
        {photoList?.map((obj) => obj.Key)}
    </div>
}