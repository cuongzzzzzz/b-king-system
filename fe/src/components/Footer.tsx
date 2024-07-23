import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-full  bg-[#F2F2F2] flex flex-col items-center">
      <div className="w-full px-5 lg:px-0 lg:w-10/12 xl:w-7/12 py-10">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <div className="grid grid-cols-2">
            <div>
              <p className="my-10 text-2xl font-bold">Tuyến đường</p>
              <ul>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>Xe đi Buôn Mê Thuột từ Sài Gòn</Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>Xe đi Vũng Tàu từ Sài Gòn</Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>Xe đi Nha Trang từ Sài Gòn</Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>Xe đi Đà Lạt từ Sài Gòn</Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>Xe đi Sapa từ Hà Nội</Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>Xe đi Hải Phòng từ Hà Nội</Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}> đi Vinh từ Hà Nội</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="my-10 text-2xl font-bold">Xe Limousine</p>
              <ul>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>Xe Limousine đi Đà Lạt từ Sài Gòn</Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>Xe đi Vũng Tàu từ Sài Gòn</Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>Xe đi Nha Trang từ Sài Gòn</Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>Xe đi Đà Lạt từ Sài Gòn</Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>Xe đi Sapa từ Hà Nội</Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>Xe đi Hải Phòng từ Hà Nội</Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}> đi Vinh từ Hà Nội</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex  md:justify-end ">
            <div>
              <p className="my-10 text-2xl font-bold">Tin tức</p>
              <ul>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>
                    Xe giường nằm Limousine – đỉnh cao mới của ngành xe khách
                  </Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>
                    Xe limousine đi Vũng Tàu: Tổng hợp top 6 xe chất lượng cao
                  </Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>
                    Review xe limousine đi Đà Lạt: những câu hỏi thường gặp
                  </Link>
                </li>
                <li className="text-[12px] my-5 underline font-semibold">
                  <Link to={"/"}>
                    Xe limousine đi Sapa: Tổng hợp top các hãng xe chất lượng
                    cao
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 my-10 gap-2">
          <p className=" text-2xl font-bold">Bến xe</p>
          <p className=" text-2xl font-bold">Nhà xe</p>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-2 gap-2">
          <ul>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Miền Đông</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Trung tâm Đà Nẵng</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Gia Lâm</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Mỹ Đình</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe An Sương</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Nước Ngầm</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Miền Tây</Link>
            </li>
          </ul>
          <ul>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Miền Đông</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Trung tâm Đà Nẵng</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Gia Lâm</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Mỹ Đình</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe An Sương</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Nước Ngầm</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Miền Tây</Link>
            </li>
          </ul>
          <ul>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Miền Đông</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Trung tâm Đà Nẵng</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Gia Lâm</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Mỹ Đình</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe An Sương</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Nước Ngầm</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Miền Tây</Link>
            </li>
          </ul>
          <ul>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Miền Đông</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Trung tâm Đà Nẵng</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Gia Lâm</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Mỹ Đình</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe An Sương</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Nước Ngầm</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Miền Tây</Link>
            </li>
          </ul>
          <ul>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Miền Đông</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Trung tâm Đà Nẵng</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Gia Lâm</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Mỹ Đình</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe An Sương</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Nước Ngầm</Link>
            </li>
            <li className="text-[12px] my-5 underline font-semibold">
              <Link to={"/"}>Bến xe Miền Tây</Link>
            </li>
          </ul>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
          <div>
            <p className="my-10 text-2xl font-bold">Hỗ trợ</p>
            <ul>
              <li className="text-[12px] my-5 underline font-semibold">
                <Link to={"/"}>Hướng dẫn thanh toán</Link>
              </li>
              <li className="text-[12px] my-5 underline font-semibold">
                <Link to={"/"}>Quy chế Vexere.com</Link>
              </li>
              <li className="text-[12px] my-5 underline font-semibold">
                <Link to={"/"}>Chính sách bảo mật thông tin</Link>
              </li>
              <li className="text-[12px] my-5 underline font-semibold">
                <Link to={"/"}>Chính sách bảo mật thanh toán</Link>
              </li>
              <li className="text-[12px] my-5 underline font-semibold">
                <Link to={"/"}>
                  Xe đi Sapa từ Hà NộiChính sách và quy trình giải quyết tranh
                  chấp, khiếu nại
                </Link>
              </li>
              <li className="text-[12px] my-5 underline font-semibold">
                <Link to={"/"}>Câu hỏi thường gặp</Link>
              </li>
              <li className="text-[12px] my-5 underline font-semibold">
                <Link to={"/"}>Tra cứu đơn hàng</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="my-10 text-2xl font-bold">Về chúng tôi</p>
            <ul>
              <li className="text-[12px] my-5 underline font-semibold">
                <Link to={"/"}>Phần mềm đại lý</Link>
              </li>
              <li className="text-[12px] my-5 underline font-semibold">
                <Link to={"/"}>Giới Thiệu Vexere.com</Link>
              </li>
              <li className="text-[12px] my-5 underline font-semibold">
                <Link to={"/"}>Tuyển dụng</Link>
              </li>
              <li className="text-[12px] my-5 underline font-semibold">
                <Link to={"/"}>Tin tức</Link>
              </li>
              <li className="text-[12px] my-5 underline font-semibold">
                <Link to={"/"}>Liên hệ</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="my-10 text-2xl font-bold">Đối tác thanh toán</p>

            <img src="/1.png" alt="" className="w-10/12" />
          </div>
          <div>
            <p className="my-10 text-2xl font-bold">Tải ứng dụng vé xe rẻ</p>
            <img src="/qr.png" className="w-10/12" alt="" />
          </div>
        </div>
      </div>
      <div className="w-full px-5  bg-white h-[250px] lg:h-[188px] flex flex-col justify-center items-center gap-3">
        <p className=" text-[17.5px] font-bold">
          Công ty TNHH Thương Mại Dịch Vụ Vexere
        </p>
        <p className="text-[7.5px] text-[#767676]">
          Địa chỉ đăng ký kinh doanh: 8C Chữ Đồng Tử, Phường 7, Quận Tân Bình,
          Thành Phố Hồ Chí Minh, Việt Nam
        </p>
        <div className="flex flex-col items-center">
          <p className="text-[#767676]">
            Địa chỉ: Lầu 2, tòa nhà H3 Circo Hoàng Diệu, 384 Hoàng Diệu, Phường
            6, Quận 4, Tp. Hồ Chí Minh, Việt Nam
          </p>
          <p className="text-[#767676]">
            Tầng 3, toà nhà 101 Láng Hạ, Đường 101 Láng Hạ, Phường Láng Hạ, Quận
            Đống Đa, Hà Nội, Việt Nam
          </p>
          <p className="text-[#767676]">
            Giấy chứng nhận ĐKKD số 0315133726 do Sở KH và ĐT TP. Hồ Chí Minh
            cấp lần đầu ngày 27/6/2018
          </p>
          <p className="text-[#767676]">Bản quyền © 2020 thuộc về Vexere.Com</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
