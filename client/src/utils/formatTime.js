// timeUtils.js

export const formatTime = (createdAt) => {
    const currentDate = new Date(); // Ngày hiện tại
    const createdAtDate = new Date(createdAt); // Ngày từ tin nhắn cuối cùng

    const timeDifference = currentDate - createdAtDate; // Thời gian chênh lệch (tính bằng mili giây)

    let formattedTime;

    if (timeDifference >= 24 * 60 * 60 * 1000) {
        // Nếu thời gian lớn hơn 1 ngày, in ra ngày
        formattedTime = `${Math.floor(timeDifference / (24 * 60 * 60 * 1000))} ngày`;
    } else if (timeDifference >= 60 * 60 * 1000) {
        // Nếu thời gian lớn hơn hoặc bằng 1 giờ, in ra số giờ
        formattedTime = `${Math.floor(timeDifference / (60 * 60 * 1000))} giờ`;
    } else if (timeDifference >= 60 * 1000) {
        // Nếu thời gian lớn hơn 1 phút, in ra số phút
        formattedTime = `${Math.floor(timeDifference / (60 * 1000))} phút`;
    } else {
        // Nếu thời gian nhỏ hơn 1 phút, in ra "now"
        formattedTime = "vừa xong";
    }

    return formattedTime;
}


