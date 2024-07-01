import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Thank from "./Thank";
// import { BACK_END_HOST } from "../utils/AppConfig.js";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// // import { clearProduct } from "../redux/Slices/cartSlice.js";
// import axios from "axios";
import Swal from "sweetalert2";

const QrModal = (props) => {
  const { show, setShow, total, uuid, postData, ...rest } = props;
  const bank = {
    BANK_ID: "MBBank",
    ACCOUNT_NO: "0345919996",
    TEMPLATE: "compact2",
    AMOUNT: total,
    DESCRIPTION: uuid,
    ACCOUNT_NAME: "MAI NGOC TU",
  };
 console.log(rest);
  const api_get = "https://oauth.casso.vn/v2/transactions?sort=DESC";
  const CASSO_API_KEY =
    "AK_CS.0b6c9e80354811efb7127b03250987c0.ZnXRITph6WUlCTcdovCSLoVYzOv2CIv6hl1xvhhEGi9hkSr2YKNpFLM0D4qjTZA3vLrnU3rK";

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [isPaid, setIsPaid] = useState(false);
console.log(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    try {
      const res = await fetch(api_get, {
        headers: {
          Authorization: `apikey ${CASSO_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();
      setData(jsonData);

      //handle send success
      jsonData.data.records.forEach((trans) => {
        //lam tron xuong va so sanh + xoa dau '-' cua uuid
        if (
          Math.floor(trans.amount) >= Math.floor(total) &&
          trans.description.includes(uuid.replace(/-/g, ""))
        ) {
          // saveOrder();
          setIsPaid(true);
          toast.success("Thanh toán thành công ❤️\nCảm ơn bạn");
          setTimeout(() => {
            navigate("/");
          }, 4000);
          return;
        }
      });
    } catch (error) {
      console.log("fetchData qr error", error);
    }
  };

  useEffect(() => {
    if (show && !isPaid) {
      fetchData();

      const intervalId = setInterval(() => {
        fetchData();
      }, 3000);

      //clear khi component bi huy
      return () => clearInterval(intervalId);
    }
  }, [show, isPaid, fetchData]);

  // const saveOrder = async () => {
  //   axios
  //     .post(`${BACK_END_HOST}/order`, postData)
  //     .then((res) => {
  //       setIsPaid(true);
  //       toast.success("Thanh toán thành công ❤️\nCảm ơn bạn");
  //       dispatch(clearProduct());
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 4000);
  //     })
  //     .catch((error) => {
  //       console.log("saveOrder error:", error);
  //       toast.error(
  //         "Có lỗi gì đó đã xảy ra!😭\nVui lòng liên hệ admin qua facebook/zalo/sdt"
  //       );
  //     });
  // };

  const handleClose = () => {
    Swal.fire({
      title: "Bạn có muốn dừng thanh toán?",
      text: 'Nếu bạn đã chuyển khoản vui lòng ấn nút "ĐÓNG" và đợi chúng mình trong giây lát!',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#057130",
      cancelButtonText: "Đóng",
      confirmButtonText: "Hủy thanh toán",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsPaid(false);
        setShow(false);
      }
    });
  };

  return (
    <div>
      <Modal show={show} style={{ minWidth: "100%" }}>
        {isPaid ? (
          <Thank />
        ) : (
          // <div>
          //     <Modal.Header>
          //         <Modal.Title style={{ color: 'red' }}>
          //             Vui lòng không sửa nội dung chuyển khoản!<br/>
          //         </Modal.Title>
          //     </Modal.Header>
          //     <Modal.Body>
          //         <img src={`https://img.vietqr.io/image/${bank.BANK_ID}-${bank.ACCOUNT_NO}-${bank.TEMPLATE}.png?amount=${bank.AMOUNT}&addInfo=${bank.DESCRIPTION}&accountName=${bank.ACCOUNT_NAME}`} alt="Error" width={'100%'} />
          //     </Modal.Body>
          //     <Modal.Footer>
          //         <Button variant="secondary" onClick={handleClose}>
          //             Đóng
          //         </Button>
          //     </Modal.Footer>
          // </div>
          <div className="position-fixed top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded">
              <h2 className="h5 fw-semibold mb-3">Thanh toán</h2>
              <div className="d-flex justify-content-center">
                <img
                  src={`https://img.vietqr.io/image/${bank.BANK_ID}-${bank.ACCOUNT_NO}-${bank.TEMPLATE}.png?amount=${bank.AMOUNT}&addInfo=${bank.DESCRIPTION}&accountName=${bank.ACCOUNT_NAME}`}
                  alt="Error"
                  className="w-50"
                />
              </div>
              <div className="mt-5">
                <div className="mb-4">
                  <label
                    className="form-label fw-semibold mb-2"
                    htmlFor="cardNumber"
                  >
                    Lưu ý: Không chỉnh sửa nội dung chuyển khoản các bạn nhée
                  </label>
                  <p className="text-danger">
                    Quá trình nhận nhận đơn có thể mất 2-3 phút sau chuyển
                    khoản, quý khách vui lòng không tắt popup này !!!
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <div></div>
                  <button
                    onClick={handleClose}
                    className="btn btn-danger fw-bold border border-danger px-4 py-2"
                  >
                    Hủy thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QrModal;
