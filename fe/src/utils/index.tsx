export function convertTimeToIntWithoutSeconds(timeString:string) {
  // Kiểm tra định dạng giờ
  if (!/\d{1,2}:\d{1,2}/.test(timeString)) {
    throw new Error("Invalid time format");
  }

  // Chia nhỏ chuỗi giờ
  const [hours, minutes] = timeString.split(":");

  // Chuyển đổi giờ thành số phút
  const totalMinutes = +hours * 60 + parseInt(minutes);

  return totalMinutes;
}

// Ví dụ sử dụng

export function convertIntToTimeWithoutSeconds(totalMinutes:number) {
  // Kiểm tra giá trị đầu vào
  if (isNaN(totalMinutes)) {
    throw new Error("Invalid total minutes");
  }
  if (totalMinutes < 0) totalMinutes = -totalMinutes;

  // Tính toán số giờ
  const hours = Math.floor(totalMinutes / 60);

  // Tính toán số phút
  const minutes = totalMinutes % 60;

  // Định dạng chuỗi giờ
  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return timeString;
}

// Ví dụ sử dụng
