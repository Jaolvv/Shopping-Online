package org.cqipc.edu.service.impl;

import org.cqipc.edu.bean.Norder;
import org.cqipc.edu.bean.Orderdetail;
import org.cqipc.edu.bean.Product;
import org.cqipc.edu.bean.Userinfo;
import org.cqipc.edu.dao.NorderDao;
import org.cqipc.edu.dao.OrderdetailDao;
import org.cqipc.edu.dao.ProductDao;
import org.cqipc.edu.dao.UserinfoDao;
import org.cqipc.edu.mybatis.Page;
import org.cqipc.edu.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderService")
public class OrderServiceImpl implements OrderService {
    @Autowired
    NorderDao nd;
    @Autowired
    OrderdetailDao od;
    @Autowired
    UserinfoDao ud;
    @Autowired
    ProductDao pd;

    @Override
    public List<Norder> selectNorderPageAll(int pageCount, int pageSize) {
        int p = (pageCount - 1) * pageSize;
        return nd.selectNorderPageAll(p, pageSize);
    }

    @Override
    public int selectNorderPageAllCount() {
        return nd.selectNorderPageAllCount();
    }

    @Override
    public List<Norder> selectNorderByUid(int u_id, int pageCount, int pageSize) {
        int p = (pageCount - 1) * pageSize;
        return nd.selectNorderByUid(u_id, p, pageSize);
    }

    @Override
    public int selectNorderByUidCount(int u_id) {
        return nd.selectNorderByUidCount(u_id);
    }

    @Override
    public Norder selectNorderByNid(int no_id) {
        return nd.selectNorderByNid(no_id);
    }

    @Override
    public int addNorderInfo(Norder n) {
        return nd.addNorderInfo(n);
    }

    @Override
    public int removeNorderById(int no_id) {
        return nd.removeNorderById(no_id);
    }

    @Override
    public int modifyNorderInfo(Norder n) {
        return nd.modifyNorderInfo(n);
    }

    @Override
    public int modifyNorderSumprice(int no_id) {
        double sum = this.selectOrderdetailNorderPrice(no_id);
        return nd.modifyNorderSumprice(no_id, sum);
    }

    @Override
    public int usersModifyNorderSumprice(int no_id, double no_sumprice) {
        return nd.modifyNorderSumprice(no_id, no_sumprice);
    }

    @Override
    public List<Userinfo> selectUserinfoAllToNorder() {
        return ud.selectUserinfoAllToNorder();
    }

    @Override
    public String selectUserinfoAddr(int u_id) {
        return ud.selectUserinfoAddr(u_id);
    }

    @Override
    public List<Orderdetail> selectOrderdetailByNoid(int no_id, int pageCount,
                                                     int pageSize) {
        int p = (pageCount - 1) * pageSize;
        return od.selectOrderdetailByNoid(no_id, p, pageSize);
    }

    @Override
    public Orderdetail selectOrderdetailByOid(int o_id) {
        return od.selectOrderdetailByOid(o_id);
    }

    @Override
    public int addOrderdetailInfo(Orderdetail o) {
        return od.addOrderdetailInfo(o);
    }

    @Override
    public int removeOrderdetailById(int o_id) {
        return od.removeOrderdetailById(o_id);
    }

    @Override
    public int modifyOrderdetail(Orderdetail o) {
        return od.modifyOrderdetail(o);
    }

    @Override
    public int selectOrderdetailByNoidCount(int no_id) {
        return od.selectOrderdetailByNoidCount(no_id);
    }

    //处理订单或者明细数据时需要用到的商品的方法
    @Override
    public List<Product> updateOrderdetailSelectProducts() {
        return pd.selectProductAlls();
    }

    @Override
    public double selectProductPriceById(int p_id) {
        double p = pd.selectProductPriceById(p_id);
        return p;
    }

    @Override
    public double selectOrderdetailNorderPrice(int no_id) {
        List<Double> sum = od.selectOrderdetailNorderPrice(no_id);
        double num = 0;
        for (double n : sum) {
            num += n;
        }
        return num;
    }

    @Override
    public Page<Norder> selectNorderLayUIPageAll(int pageCount, int u_id) {
        Page<Norder> page = new Page<Norder>();
        page.setPageNo(pageCount);
        nd.selectNorderLayUIPageAll(page, u_id);
        return page;
    }

    @Override
    public List<Orderdetail> userSelectOrderdetailByNoid(int no_id) {
        return od.userSelectOrderdetailByNoid(no_id);
    }

}
