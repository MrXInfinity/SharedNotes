type eachListType<T> = {
    data: T[],
    setData: React.Dispatch<React.SetStateAction<T>>
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>
}


export type {eachListType}