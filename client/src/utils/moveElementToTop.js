export const moveElementToTop = (list, idToMove) => {
    const clonedList = [...list]; // Tạo bản sao của mảng ban đầu

    const index = clonedList.findIndex(item => item._id === idToMove);
    if (index !== -1) {
        const elementToMove = clonedList.splice(index, 1)[0];
        clonedList.unshift(elementToMove);
    }

    return clonedList;
}