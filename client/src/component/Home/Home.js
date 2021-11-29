import React from "react";
import './style.css';
import { useHistory } from "react-router-dom";


export default function Home() {

    let history = useHistory();

    const goToSignIn = () => {
        history.push("/SignIn");
    }
    const goToSignUp = () => {
        history.push("/SignUp");
    }

    return (
        <div className="home">
            <div className="navbar" >
                <div className="logo">
                    <a href="#contain">LONELY CAT</a>
                </div>
                <div className="nav-link">
                    <a href="#slogan">Tìm hiểu về LONELY CAT</a>
                </div>
                <div className="nav-link">
                    <a href="#blog">Blog</a>
                </div>
                <div className="nav-link">
                    <a href="#footer">Liên Hệ</a>
                </div>

            </div>
            <div className="contain" id="contain">
                <img src="http://localhost:3000/img/gannett.jpg" alt="" className="image" />
                <div className="contain-img">
                    <h2>
                        Mạng xã hôi nơi tìm kiếm bạn bè
                    </h2>
                    <h2>
                        cùng LONELY CAT
                    </h2>
                    <button className="btn" onClick={goToSignIn}>SIGN IN</button>
                    <button className="btn" onClick={goToSignUp}>SIGN UP</button>
                </div>
            </div>
            <div className="contain-txt" id="slogan">
                <div className="slogan">
                    <h2>Vì Sao Chọn LONELY CAT?</h2>
                    <p>
                        LONELY CAT là trang web về người Việt và hẹn hò Việt hàng đầu đã kết nối hàng ngàn người VIệt độc thân với người phù hợp lý tưởng để yêu
                        , hẹn hò và tiến tới kết hôn
                        . Nếu bạn đang mong muốn tìm kiếm những trải nghiệm thú vị về hẹn hò với người Việt
                        , LONELY CAT là trang web cho bạn.
                    </p>
                    <h2>Trang Web Hẹn Hò Người Việt Lớn Nhất</h2>
                    <p>
                    LONELY CAT là một phần của mạng lưới nổi tiếng Cupid Media điều hành hơn 30 trang web hẹn hò danh tiếng. Với cam kết kết nối người độc thân trên thế giới, chúng tôi mang Việt Nam đến với bạn.
                    </p>
                    <p>
                        Chúng tôi có lượng thành viên người Việt độc thân lớn nhất, tính năng tìm kiếm chi tiết và gửi tin nhắn cao cấp sẽ giúp bạn tìm người Việt Nam phù hợp với tiêu chí của bạn. Chúng tôi cam kết sẽ giúp bạn tìm người phù hợp nhất, dù bạn ở đâu trên thế giới này.
                    </p>
                    <h2>
                        Hãy Bắt Đầu Câu Chuyện Thành Công Của Bạn Trên LONELY CAT
                    </h2>
                    <p>
                        Là trang web hẹn hò hàng đầu Việt Nam, chúng tôi đã thành công trong việc mang những người độc thân trên thế giới đến với nhau. Hàng ngàn đàn ông và phụ nữ hạnh phúc đã tìm thấy người bạn đời của mình trên trang MEET & LOVE và chia sẻ câu chuyện của họ với chúng tôi. Hãy xem những câu chuyện thành công này tại đây.
                    </p>
                    <p>
                        Để có những trải nghiệm thú vị, an toàn và độc đáo về hẹn hò với người Việt, hãy tham gia miễn phí ngay hôm nay.
                    </p>
                </div>
            </div>
            
            <div className="footer" id='footer'>
                <div className="footer-info-parent">
                    <div className="footer-info">
                        <span style={{ fontWeight: 700, fontSize: 13 }}>HỖ TRỢ KHÁCH HÀNG</span>
                        <li style={{ paddingTop: 10 }}><span style={{ fontWeight: 700, fontSize: 14, color: 'red' }}>Hotline chăm sóc khách hàng: 0123456789</span><br />
                            (1000đ/phút , 8-21h kể cả T7, CN)
                        </li>
                        <li className="li-footer">
                            <a href="/">Các câu hỏi thường gặp</a>
                        </li>
                        <li className="li-footer">
                            <a href="/">Gửi yêu cầu hỗ trợ</a>
                        </li>
                        <li className="li-footer">
                            <a href="/">Các câu hỏi thường gặp</a>
                        </li>
                        <li className="li-footer">
                            Hỗ trợ khách hàng: <a href="/">longlc956@gmail.com</a>
                        </li>
                        <li className="li-footer">
                            Báo lỗi bảo mật: <a href="/">longlc956@gmail.com</a>
                        </li>
                    </div>
                    <div className="footer-info">
                        <span style={{ fontWeight: 700, fontSize: 13 }}>VỀ LONELY CAT</span>
                        <li style={{ paddingTop: 10 }}>
                            <a href="/"> Giới thiệu LONELY CAT</a>

                        </li>
                        <li className="li-footer">
                            <a href="/">Các câu hỏi thường gặp</a>
                        </li>
                        <li className="li-footer">
                            <a href="/">Tuyển Dụng</a>
                        </li>
                        <li className="li-footer">
                            <a href="/">Chính sách bảo mật thông tin cá nhân</a>
                        </li>
                        <li className="li-footer">
                            <a href="/">Chính sách giải quyết khiếu nại</a>
                        </li>

                    </div>
                    <div className="footer-info">
                        <span style={{ fontWeight: 700, fontSize: 13 }}>PHÁP LÝ</span>
                        <li style={{ paddingTop: 10 }}>
                            <a href="/">Điều khoản sử dụng </a>

                        </li>
                        <li className="li-footer">
                            <a href="/">Quyền riêng tư </a>
                        </li>
                        <li className="li-footer">
                            <a href="/">Nguyên tắc cộng đồng</a>
                        </li>

                    </div>
                    <div className="footer-info">
                        <span style={{ fontWeight: 700, fontSize: 13 }}>THEO DÕI CHÚNG TÔI </span>
                        <p style={{ paddingTop: 10 }} className="footer-pttt">
                            <a href="https://www.facebook.com/profile.php?id=100008940035627" target="_blank" rel="noopener noreferrer">
                                <img src="http://localhost:3000/img/fb.png" alt=""></img>
                            </a>
                            <a href="/">
                                <img src="http://localhost:3000/img/instagram.png" alt=""></img>
                            </a>
                            <a href="/">
                                <img src="http://localhost:3000/img/twt.png" alt=""></img>
                            </a>
                            <a href="/">
                                <img src="http://localhost:3000/img/ytube.png" alt=""></img>
                            </a>
                            <a href="/">
                                <img src="http://localhost:3000/img/pinterest.png" alt=""></img>
                            </a>
                        </p>
                    </div>

                </div>
                <div className="footer-info-address">
                    <p>
                        Địa chỉ văn phòng: Kí túc xá Mễ Trì , quận Thanh Xuân ,  Hà Nội <br />
                        <span style={{ fontSize: 11 }}>
                            kết bạn bốn phương cùng LONELY CAT, tìm kiếm nửa kia dễ dàng
                        </span>
                    </p>

                </div>
                <div className="footer-bq">
                    <span>
                        © 2021 - Bản quyền của Công Ty Cổ Phần PVL<br />
                        Giấy chứng nhận Đăng ký do hội người FA Việt Nam cấp ngày 19/10/2021
                    </span>
                </div>
            </div>
        </div>


    );
}
