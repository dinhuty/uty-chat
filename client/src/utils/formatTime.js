
export const formatTime = (createdAt) => {
    const currentDate = new Date(); 
    const createdAtDate = new Date(createdAt);

    const timeDifference = currentDate - createdAtDate;

    let formattedTime;

    if (timeDifference >= 24 * 60 * 60 * 1000) {
        formattedTime = `${Math.floor(timeDifference / (24 * 60 * 60 * 1000))} ngày`;
    } else if (timeDifference >= 60 * 60 * 1000) {
        formattedTime = `${Math.floor(timeDifference / (60 * 60 * 1000))} giờ`;
    } else if (timeDifference >= 60 * 1000) {
        formattedTime = `${Math.floor(timeDifference / (60 * 1000))} phút`;
    } else {
        formattedTime = "vừa xong";
    }

    return formattedTime;
}


