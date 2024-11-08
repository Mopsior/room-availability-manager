/**
 * Handling error (in promise)
 * @param promise function which you want to handle error
 * @returns Promise<[undefined, T] | [Error]>
 */
export const catchError = <T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> => {
	return promise
        .then(data => {
            return [undefined, data] as [undefined, T]
        })
        .catch(error => {
            return [error]
        })
}