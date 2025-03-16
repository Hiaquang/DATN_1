import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminUsersThem from "./admin_users_Them ";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { thoat } from './authSlice';

function AdminUser() {     
    document.title="Quản lý tài khoản";
    const [adminListUS, ganadminListUS] = useState( [] );
    const [refresh, setRefresh] = useState(false);
    const user = useSelector(state => state.auth.user);
    // const usevigate = useNavigate();
    useEffect ( () => {
       fetch("http://localhost:3000/admin/users")
       .then(res=>res.json()).then(data => ganadminListUS(data));     
    },[refresh]);
    const xoaUS = (id)  => {
        if  ( window.confirm('Bạn muốn xóa tài khoản này?')===false)  
                 return false;
                 fetch(`http://localhost:3000/admin/users/${id}`, {method:'delete'})
                 .then(res => res.json())
                 .then(data => {
                     if(data){
                        alert(data.thongbao);
                     }else{
                        alert(data.thongbao);
                        ganadminListUS(adminListUS.filter(user => user.id !== id))
                     }
                 }); 

    };
    const dispatch = useDispatch();
    const Logout = () => {
      if(window.confirm('Bạn muốn đăng xuất?')) {
        dispatch(thoat());
        window.location.href = '/';
      }
    };
    return(
        <div className="admin_product">
            <aside className="admin_product_aside" >
                <div className="admin_product_aside_header">
                        <div className="admin_product_aside_header_title_img">
                        <img src={user.hinh} alt={user.hinh} />
                                <h3>{user.name}</h3>
                                <hr className="hr"/>
                        </div>
                        <div className="admin_product_aside_header_menu">
                                <ul>
                                       <li><Link to="/admin"><i className="fa-solid fa-layer-group"></i> Quản lý Dashboard</Link></li>
                                       <li><Link to="/admin/category"><i class="fas fa-list-task"></i> Quản lý Danh mục</Link></li>
                                        <li><Link to="/admin/product"><i className="fa-solid fa-tags"></i> Quản lý sản phẩm</Link></li>
                                        <li><Link to="/admin/user"><i className="fa-solid fa-user"></i> Quản lý tài khoản</Link></li>
                                        <li><Link to="/admin/order"><i className="fa-solid fa-pen-to-square"></i> Quản lí đơn hàng</Link></li> 
                                </ul>
                        </div>
                        <div className="admin_product_aside_header_logout"> 
                              <p>Đăng xuất</p>
                              <Link to="/#" onClick={Logout}><i className="fa-solid fa-right-from-bracket"></i></Link>
                        </div>
                </div>
            </aside>
            <article className="admin_product_article">
                <div className="admin_product_article_header">
                    <div className="admin_product_article_header_icon_logout"><Link to="/admin"><i class="bi bi-house-door-fill"></i></Link></div>
                </div>
                <div className="admin_product_article_box_content">
                      <div className="admin_product_article_box_content_title">
                        <h2>Quản lý Danh mục</h2>
                      </div>
                      <div className="admin_product_article_box_content_bang">
                            <div className="admin_product_article_box_content_bang_box_btn">
                                  <div className="btn_add" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"><btn>Thêm tài khoản</btn></div>
                                  <div className="btn_del"><btn>Xóa tài khoản</btn></div>
                            </div>
                            <hr/>
                            <div className="so"  style={{marginBottom: '15px'}}>Hiện có <strong style={{border:  '1px solid #d4cfcf',padding: '5px'}} id="soSP">{adminListUS.length.toString()}</strong> tài khoản <i style={{fontSize: '20px'}} className="fa-solid fa-caret-down"></i></div>
                            <table className="admin_product_article_box_content_bang_table">
                              <thead>
                                <tr>
                                    <th>Hình</th>
                                    <th>Mã</th>
                                    <th style={{width:'30%'}}>Tên tài khoản</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Chức vụ</th>
                                    <th>Thao tác</th>
                                </tr>
                              </thead>
                                <tbody>
                                    {adminListUS.map((us, index) => {
                                        return(
                                    <tr style={{height:'100px',borderBottom: '1px solid #d4cfcf'}} key={index}>
                                        <td><img src={us.hinh} alt={us.hinh}  style={{width:'65px',height:'60px'}}/></td>
                                        <td style={{fontWeight:"600"}}>{us.id}</td>
                                        <td style={{fontWeight:"600"}}>{us.name}</td>
                                        <td style={{fontWeight:"600"}}>{us.email}</td>
                                        <td style={{fontWeight:"600"}}>{us.dien_thoai}</td>
                                        <td style={{fontWeight:"600"}}>{us.role === 1 ? "Admin" : "Customer"}</td>
                                        <td className="thao_tac">
                                            <button className="btn_thao_tac1" type="button">Sửa</button>
                                            <button className="btn_thao_tac2" type="button" onClick={() => xoaUS(us.id)}>Xóa</button>
                                        </td>
                                    </tr>
                                        )
                                    })}
                                    
                                </tbody>
                                

                          
                            </table>
                      </div>
                </div>
            </article>
              <AdminUsersThem setRefresh={setRefresh}/>                              

        </div>
    )
}    


export default AdminUser;