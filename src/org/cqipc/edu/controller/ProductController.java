package org.cqipc.edu.controller;

import org.apache.commons.io.IOUtils;
import org.cqipc.edu.bean.*;
import org.cqipc.edu.service.OrderService;
import org.cqipc.edu.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("product")
public class ProductController {
    @Autowired
    ProductService ps;
    @Autowired
    OrderService os;

    @RequestMapping("initData")
    @ResponseBody
    public Object[] selectInitData() {
        List<Ccategory> clist = ps.selectCcategoryAll();
        List<Product> plist = ps.selectProductAlls();
        Object[] objs = {clist, plist};
        return objs;
    }

    //查询某个商品并跳转到商品页面的方法
    @RequestMapping("selectProductByID")
    public String selectProductByID(@RequestParam("p_id") int p_id, Model model) {
        Product p = ps.selectProductById(p_id);
        model.addAttribute("product", p);
        return "product";
    }

    //查询并跳转到购物车的方法
    @RequestMapping("selectCart")
    public String selectCart(HttpSession session, Model model) {
        Map<Product, Integer> cart = (Map<Product, Integer>) session.getAttribute("cart");
        Set<Product> set = cart.keySet();
        int count = 0;
        double sumprice = 0;
        for (Product pt : set) {
            count += cart.get(pt);
            sumprice += pt.getP_price() * cart.get(pt);
        }
        model.addAttribute("count", count);
        model.addAttribute("sumprice", sumprice);
        return "cart";
    }

    //商品页面中直接购买商品的方法
    @RequestMapping("checkOrder")
    public String checkOrder(int p_id, int num, HttpSession session, Model model) {
        Product p = ps.selectProductById(p_id);
        Userinfo ui = (Userinfo) session.getAttribute("userinfo");
        Norder no = new Norder(ui,
                new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()),
                ui.getU_addr(), (p.getP_price() * num));
        os.addNorderInfo(no);
        Orderdetail od = new Orderdetail(no, p, num, (p.getP_price() * num));
        os.addOrderdetailInfo(od);
        model.addAttribute("product", p);
        model.addAttribute("addCartInfo", "购买成功！");
        return "product";
    }

    //在购物车页面中结算订单的方法
    @RequestMapping("PaymentCat")
    public String PaymentCat(HttpSession session, Model model) {
        Map<Product, Integer> cart = (Map<Product, Integer>) session.getAttribute("cart");
        Set<Product> set = cart.keySet();
        Iterator<Product> it = set.iterator();
        Userinfo ui = (Userinfo) session.getAttribute("userinfo");
        Norder no = new Norder(ui,
                new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()),
                ui.getU_addr(), 0);
        os.addNorderInfo(no);
        double no_sumprice = 0;
        while (it.hasNext()) {
            Product pt = it.next();
            double sumprice = pt.getP_price() * cart.get(pt);
            Orderdetail od = new Orderdetail(no, pt, cart.get(pt), sumprice);
            os.addOrderdetailInfo(od);
            no_sumprice += sumprice;
        }
        os.usersModifyNorderSumprice(no.getNo_id(), no_sumprice);
        session.removeAttribute("cart");
        cart.clear();//清空
        session.setAttribute("cart",cart);//添加一个空的购物车
        model.addAttribute("cartInfo", "结算成功！");
        return "cart";
    }

    //==============================================以下为后端商品数据维护的方法
    @RequestMapping("selectCcategoryAll")
    @ResponseBody
    public Map<String, Object> selectCcategoryAll(@RequestParam("page") int page,
                                                  @RequestParam(value = "rows", required = false,
                                                          defaultValue = "5") int rows) {
        int total = ps.selecrPageNum();
        List<Ccategory> list = ps.selectCcategoryAllPage(page, rows);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("total", total);
        map.put("rows", list);
        return map;
    }

    @RequestMapping("removeCategoryById")
    @ResponseBody
    public int removeCategoryById(@RequestParam("cg_id") int cg_id) {
        return ps.removeCategory(cg_id);
    }

    @RequestMapping("insertCcategory")
    @ResponseBody
    public int insertCcategory(Ccategory cg) {
        return ps.addCategory(cg);
    }

    @RequestMapping("updateCcategory")
    @ResponseBody
    public int updateCcategory(Ccategory cg) {
        return ps.modifyCategory(cg);
    }

    @RequestMapping("selectProductAll")
    @ResponseBody
    public Map<String, Object> selectProductAll(@RequestParam("page") int page,
                                                @RequestParam(value = "rows", required = true, defaultValue = "5") int rows) {
        Map<String, Object> map = new HashMap<String, Object>();
        int total = ps.selecrProductCount();
        List<Product> list = ps.selectProductAll(page, rows);
        map.put("total", total);
        map.put("rows", list);
        return map;
    }

    @RequestMapping("selectProCateGory")
    @ResponseBody
    public List<Ccategory> selectCcategory() {
        return ps.selectCcategoryAll();
    }


    @RequestMapping("selectProductByCgid")
    @ResponseBody
    public List<Product> selectProductByCgid(@RequestParam("cg_id") int cg_id) {
        return ps.selectProductByCgid(cg_id);
    }

    @RequestMapping("deleteProductById")
    @ResponseBody
    public int deleteProductById(int p_id) {
        return ps.removeProductById(p_id);
    }

    @RequestMapping(value = "insertProduct", method = RequestMethod.POST)
    @ResponseBody
    public int insertProduct(@RequestParam("p_imgName") MultipartFile uploadFile,
                             HttpServletRequest request, @RequestParam("cgId") int cgId,
                             @RequestParam("p_name") String p_name,
                             @RequestParam("p_price") double p_price,
                             @RequestParam("p_supplier") String p_supplier,
                             @RequestParam("p_introduction") String p_introduction
    ) throws IOException {
        Product p = new Product();
        p.setCgId(new Ccategory(cgId, ""));
        p.setP_name(p_name);
        p.setP_price(p_price);
        p.setP_supplier(p_supplier);
        p.setP_introduction(p_introduction);
        String newFileName = "";
        MultipartFile file = uploadFile;
        //获取原文件的名称
        String fileName = file.getOriginalFilename();
        //将原文件名称转码，因为有可能是中文
        String uploadFileName = new String(fileName.getBytes("ISO-8859-1"), "UTF-8");
        //以点作为截取条件将文件名和后缀分离
        int index = uploadFileName.indexOf(".");
        byte[] b2 = newFileName.getBytes("ISO-8859-1");
        newFileName = new String(b2, "utf-8");
        //新文件名以用户名称+当前时间节点到秒来作为文件的名称
        HttpSession session = request.getSession();
        newFileName += session.getId() + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        //然后加上之前截取的后缀
        newFileName += uploadFileName.substring(index, uploadFileName.length());
        System.out.println(newFileName);
        InputStream isRef = file.getInputStream();
        //将文件存入到指定目录下
        String targetDir = request.getSession().getServletContext().
                getRealPath("./imagess");
        File targetFile = new File(targetDir, newFileName);
        FileOutputStream fosRef = new FileOutputStream(targetFile);
        IOUtils.copy(isRef, fosRef);
        String p_imgName = "/imagess/" + newFileName;
        p.setP_imgName(p_imgName);
        return ps.addProduct(p);
    }

    @RequestMapping("updateProduct")
    @ResponseBody
    public int updateProduct(Product p, @RequestParam("cgId") int cgId) {
        p.setCgId(new Ccategory(cgId, ""));
        return ps.modifyProduct(p);
    }
}
