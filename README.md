# uty-chat
# Chat App Realtime

## Mô tả

Dự án Chat App Realtime là một ứng dụng trò chuyện thời gian thực xây dựng bằng Node.js Express (phía máy chủ) và React.js (phía máy khách). Ứng dụng cho phép người dùng tạo và tham gia các phòng trò chuyện, gửi tin nhắn thời gian thực và trò chuyện với nhau.

## Các chức năng chính

- Đăng nhập và đăng ký tài khoản người dùng.
- Tạo và tham gia các phòng trò chuyện.
- Gửi tin nhắn trong thời gian thực trong các phòng trò chuyện.
- Xem danh sách người dùng trực tuyến.

## Cài đặt

### Yêu cầu

- Node.js và npm cần được cài đặt trước trên máy tính của bạn.
- Một máy chủ MongoDB (cục bộ hoặc từ xa) để lưu trữ dữ liệu.

### Server

1. Di chuyển đến thư mục máy chủ:
   cd server
2. Cài đặt các gói npm cần thiết:

  npm install
  Đặt biến môi trường cho máy chủ trong một tệp .env và cấu hình nó (ví dụ: PORT, MongoDB URI).

3. Khởi động máy chủ:

  npm start
### Client
1. Di chuyển đến thư mục máy khách:

cd client
2. Cài đặt các gói npm cần thiết:

npm install
Đặt biến môi trường cho máy khách trong một tệp .env (ví dụ: REACT_APP_API_URL).
3. Khởi động
npm start

Sử dụng
Truy cập ứng dụng trong trình duyệt của bạn tại địa chỉ http://localhost:3000 (hoặc cổng bạn đã cấu hình).

Chức năng: Đăng ký đăng nhập, phân quyền, xác thực người dùng, phân quyền nhóm chát
Chat: Thêm phòng chat, tạo cuộc trò chuyện, tạo nhóm chat, rời phòng, xóa nhóm chat
User: Chỉnh sửa profile, biệt danh nhóm chat, thả cảm xúc, lưu trữ cuộc trò chuyện
