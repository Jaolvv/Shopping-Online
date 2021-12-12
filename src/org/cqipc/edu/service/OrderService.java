package org.cqipc.edu.service;

import org.cqipc.edu.bean.Norder;
import org.cqipc.edu.bean.Orderdetail;
import org.cqipc.edu.bean.Product;
import org.cqipc.edu.bean.Userinfo;
import org.cqipc.edu.mybatis.Page;

import java.util.List;

public interface OrderService {

    //norder
    public List<Norder> selectNorderPageAll(int pageCount, int pageSize);

    public int selectNorderPageAllCount();

    public List<Norder> selectNorderByUid(int u_id, int pageCount, int pageSize);

    public int selectNorderByUidCount(int u_id);

    public Norder selectNorderByNid(int no_id);

    public int addNorderInfo(Norder n);

    public int removeNorderById(int no_id);

    public int modifyNorderInfo(Norder n);

    public Page<Norder> selectNorderLayUIPageAll(int pageCount, int u_id);

    //后端调用结算订单的方法（适用于自动计算订单总价）
    public int modifyNorderSumprice(int no_id);

    //前端调用结算订单的方法（适用于用户结算购物车）
    public int usersModifyNorderSumprice(int no_id, double no_sumprice);

    public List<Userinfo> selectUserinfoAllToNorder();

    public String selectUserinfoAddr(int u_id);

    //orderdetail
    public List<Orderdetail> selectOrderdetailByNoid(
            int no_id, int pageCount, int pageSize);

    public int selectOrderdetailByNoidCount(int no_id);

    public Orderdetail selectOrderdetailByOid(int o_id);

    public int addOrderdetailInfo(Orderdetail o);

    public int removeOrderdetailById(int o_id);

    public int modifyOrderdetail(Orderdetail o);

    public double selectOrderdetailNorderPrice(int no_id);

    public List<Orderdetail> userSelectOrderdetailByNoid(int no_id);

    //product
    public List<Product> updateOrderdetailSelectProducts();

    public double selectProductPriceById(int p_id);
}
