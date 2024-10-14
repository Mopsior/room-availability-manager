/**
 * Room block component
 * @param name Room name (ex. room number: 101)
 * @param description Room description (ex. Meeting room)
 * @param full Is room occupied
 */
export const Block = ({ name, description, full }: { name: string, description: string, full: boolean }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    )
}