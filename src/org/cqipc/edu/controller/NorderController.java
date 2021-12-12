package org.cqipc.edu.controller;

import org.cqipc.edu.bean.*;
import org.cqipc.edu.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class NorderController {
    @Autowired
    OrderService os;

    @RequestMapping("selectNorderAll")
    @ResponseBody
    public Map<String, Object> selectNorderAll(@RequestParam("page") int page,
                                               @RequestParam(value = "rows", required = false, defaultValue = "5") int rows) {
        Map<String, Object> map = new HashMap<String, Object>();
        int total = os.selectNorderPageAllCount();
        List<Norder> list = os.selectNorderPageAll(page, rows);
        map.put("total", total);
        map.put("rows", list);
        return map;
    }

    @RequestMapping("selectUserInfoAllToNorder")
    @ResponseBody
    public List<Userinfo> selectUserInfoAllToNorder() {
        return os.selectUserinfoAllToNorder();
    }

    @RequestMapping("selectNorderByUid")
    @ResponseBody
    public Map<String, Object> selectNorderByUid(@RequestParam("page") int page,
                                                 @RequestParam(value = "rows", required = false, defaultValue = "5") int rows,
                                                 @RequestParam("u_id") int u_id) {
        Map<String, Object> map = new HashMap<String, Object>();
        int total = os.selectNorderByUidCount(u_id);
        List<Norder> list = os.selectNorderByUid(u_id, page, rows);
        map.put("total", total);
        map.put("rows", list);
        return map;
    }

    @RequestMapping("selectUserAddr")
    @ResponseBody
    public String[] selectUserAddr(@RequestParam("u_id") int u_id) {
        String[] str = {os.selectUserinfoAddr(u_id)};
        return str;
    }

    @RequestMapping("deleteNorderById")
    @ResponseBody
    public int deleteNorderById(int no_id) {
        return os.removeNorderById(no_id);
    }

    @RequestMapping("insertNorder")
    @ResponseBody
    public int insertNorder(Norder n, @RequestParam("u_id") int u_id) {
        n.setuId(new Userinfo(u_id, "", "", "", "", "", "", ""));
        n.setNo_orderdate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
        return os.addNorderInfo(n);
    }

    @RequestMapping("updateNorder")
    @ResponseBody
    public int updateNorder(Norder n, @RequestParam("u_id") int u_id) {
        n.setuId(new Userinfo(u_id, "", "", "", "", "", "", ""));
        return os.modifyNorderInfo(n);
    }

    @RequestMapping("selectOrderdetailByNoid")
    @ResponseBody
    public Map<String, Object> selectOrderdetailByNoid(@RequestParam("page") int page,
                                                       @RequestParam(value = "rows", required = false, defaultValue = "5") int rows,
                                                       @RequestParam("no_id") int no_id) {
        Map<String, Object> map = new HashMap<String, Object>();
        int total = os.selectOrderdetailByNoidCount(no_id);
        List<Orderdetail> list = os.selectOrderdetailByNoid(no_id, page, rows);
        map.put("total", total);
        map.put("rows", list);
        return map;
    }

    //在回显明细数据时需要调用所有商品的方法
    @RequestMapping("updateOrderdetailSelectProducts")
    @ResponseBody
    public List<Product> updateOrderdetailSelectProducts() {
        return os.updateOrderdetailSelectProducts();
    }

    @RequestMapping("selectProductPrice")
    @ResponseBody
    public double selectProductPrice(@RequestParam(value = "p_id", required = false,
            defaultValue = "0") int p_id) {
        if (p_id == 0 || p_id == -1) {
            return 0;
        } else {
            return os.selectProductPriceById(p_id);
        }
    }

    @RequestMapping("deleteOrderdetailById")
    @ResponseBody
    public int deleteOrderdetailById(@RequestParam("o_id") int o_id) {
        return os.removeOrderdetailById(o_id);
    }

    @RequestMapping("insertOrderdetail")
    @ResponseBody
    public int insertOrderdetail(Orderdetail o, @RequestParam("noid") int no_id,
                                 @RequestParam("p_id") int p_id) {
        o.setNoId(new Norder(no_id, new Userinfo(), "", "", 0));
        o.setpId(new Product(p_id, new Ccategory(), "", 0, "", ""));
        int count = os.addOrderdetailInfo(o);
        //新增一张明细之后将明细所属订单的总价一并修改
        os.modifyNorderSumprice(o.getNoId().getNo_id());
        return count;
    }

    @RequestMapping("updateOrderdetail")
    @ResponseBody
    public int updateOrderdetail(Orderdetail o, @RequestParam("noid") int no_id,
                                 @RequestParam("p_id") int p_id) {
        o.setNoId(new Norder(no_id, new Userinfo(), "", "", 0));
        o.setpId(new Product(p_id, new Ccategory(), "", 0, "", ""));
        int count = os.modifyOrderdetail(o);
        os.modifyNorderSumprice(o.getNoId().getNo_id());
        return count;
    }

    //用户查询订单明细的方法
    @RequestMapping("userSelectOrderdetailByNoid")
    @ResponseBody
    public List<Orderdetail> userSelectOrderdetailByNoid(
            @RequestParam("no_id") int no_id) {
        return os.userSelectOrderdetailByNoid(no_id);
    }
}
