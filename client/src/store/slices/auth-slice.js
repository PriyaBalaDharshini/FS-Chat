export const createAuthSlice = (set) => (//there are 2 methods set and get . as we are not goining to manipulate the details we are using set
    {
        userInfo: undefined,
        setUserInfo: (userInfo) => set({ userInfo })
    }
) 