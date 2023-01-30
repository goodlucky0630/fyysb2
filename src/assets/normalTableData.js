export const Normal_Table_Data = [
    {
        id: 1,
        attribute: "code",
        access: "WRITE_ON_CREATE",
        optionality: "REQUIRED_FOR_SAVE"
    },
    {
        id: 2,
        attribute: "name",
        access: "WRITE",
        optionality: "REQUIRED_FOR_SAVE"
    },
    {
        id: 3,
        attribute: "images",
        access: "WRITE",
        optionality: "REQUIRED_FOR_PUBLISH"
    },
    {
        id: 4,
        attribute: "products",
        access: "READ",
        optionality: "OPTIONAL"
    }
]