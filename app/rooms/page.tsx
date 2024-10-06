import { getDatabases, getLoggedInUser } from "@/lib/server/appwrite"
import { ID } from "node-appwrite"

export default async function Page() {
    console.log(3)
    const databases = await getDatabases() // +
    console.log(4)
    const user = await getLoggedInUser()
    console.log(5)

    // const documents = await databases.database.listDocuments(
    //     process.env.NEXT_PUBLIC_ROOMS_DB as string,
    //     process.env.NEXT_PUBLIC_ROOMS_COLLECTION as string,
    //     [
    //         Query.select(['*'])
    //     ]
    // )

    // console.log(documents)

    // try {

    //     const newDoc = await databases.database.createDocument(
    //         process.env.NEXT_PUBLIC_ROOMS_DB as string,
    //         process.env.NEXT_PUBLIC_ROOMS_COLLECTION as string,
    //         ID.unique(),
    //         { 
    //             'name': 'test',
    //             'description': 'test123',
    //             'full': true,
    //             'last_entry': '2021-09-01T00:00:00Z',
    //         }
    //     )
    //     console.log(newDoc)
    // } catch (err) {
    //     console.error(err)
    // }


    return (
    <>
        <p>meow</p>
        { user ? user.email : 'Not logged in' }
    </>
    )
}