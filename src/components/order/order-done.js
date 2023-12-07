import { CFormLabel, CImage } from "@coreui/react";
import React from "react";

const OrderDone  = () =>{
    return(
        <>
        <div style={{textAlign:"center",marginTop:"100px",marginBottom:"110px"}}>
        <CImage src="https://cdn-icons-png.flaticon.com/512/7041/7041760.png"></CImage>
        <CFormLabel style={{fontSize:"40px",color:"green"}}>Đặt hàng thành công </CFormLabel>

        </div>
        </>
    )
}
export default OrderDone;
